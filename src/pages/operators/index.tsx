import React, { Fragment, useState, useEffect } from "react";
import { graphql } from "gatsby";
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
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DateTime } from "luxon";
import slugify from "@sindresorhus/slugify";
import { lighten, rgba } from "polished";
import { MdArrowForwardIos } from "react-icons/md";
import cx from "clsx";

import Layout from "../../Layout";
import {
  operatorClassIcon,
  operatorPortrait,
  operatorSubclassIcon,
  sgPageBanner,
} from "../../utils/images";
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

interface Props {
  data: {
    allOperatorsJson: {
      nodes: {
        id: string;
        name: string;
        isCnOnly: boolean;
        profession: string;
        subProfessionId: string;
        rarity: number; // 0-indexed
      }[];
    };
    allContentfulOperatorAnalysis: {
      nodes: {
        operator: {
          name: string;
        };
        updatedAt: string;
      }[];
    };
    allContentfulOperatorClass: {
      nodes: {
        className: string;
        profession: string;
        analysis: {
          childMarkdownRemark: {
            html: string;
          };
        };
      }[];
    };
    allContentfulOperatorSubclass: {
      nodes: {
        subclass: string;
        subProfessionId: string;
        class: {
          profession: string;
        };
        analysis: {
          childMarkdownRemark: {
            html: string;
          };
        };
      }[];
    };
  };
}

const Operators: React.VFC<Props> = ({ data }) => {
  const { nodes: operators } = data.allOperatorsJson;
  const { nodes: guideNodes } = data.allContentfulOperatorAnalysis;
  const { nodes: operatorClasses } = data.allContentfulOperatorClass;
  const { nodes: operatorSubclasses } = data.allContentfulOperatorSubclass;
  const operatorsWithGuides = new Set(
    guideNodes.map((node) => node.operator.name)
  );
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
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.length > 0) {
        const [opClass, ...opSubclassWords] = hash.substr(1).split("-");
        const opSubclass = opSubclassWords
          .map((word) => toTitleCase(word))
          .join(" ");
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

  const handleSubclassFilter = (
    profession: string,
    subProfessionId: string
  ) => {
    setSelectedProfession(profession);
    setSelectedSubProfessionId(subProfessionId);
  };

  const selectedClass =
    selectedProfession != null ? professionToClass(selectedProfession) : null;
  const selectedSubclass =
    selectedSubProfessionId != null
      ? subProfessionIdToSubclass(selectedSubProfessionId)
      : null;

  const operatorsToShow = operators.filter((op) => {
    return (
      (!showOnlyGuideAvailable || operatorsWithGuides.has(op.name)) &&
      (selectedProfession == null || op.profession === selectedProfession) &&
      (selectedSubProfessionId == null ||
        op.subProfessionId === selectedSubProfessionId)
    );
  });

  const sortAndFilterOptions = (
    <Fragment>
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
          <Fragment>
            <img
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              src={operatorClassIcon(slugify(selectedClass!))}
              alt=""
              width={MENU_ICON_SIZE}
              height={MENU_ICON_SIZE}
            />
            {selectedClass}
          </Fragment>
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
        {operatorClasses.map(({ className, profession }) => (
          <ClassSubclassMenuItem
            key={className}
            onClick={handleClassClick(profession)}
            className={selectedProfession === profession ? "selected" : ""}
          >
            <ListItemIcon>
              <img
                src={operatorClassIcon(slugify(className))}
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
          <Fragment>
            <img
              src={operatorSubclassIcon(selectedSubProfessionId)}
              alt=""
              width={MENU_ICON_SIZE}
              height={MENU_ICON_SIZE}
            />
            {selectedSubclass}
          </Fragment>
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
        {operatorSubclasses
          .filter(
            ({ class: subclassClass }) =>
              subclassClass.profession === selectedProfession
          )
          .map(({ subclass, subProfessionId }) => (
            <ClassSubclassMenuItem
              key={subclass}
              onClick={handleSubclassClick(subProfessionId)}
              className={
                selectedSubProfessionId === subProfessionId
                  ? "selected"
                  : undefined
              }
            >
              <ListItemIcon>
                <img
                  src={operatorSubclassIcon(subProfessionId)}
                  alt=""
                  width={MENU_ICON_SIZE}
                  height={MENU_ICON_SIZE}
                />
              </ListItemIcon>
              <ListItemText>{subclass}</ListItemText>
            </ClassSubclassMenuItem>
          ))}
      </Menu>
      {!isMobile && <div className="spacer" />}
      <CustomCheckbox
        label="Guide available"
        onChange={handleGuideAvailableChange}
        checked={showOnlyGuideAvailable}
      />
    </Fragment>
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
          {isMobile ? (
            <HorizontalScroller className="sort-and-filter-options">
              {sortAndFilterOptions}
            </HorizontalScroller>
          ) : (
            <div className="sort-and-filter-options">
              {sortAndFilterOptions}
            </div>
          )}

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
                      <img
                        src={operatorClassIcon(slugify(selectedClass))}
                        alt=""
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
                        __html: operatorClasses.find(
                          ({ profession }) => profession === selectedProfession
                        )!.analysis.childMarkdownRemark.html,
                      }}
                    />
                  </section>
                )}
                {selectedSubProfessionId && (
                  <section className="subclass-card">
                    <div className="icon-container">
                      <img
                        src={operatorSubclassIcon(selectedSubProfessionId)}
                        alt=""
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
                    <div
                      className="subclass-description"
                      dangerouslySetInnerHTML={{
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        __html: operatorSubclasses.find(
                          ({ subProfessionId }) =>
                            subProfessionId === selectedSubProfessionId
                        )!.analysis.childMarkdownRemark.html,
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
            {operatorsToShow.length > 0 ? (
              <ul className="operator-list">
                {operatorsToShow.map((op) => {
                  const operatorClass = professionToClass(op.profession);
                  const subclass = subProfessionIdToSubclass(
                    op.subProfessionId
                  );
                  const hasGuide = operatorsWithGuides.has(op.name);
                  const [charName, alterName] = op.name.split(" the ");

                  return (
                    <li
                      key={op.name}
                      className={cx(
                        "operator-card",
                        hasGuide ? "has-guide" : "no-guide",
                        `rarity-${op.rarity + 1}-star${
                          op.rarity > 0 ? "s" : ""
                        }`
                      )}
                    >
                      <div className="operator-portrait-container">
                        <img
                          alt=""
                          className="operator-portrait"
                          src={operatorPortrait(op.name)}
                        />
                      </div>
                      <div className="operator-card-content">
                        {hasGuide && (
                          <a
                            className="dummy-clickable-area"
                            href={`/operators/${slugify(op.name)}`}
                            tabIndex={-1}
                            aria-hidden="true"
                          />
                        )}
                        {React.createElement(
                          hasGuide ? "a" : "div",
                          {
                            className: "operator-info",
                            ...(hasGuide
                              ? {
                                  href: `/operators/${slugify(op.name)}`,
                                  role: "presentation",
                                  tabIndex: -1,
                                }
                              : {}),
                          },
                          <Fragment>
                            <span className="operator-name">
                              {alterName ? (
                                <Fragment>
                                  <span className="base-name">{charName}</span>
                                  <span className="alter-name">
                                    {alterName}
                                  </span>
                                </Fragment>
                              ) : (
                                op.name
                              )}
                            </span>
                            <span
                              className="rarity"
                              title={`Rarity: ${op.rarity + 1} stars`}
                            >
                              <span className="rarity-number">
                                {op.rarity + 1}
                              </span>{" "}
                              <span className="rarity-star">★</span>
                            </span>
                            <span key="opClass" className="operator-class">
                              {operatorClass}
                            </span>
                          </Fragment>
                        )}
                        <Tooltip title={subclass}>
                          <button
                            className="operator-subclass"
                            onClick={() =>
                              handleSubclassFilter(
                                op.profession,
                                op.subProfessionId
                              )
                            }
                          >
                            <img
                              className="operator-subclass-icon"
                              src={operatorSubclassIcon(op.subProfessionId)}
                              alt={""}
                            />
                          </button>
                        </Tooltip>
                        {/* TODO "NEW" should go here */}
                        {hasGuide ? (
                          <a
                            className="go-to-guide-link"
                            href={`/operators/${slugify(op.name)}`}
                          >
                            <span className="go-to-guide-text">Read Guide</span>
                          </a>
                        ) : (
                          <span className="visually-hidden">
                            Guide Unavailable
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
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
    flex: 1 1 0;
    margin: 0;
    display: flex;
    flex-direction: column;
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
      display: flex;
      align-items: center;
      margin: ${theme.spacing(2, 0, 3)};
      font-size: ${theme.typography.navigationLink.fontSize}px;
      line-height: ${theme.typography.navigationLink.lineHeight};

      & > * ~ * {
        margin-left: ${theme.spacing(2)};
      }

      ${theme.breakpoints.down("mobile")} {
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

      .spacer {
        flex-grow: 1;
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

      .class-card,
      .subclass-card {
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-template-columns: max-content 1fr;
        align-items: center;

        .icon-container {
          box-sizing: border-box;
          height: 100%;
          display: flex;
          align-items: center;
          grid-row: span 2;
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

    ul.operator-list {
      margin: ${theme.spacing(3, 3, 0)};
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: ${theme.spacing(3)};
      list-style: none;

      ${theme.breakpoints.down("mobile")} {
        margin: ${theme.spacing(2, 0, 0)};
        grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
        gap: ${theme.spacing(2)};
      }

      li.operator-card {
        width: 100%;
        height: 280px;
        flex-grow: 1;
        display: grid;
        grid-template-areas: "x";
        border-radius: ${theme.spacing(0.5)};
        box-shadow: ${theme.spacing(0.25)} ${theme.spacing(0.5)}
          ${theme.spacing(1)} rgba(0, 0, 0, 0.15);
        transition: filter 0.15s ease-in-out;

        &.no-guide {
          opacity: 0.33;
        }

        &.has-guide {
          cursor: pointer;

          &:hover {
            filter: brightness(110%);
          }
        }

        &.rarity-1-star {
          /* fighting high specificity on the base style */
          .rarity-star {
            color: white !important;
            background-clip: unset !important;
          }
        }

        &.rarity-2-stars {
          .operator-class,
          .rarity-number {
            color: #d3ff77;
          }

          .rarity-star,
          .go-to-guide-link {
            background: linear-gradient(to right, #d3ff77, #a7e855);
          }
        }

        &.rarity-3-stars {
          .operator-class,
          .rarity-number {
            color: #7cd8ff;
          }

          .rarity-star,
          .go-to-guide-link {
            background: linear-gradient(to right, #7cd8ff, #49b3ff);
          }
        }

        &.rarity-4-stars {
          .operator-class,
          .rarity-number {
            color: #d1d0ee;
          }

          .rarity-star,
          .go-to-guide-link {
            background: linear-gradient(to right, #d1d0ee, #9d9bf4);
          }
        }

        &.rarity-5-stars {
          .operator-class,
          .rarity-number {
            color: #ffe9b0;
          }

          .rarity-star,
          .go-to-guide-link {
            background: linear-gradient(to right, #ffe9b0, #e5c675);
          }
        }

        &.rarity-6-stars {
          .operator-class,
          .rarity-number {
            color: #ff9254;
          }

          .rarity-star,
          .go-to-guide-link {
            background: linear-gradient(to right, #ff9254, #ede637);
          }
        }

        .operator-card-content {
          grid-area: x;
          display: grid;
          position: relative;
          grid-template-areas:
            "subclass dummy"
            "info info"
            "link link";
          grid-template-columns: max-content 1fr;
          grid-template-rows: max-content 1fr min-content;
          overflow: hidden;
          background-image: linear-gradient(
              120deg,
              ${theme.palette.midtoneDarker.main} 0%,
              transparent 18%
            ),
            linear-gradient(to bottom, transparent 42%, #000 100%);
          border-radius: ${theme.spacing(0.5)};
          color: ${theme.palette.white.main};

          .dummy-clickable-area:hover ~ a.go-to-guide-link,
          .operator-info:hover ~ a.go-to-guide-link {
            height: 30px;
          }

          .dummy-clickable-area {
            grid-area: dummy;
            width: 100%;
            height: 100%;
          }

          .operator-info {
            grid-area: info;
            align-content: end;
            display: grid;
            grid-template-rows: repeat(2, max-content);
            grid-template-columns: 1fr max-content;
            padding: ${theme.spacing(1.5)};
            row-gap: ${theme.spacing(1)};
            color: ${theme.palette.white.main};

            .operator-name,
            .rarity,
            .operator-class {
              text-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)}
                rgba(0, 0, 0, 0.5);
            }

            .operator-name {
              grid-column: span 2;
              display: flex;
              flex-direction: column;
              font-size: ${theme.typography.skillTalentHeading.fontSize}px;
              line-height: ${theme.typography.skillTalentHeading.lineHeight};
              font-weight: ${theme.typography.skillTalentHeading.fontWeight};

              .alter-name {
                margin-top: ${theme.spacing(0.75)};
                font-size: ${theme.typography.operatorCardAlterName.fontSize}px;
                font-weight: ${theme.typography.operatorCardAlterName
                  .fontWeight};
                line-height: ${theme.typography.operatorCardAlterName
                  .lineHeight};
                text-transform: ${theme.typography.operatorCardAlterName
                  .textTransform};
              }
            }

            .rarity {
              grid-column: 2;
              font-size: ${theme.typography.operatorBrowserNameHeading
                .fontSize}px;
              font-weight: ${theme.typography.operatorBrowserNameHeading
                .fontWeight};
              line-height: ${theme.typography.operatorBrowserNameHeading
                .lineHeight};

              .rarity-star {
                color: transparent;
                background-clip: text;
              }
            }

            .operator-class {
              grid-row: 2;
              font-size: ${theme.typography.body3.fontSize}px;
              line-height: ${theme.typography.body3.lineHeight};
            }
          }

          button.operator-subclass {
            grid-area: subclass;
            padding: ${theme.spacing(0.75)};
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${rgba(theme.palette.dark.main, 0.66)};
            border: none;
            border-bottom-right-radius: ${theme.spacing(1)};
            cursor: pointer;

            .operator-subclass-icon {
              width: ${theme.spacing(4)};
              height: ${theme.spacing(4)};
              line-height: 1;
              filter: drop-shadow(
                0 ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.5)
              );
            }
          }

          a.go-to-guide-link {
            grid-area: link;
            width: 100%;
            font-size: ${theme.typography.label2.fontSize}px;
            line-height: ${theme.typography.label2.lineHeight};
            font-weight: ${theme.typography.label2.fontWeight};
            text-transform: uppercase;
            text-align: center;
            color: ${theme.palette.blackest.main};
            background-color: ${theme.palette.white.main};
            transition: height 0.15s ease-in-out;
            height: ${theme.spacing(0.5)};

            &:hover,
            &:focus {
              height: ${theme.spacing(3.75)};
            }

            .go-to-guide-text {
              display: inline-block;
              margin-top: ${theme.spacing(0.75)};
            }
          }
        }

        .operator-portrait-container {
          grid-area: x;
          overflow: hidden;
          display: flex;
          justify-content: center;
          border-radius: ${theme.spacing(0.5)};

          img.operator-portrait {
            height: 360px;
            object-fit: none;
            object-position: bottom;
            background-color: ${theme.palette.black.main};
            border-radius: ${theme.spacing(0.5)};
          }
        }
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

export const query = graphql`
  query {
    allOperatorsJson(
      filter: { isNotObtainable: { eq: false } }
      sort: { order: [DESC, DESC], fields: [rarity, fileIndex] }
    ) {
      nodes {
        id
        name
        isCnOnly
        profession
        subProfessionId
        rarity
      }
    }
    allContentfulOperatorAnalysis {
      nodes {
        operator {
          name
        }
        updatedAt
      }
    }
    allContentfulOperatorClass {
      nodes {
        className
        profession
        analysis {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allContentfulOperatorSubclass {
      nodes {
        subclass
        subProfessionId
        analysis {
          childMarkdownRemark {
            html
          }
        }
        class {
          profession
        }
      }
    }
  }
`;
