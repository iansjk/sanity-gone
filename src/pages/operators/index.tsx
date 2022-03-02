import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  css,
  GlobalStyles,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Theme,
  useTheme,
} from "@mui/material";
import slugify from "@sindresorhus/slugify";
import { lighten, rgba } from "polished";
import { MdArrowForwardIos } from "react-icons/md";
import loadable from "@loadable/component";

import Layout from "../../Layout";
import { sgPageBanner } from "../../utils/images";
import {
  classToProfession,
  subclassToSubProfessionId,
  professionToClass,
  subProfessionIdToSubclass,
  toTitleCase,
} from "../../utils/globals";
import CustomCheckbox from "../../components/CustomCheckbox";
import FilterIcon from "../../components/icons/FilterIcon";
import HorizontalScroller from "../../components/HorizontalScroller";
import TraitInfo from "../../components/TraitInfo";
import { Media } from "../../Media";
import { fetchContentfulGraphQl } from "../../utils/fetch";
import Image from "next/image";
import { GetStaticProps } from "next";
import { DenormalizedCharacter } from "../../../scripts/types";
import { markdownToHtmlString } from "../../utils/markdown";

const OperatorList = loadable(() => import("../../components/OperatorList"));

const MENU_ICON_SIZE = 18;

const ClassSubclassMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  minHeight: "unset",
  "&.selected": {
    backgroundColor: theme.palette.midtoneBrighterer.main,
  },
  "& .MuiListItemIcon-root": {
    minWidth: "unset",
    marginRight: theme.spacing(1),
  },
  "& .MuiListItemText-root": {
    padding: theme.spacing(1, 0),
  },
}));

export interface OperatorListOperator {
  charId: string;
  name: string;
  isCnOnly: boolean;
  profession: string;
  subProfessionId: string;
  rarity: number; // 0-indexed
}

interface Props {
  allOperators: OperatorListOperator[];
  classes: {
    className: string;
    profession: string;
    analysis: string; // html
  }[];
  branches: {
    subProfessionId: string;
    analysis: string; // html
    class: {
      profession: string;
    };
  }[];
  operatorsWithGuides: string[]; // names
}

export const getStaticProps: GetStaticProps = async () => {
  const operatorsJson = await import("../../../data/operators.json");
  const allOperators = Object.values(operatorsJson.default).map(
    (operator: DenormalizedCharacter) => {
      const { charId, name, isCnOnly, profession, subProfessionId, rarity } =
        operator;
      return {
        charId,
        name,
        isCnOnly,
        profession,
        subProfessionId,
        rarity,
      };
    }
  );
  const query = `
    query {
      operatorClassCollection {
        items {
          className
          profession
          analysis
        }
      }
      operatorSubclassCollection {
        items {
          subProfessionId
          analysis
          class {
            profession
          }
        }
      }
      operatorAnalysisCollection {
        items {
          operator {
            name
            sys {
              publishedAt
            }
          }
        }
      }
    }
  `;
  const {
    operatorClassCollection,
    operatorSubclassCollection,
    operatorAnalysisCollection,
  } = await fetchContentfulGraphQl<{
    operatorClassCollection: {
      items: {
        className: string;
        profession: string;
        analysis: string;
      }[];
    };
    operatorSubclassCollection: {
      items: {
        subProfessionId: string;
        analysis: string;
        class: {
          profession: string;
        };
      }[];
    };
    operatorAnalysisCollection: {
      items: {
        operator: {
          name: string;
          sys: {
            publishedAt: string;
          };
        };
      }[];
    };
  }>(query);

  const props: Props = {
    allOperators,
    classes: await Promise.all(
      operatorClassCollection.items.map(async (item) => ({
        ...item,
        analysis: await markdownToHtmlString(item.analysis),
      }))
    ),
    branches: await Promise.all(
      operatorSubclassCollection.items.map(async (item) => ({
        ...item,
        analysis: await markdownToHtmlString(item.analysis),
      }))
    ),
    operatorsWithGuides: operatorAnalysisCollection.items.map(
      (item) => item.operator.name
    ),
  };
  return { props };
};

const Operators: React.VFC<Props> = (props) => {
  const { allOperators, classes, branches, operatorsWithGuides } = props;

  const [showOnlyGuideAvailable, setShowOnlyGuideAvailable] = useState(true);
  const [showClassDescriptions, setShowClassDescriptions] = useState(true);
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const [isSubclassMenuOpen, setIsSubclassMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [selectedSubProfessionId, setSelectedSubProfessionId] = useState<
    string | null
  >(null);
  const theme = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.length > 0) {
        console.log(hash);
        const classMatch = /^#([^-]*?)(?:-(.*?))?$/.exec(hash);
        const opClass = classMatch ? classMatch[1] : "";
        const opSubclass = classMatch
          ? classMatch[2]
            ? classMatch[2]
                .split("_")
                .map((word) => toTitleCase(word))
                .join(" ")
            : ""
          : ""; // yes i nested 2 ternary statements, cry about it
        console.log(classMatch);

        setSelectedProfession(classToProfession(toTitleCase(opClass)));
        setSelectedSubProfessionId(subclassToSubProfessionId(opSubclass));
      }
    }
  }, []);

  const handleGuideAvailableChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlyGuideAvailable(e.target.checked);
  };

  const handleClassMenuClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setAnchorEl(e.currentTarget);
    setIsClassMenuOpen(true);
  };

  const handleSubclassMenuClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setAnchorEl(e.currentTarget);
    setIsSubclassMenuOpen(true);
  };

  const handleClassClick = (profession: string | null) => () => {
    setSelectedProfession((oldProfession) => {
      if (oldProfession !== profession) {
        setSelectedSubProfessionId(null);
      }
      return profession;
    });
    setIsClassMenuOpen(false);
  };

  const handleSubclassClick = (subProfessionId: string | null) => () => {
    setSelectedSubProfessionId(subProfessionId);
    setIsSubclassMenuOpen(false);
  };

  const handleSubclassFilter = useCallback(
    (profession: string, subProfessionId: string) => {
      setSelectedProfession(profession);
      setSelectedSubProfessionId(subProfessionId);
    },
    []
  );

  const selectedClass =
    selectedProfession != null ? professionToClass(selectedProfession) : null;
  const selectedSubclass =
    selectedSubProfessionId != null
      ? subProfessionIdToSubclass(selectedSubProfessionId)
      : null;

  const operatorsToShow = useMemo(
    () =>
      allOperators.filter((op) => {
        return (
          (!showOnlyGuideAvailable || operatorsWithGuides.includes(op.name)) &&
          (selectedProfession == null ||
            op.profession === selectedProfession) &&
          (selectedSubProfessionId == null ||
            op.subProfessionId === selectedSubProfessionId)
        );
      }),
    [
      allOperators,
      operatorsWithGuides,
      selectedProfession,
      selectedSubProfessionId,
      showOnlyGuideAvailable,
    ]
  );

  const sortAndFilterOptions = (
    <>
      <span className="filter-visual-label" aria-hidden="true">
        <FilterIcon />
        Filters
      </span>
      <Button
        id="class-menu-button"
        variant="contained"
        aria-label="Select class"
        aria-controls="class-menu"
        aria-haspopup="true"
        aria-expanded={isClassMenuOpen ? "true" : undefined}
        onClick={handleClassMenuClick}
        className={
          selectedProfession != null ? "has-selection" : "no-selection"
        }
      >
        {selectedProfession ? (
          <>
            <Image
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              src={`/images/classes/${slugify(selectedClass!)}.png`}
              alt=""
              width={MENU_ICON_SIZE}
              height={MENU_ICON_SIZE}
            />
            {selectedClass}
          </>
        ) : (
          "All Classes"
        )}
      </Button>
      <Menu
        id="class-menu"
        open={isClassMenuOpen}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "class-menu-button",
        }}
        onClose={() => setIsClassMenuOpen(false)}
      >
        <ClassSubclassMenuItem
          onClick={handleClassClick(null)}
          className={selectedProfession == null ? "selected" : ""}
        >
          <ListItemText>All Classes</ListItemText>
        </ClassSubclassMenuItem>
        {classes.map(({ className, profession }) => (
          <ClassSubclassMenuItem
            key={className}
            onClick={handleClassClick(profession)}
            className={selectedProfession === profession ? "selected" : ""}
          >
            <ListItemIcon>
              <Image
                src={`/images/classes/${slugify(className)}.png`}
                alt=""
                width={MENU_ICON_SIZE}
                height={MENU_ICON_SIZE}
              />
            </ListItemIcon>
            <ListItemText>{className}</ListItemText>
          </ClassSubclassMenuItem>
        ))}
      </Menu>
      <Button
        id="subclass-menu-button"
        disabled={selectedProfession == null}
        variant="contained"
        aria-label="Select subclass"
        aria-controls="subclass-menu"
        aria-haspopup="true"
        aria-expanded={isSubclassMenuOpen ? "true" : undefined}
        onClick={handleSubclassMenuClick}
        className={selectedSubProfessionId ? "has-selection" : "no-selection"}
      >
        {selectedSubProfessionId ? (
          <>
            <Image
              src={`/images/branches/${selectedSubProfessionId}.png`}
              alt=""
              width={MENU_ICON_SIZE}
              height={MENU_ICON_SIZE}
            />
            {selectedSubclass}
          </>
        ) : (
          "All Branches"
        )}
      </Button>
      <Menu
        id="subclass-menu"
        open={isSubclassMenuOpen}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "subclass-menu-button",
        }}
        onClose={() => setIsSubclassMenuOpen(false)}
      >
        <ClassSubclassMenuItem
          onClick={handleSubclassClick(null)}
          className={selectedProfession == null ? "selected" : ""}
        >
          <ListItemText>All Branches</ListItemText>
        </ClassSubclassMenuItem>
        {branches
          .filter(
            ({ class: subclassClass }) =>
              subclassClass.profession === selectedProfession
          )
          .map(({ subProfessionId }) => (
            <ClassSubclassMenuItem
              key={subProfessionIdToSubclass(subProfessionId)}
              onClick={handleSubclassClick(subProfessionId)}
              className={
                selectedSubProfessionId === subProfessionId
                  ? "selected"
                  : undefined
              }
            >
              <ListItemIcon>
                <Image
                  src={`/images/branches/${subProfessionId}.png`}
                  alt=""
                  width={MENU_ICON_SIZE}
                  height={MENU_ICON_SIZE}
                />
              </ListItemIcon>
              <ListItemText>
                {subProfessionIdToSubclass(subProfessionId)}
              </ListItemText>
            </ClassSubclassMenuItem>
          ))}
      </Menu>
      <CustomCheckbox
        className="guide-available-checkbox"
        label="Guide available"
        onChange={handleGuideAvailableChange}
        checked={showOnlyGuideAvailable}
      />
    </>
  );

  return (
    <Layout
      pageTitle="Operator List"
      bannerImageUrl={sgPageBanner("operators")}
      blendPoint={496}
      /* No previous location for now
      previousLocation="Home"
      previousLocationLink="/"
       */
    >
      <GlobalStyles styles={globalOverrideStyles(theme)} />
      <main css={styles}>
        <div className="main-container">
          {/* <span className="last-updated">
          Last Updated:{" "}
          <span className="date">
            {lastUpdatedAt
              .setLocale("en-GB")
              .toLocaleString(DateTime.DATE_FULL)}
          </span>
        </span> */}
          <Media lessThan="mobile">
            <HorizontalScroller className="sort-and-filter-options">
              {sortAndFilterOptions}
            </HorizontalScroller>
          </Media>
          <Media greaterThanOrEqual="mobile">
            <div className="sort-and-filter-options">
              {sortAndFilterOptions}
            </div>
          </Media>

          {selectedProfession != null && (
            <div className="toggle-button-container">
              <button
                className="toggle-class-descriptions-button"
                aria-expanded={showClassDescriptions ? "true" : undefined}
                aria-controls="class-subclass-card-container"
                onClick={() => setShowClassDescriptions((curr) => !curr)}
              >
                Class Description
                <MdArrowForwardIos />
              </button>
            </div>
          )}
          <div className="class-subclass-descriptions">
            {showClassDescriptions && (
              <div id="class-subclass-card-container">
                {selectedProfession && selectedClass && (
                  <section className="class-card">
                    <div className="icon-container">
                      <Image
                        src={`/images/classes/${slugify(selectedClass)}.png`}
                        alt=""
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="name-container">
                      <h2>
                        <span className="visually-hidden">
                          Selected class:{" "}
                        </span>
                        {selectedClass}
                      </h2>
                      <span className="heading-type" aria-hidden="true">
                        Class
                      </span>
                    </div>
                    <div
                      className="class-description"
                      dangerouslySetInnerHTML={{
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        __html: classes.find(
                          ({ profession }) => profession === selectedProfession
                        )!.analysis,
                      }}
                    />
                  </section>
                )}
                {selectedSubProfessionId && (
                  <section className="subclass-card">
                    <div className="icon-container">
                      <Image
                        src={`/images/branches/${selectedSubProfessionId}.png`}
                        alt=""
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="name-container">
                      <h3>
                        <span className="visually-hidden">
                          Selected branch:{" "}
                        </span>
                        {selectedSubclass}
                      </h3>
                      <span className="heading-type" aria-hidden="true">
                        Branch
                      </span>
                    </div>
                    {selectedSubProfessionId && (
                      <TraitInfo
                        subProfessionId={selectedSubProfessionId}
                        showSubclassIcon={false}
                      />
                    )}
                    <div
                      className="subclass-description"
                      dangerouslySetInnerHTML={{
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        __html: branches
                          .find(
                            ({ subProfessionId }) =>
                              subProfessionId === selectedSubProfessionId
                          )!
                          .analysis.replace(
                            "BRANCHNAME",
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            `<strong>${selectedSubclass!} ${selectedClass!}s</strong>`
                          ),
                      }}
                    />
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="results-container">
          <section className="results">
            <h2>Operators</h2>
            <OperatorList
              operators={allOperators}
              operatorsToShow={operatorsToShow}
              operatorsWithGuides={operatorsWithGuides}
              onSubclassFilter={handleSubclassFilter}
            />
            {operatorsToShow.length === 0 && (
              <div className="no-results">No Results</div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
};
export default Operators;

const globalOverrideStyles = (theme: Theme) => css`
  .top-fold {
    display: flex;
    flex-direction: column;
  }

  .header-main-wrapper {
    max-width: unset;
    margin: 0;
  }

  header {
    padding: ${theme.spacing(3, 0, 0, 0)};
    height: ${theme.spacing(30.5)};

    .heading-and-breadcrumb {
      max-width: ${theme.breakpoints.values["maxWidth"]}px;
      width: 100%;
      margin: 0 auto;
      h1 {
        margin: ${theme.spacing(0, 3)};
        font-size: ${theme.typography.operatorPageHeading.fontSize}px;
        font-weight: ${theme.typography.operatorPageHeading.fontWeight};
        line-height: ${theme.typography.operatorPageHeading.lineHeight};

        ${theme.breakpoints.down("mobile")} {
          margin: ${theme.spacing(0, 2)};
          font-size: ${theme.typography.operatorNameHeading.fontSize}px;
        }
      }
    }
  }

  .page-content {
    flex: 1 1 0;
    display: flex;
  }

  footer {
    margin-top: 0;
  }
`;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;

  .main-container {
    max-width: ${theme.breakpoints.values["maxWidth"]}px;
    margin: 0 auto;
    width: 100%;

    & > * {
      padding: ${theme.spacing(0, 3)};

      ${theme.breakpoints.down("mobile")} {
        padding: 0;
      }
    }

    .last-updated {
      padding: ${theme.spacing(0, 3)};

      ${theme.breakpoints.down("mobile")} {
        padding: ${theme.spacing(0, 2)};
      }

      .date {
        font-weight: ${theme.typography.body1Bold.fontWeight};
      }
    }

    .mobile-sort-filter-scroller {
      white-space: nowrap;
    }

    .sort-and-filter-options {
      align-items: center;
      margin: ${theme.spacing(2, 0, 3)};
      font-size: ${theme.typography.navigationLink.fontSize}px;
      line-height: ${theme.typography.navigationLink.lineHeight};

      & > * ~ * {
        margin-left: ${theme.spacing(2)};
      }

      ${theme.breakpoints.down("mobile")} {
        display: flex;
        background-color: ${rgba(theme.palette.dark.main, 0.66)};
        padding: ${theme.spacing(2)} 0;
        margin: ${theme.spacing(2, 0, 0)};

        & > * ~ * {
          margin: 0;
        }

        .scroller-contents {
          padding: ${theme.spacing(0, 2)};
          flex-grow: 1;

          & > * ~ * {
            margin-left: ${theme.spacing(2)};
          }
        }
      }

      ${theme.breakpoints.up("mobile")} {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(3, auto) 1fr;

        .guide-available-checkbox {
          grid-column: -1;
        }
      }

      .filter-visual-label {
        font-size: ${theme.typography.skillTalentHeading.fontSize}px;
        line-height: ${theme.typography.skillTalentHeading.lineHeight};
        font-weight: ${theme.typography.skillTalentHeading.fontWeight};

        svg {
          margin-right: ${theme.spacing(1)};
        }
      }

      button {
        transition-property: background-color, box-shadow, border-color;
        font-weight: ${theme.typography.navigationLinkBold.fontWeight};

        img {
          margin-right: ${theme.spacing(1)};
        }
      }
    }

    .toggle-button-container {
      ${theme.breakpoints.down("mobile")} {
        padding: ${theme.spacing(2, 2, 0)};
        background-color: ${rgba(theme.palette.midtone.main, 0.66)};
      }
      display: flex; // This is literally only here to prevent margin collapsing.
    }

    .toggle-class-descriptions-button {
      display: flex;
      align-items: center;
      background-color: ${rgba(theme.palette.white.main, 0.08)};
      color: ${rgba(theme.palette.white.main, 0.8)};
      border: none;
      border-radius: ${theme.spacing(0.25)};
      line-height: ${theme.typography.body1.lineHeight};
      cursor: pointer;
      transition: all 50ms ease-out, margin-bottom 0ms;
      margin: ${theme.spacing(0, 2, 2, 0)};

      ${theme.breakpoints.down("mobile")} {
        margin: ${theme.spacing(0, 0, 2, 0)};
      }

      &:hover {
        color: ${lighten(0.27, theme.palette.white.main)};
        background-color: ${rgba(theme.palette.white.main, 0.4)};
      }

      svg {
        transition: transform 50ms ease-in-out;
        margin-left: 10px;
        width: 13px;
        height: 13px;
      }

      &[aria-expanded="true"] {
        margin-bottom: 0;

        svg {
          transform: rotate(90deg);
        }
      }
    }

    .class-subclass-descriptions {
      margin: ${theme.spacing(1, 3, 0)};
      padding: 0;

      ${theme.breakpoints.down("mobile")} {
        margin: 0;
        background-color: ${rgba(theme.palette.midtone.main, 0.66)};
      }

      .subclass-card {
        margin-bottom: ${theme.spacing(3)};

        ${theme.breakpoints.down("mobile")} {
          margin: 0;
        }
      }

      .class-card {
        grid-template-rows: max-content 1fr;

        .icon-container {
          grid-row: span 2;
        }
      }

      .subclass-card {
        grid-template-rows: repeat(3, max-content);

        .icon-container {
          grid-row: span 3;
        }
      }

      .class-card,
      .subclass-card {
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;

        .icon-container {
          box-sizing: border-box;
          height: 100%;
          display: flex;
          align-items: center;
          padding: ${theme.spacing(4)};

          ${theme.breakpoints.down("mobile")} {
            padding: ${theme.spacing(2, 2, 0, 2)};
            grid-row: unset;
          }

          img {
            margin: auto;
            width: ${theme.spacing(8)};
            height: ${theme.spacing(8)};

            ${theme.breakpoints.down("mobile")} {
              width: ${theme.spacing(3)};
              height: ${theme.spacing(3)};
            }
          }
        }

        .name-container {
          display: flex;
          align-items: center;
          padding: ${theme.spacing(3, 0, 0, 4)};

          ${theme.breakpoints.down("mobile")} {
            padding: ${theme.spacing(2, 0, 0)};
          }

          h2,
          h3 {
            margin: ${theme.spacing(0, 1.5, 0, 0)};
            font-size: ${theme.typography.generalHeading.fontSize}px;
            line-height: ${theme.typography.generalHeading.lineHeight};
            font-weight: ${theme.typography.generalHeadingBold.fontWeight};
            text-transform: uppercase;
          }

          .heading-type {
            color: ${rgba(theme.palette.white.main, 0.5)};
            font-size: ${theme.typography.generalHeading.fontSize}px;
            line-height: ${theme.typography.generalHeading.lineHeight};
          }
        }

        .trait-container {
          padding: ${theme.spacing(0, 4)};
          ${theme.breakpoints.down("mobile")} {
            padding: ${theme.spacing(1, 2, 0)};
            grid-column: 1 / span 2;
          }
        }

        .class-description,
        .subclass-description {
          padding: ${theme.spacing(3, 4)};

          ${theme.breakpoints.down("mobile")} {
            padding: ${theme.spacing(2)};
            grid-column: 1 / span 2;
          }

          p {
            margin: 0;
          }
        }
      }

      .class-card:not(:last-child) {
        .icon-container {
          border-bottom: ${theme.spacing(1)} solid ${theme.palette.gray.main};

          ${theme.breakpoints.down("mobile")} {
            border-bottom: none;
          }
        }
      }

      .subclass-card {
        background-color: ${theme.palette.midtoneExtra.main};
        border-top: 1px solid ${theme.palette.midtoneBrighterer.main};
        border-bottom-left-radius: ${theme.spacing(1)};
        border-bottom-right-radius: ${theme.spacing(1)};

        ${theme.breakpoints.down("mobile")} {
          background-color: ${theme.palette.midtone.main};
        }

        .icon-container {
          background-color: ${theme.palette.midtone.main};
          border-bottom-left-radius: ${theme.spacing(1)};
        }
      }
    }
  }

  .results-container {
    background-color: ${theme.palette.dark.main};
    border-top: 1px solid ${theme.palette.midtoneBrighter.main};
    flex: 1 1 0;

    ${theme.breakpoints.down("mobile")} {
      border-top: none;
    }
  }

  .results {
    margin: ${theme.spacing(3)} auto ${theme.spacing(9.5)} auto;
    max-width: ${theme.breakpoints.values["maxWidth"]}px;
    ${theme.breakpoints.down("mobile")} {
      margin: ${theme.spacing(0, 0, 4)};
      padding: ${theme.spacing(2)};
    }

    h2 {
      font-size: ${theme.typography.generalHeading.fontSize}px;
      line-height: ${theme.typography.generalHeading.lineHeight};
      font-weight: ${theme.typography.generalHeadingBold.fontWeight};

      margin: ${theme.spacing(0, 3)};
      ${theme.breakpoints.down("mobile")} {
        margin: 0;
      }
    }

    .no-results {
      margin: ${theme.spacing(3, 0)};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.palette.midtoneBrighterer.main};
    }
  }
`;
