import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import { ClassNames, css, Global } from "@emotion/react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DateTime } from "luxon";
import slugify from "@sindresorhus/slugify";
import { lighten, rgba } from "polished";
import { MdArrowForwardIos } from "react-icons/md";

import Layout from "../../Layout";
import {
  operatorClassIcon,
  operatorPortrait,
  operatorSubclassIcon,
  sgPageBanner,
} from "../../utils/images";
import {
  professionToClass,
  subProfessionIdToSubclass,
} from "../../utils/globals";
import NavigateRightArrow from "../../components/icons/NavigateRightArrow";
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
  const lastUpdatedAt = guideNodes
    .map((node) => DateTime.fromISO(node.updatedAt))
    .reduce((prev, curr) => (curr > prev ? curr : prev));
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
      <Global styles={globalOverrideStyles(theme)} />
      <main css={styles}>
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
          <div className="sort-and-filter-options">{sortAndFilterOptions}</div>
        )}
        <div className="class-subclass-descriptions">
          {selectedProfession != null && (
            <button
              className="toggle-class-descriptions-button"
              aria-expanded={showClassDescriptions ? "true" : undefined}
              aria-controls="class-subclass-card-container"
              onClick={() => setShowClassDescriptions((curr) => !curr)}
            >
              Class Description
              <MdArrowForwardIos />
            </button>
          )}

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
                      <span className="visually-hidden">Selected class: </span>
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
                      <span className="visually-hidden">Selected branch: </span>
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
        <section className="results">
          <h2>Operators</h2>
          {operatorsToShow.length > 0 ? (
            <ul className="operator-list">
              {operatorsToShow.map((op) => {
                const operatorClass = professionToClass(op.profession);
                const subclass = subProfessionIdToSubclass(op.subProfessionId);
                const hasGuide = operatorsWithGuides.has(op.name);
                return (
                  <ClassNames key={op.id}>
                    {({ cx }) => {
                      const inner = (
                        <Fragment>
                          <div className="operator-info">
                            <span className="operator-name">{op.name}</span>
                            <span
                              className={cx(
                                "rarity",
                                `rarity-${op.rarity + 1}-stars`
                              )}
                              aria-label={`${op.rarity + 1} stars`}
                            >
                              {op.rarity + 1} ★
                            </span>
                            <span className="operator-class">
                              {operatorClass}
                            </span>
                          </div>
                          <span className="operator-subclass">
                            <img
                              className="operator-subclass-icon"
                              src={operatorSubclassIcon(op.subProfessionId)}
                              alt={subclass}
                            />
                          </span>
                          <div className="on-hover">
                            {hasGuide ? (
                              <Fragment>
                                <span>Read Guide</span>
                                <NavigateRightArrow className="go-to-guide-icon" />
                              </Fragment>
                            ) : (
                              <span>Guide Unavailable</span>
                            )}
                          </div>
                        </Fragment>
                      );
                      return (
                        <li
                          className={cx(
                            "operator",
                            hasGuide ? "has-guide" : "no-guide"
                          )}
                          style={{
                            //@ts-expect-error css variable
                            "--bg-image": `url("${operatorPortrait(op.name)}")`,
                          }}
                        >
                          {hasGuide ? (
                            <a href={`/operators/${slugify(op.name)}`}>
                              {inner}
                            </a>
                          ) : (
                            inner
                          )}
                        </li>
                      );
                    }}
                  </ClassNames>
                );
              })}
            </ul>
          ) : (
            <div className="no-results">No Results</div>
          )}
        </section>
      </main>
    </Layout>
  );
};
export default Operators;

const globalOverrideStyles = (theme: Theme) => css`
  header {
    .heading-and-breadcrumb {
      h1 {
        font-size: ${theme.typography.operatorPageHeading.fontSize}px;
        font-weight: ${theme.typography.operatorPageHeading.fontWeight};
        line-height: ${theme.typography.operatorPageHeading.lineHeight};

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.operatorNameHeading.fontSize}px;
        }
      }
    }
  }
`;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 1fr;
  padding: ${theme.spacing(1, 3, 0, 3)};

  ${theme.breakpoints.down("mobile")} {
    padding: ${theme.spacing(1, 2, 0, 2)};
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
    column-gap: ${theme.spacing(2)};
    margin: ${theme.spacing(2, 0, 0)};
    padding: ${theme.spacing(2)};
    font-size: ${theme.typography.navigationLink.fontSize}px;
    line-height: ${theme.typography.navigationLink.lineHeight};

    ${theme.breakpoints.down("mobile")} {
      background-color: ${rgba(theme.palette.dark.main, 0.66)};
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

  .class-subclass-descriptions {
    margin: ${theme.spacing(1, 0, 0)};
    padding: ${theme.spacing(0, 2)};

    ${theme.breakpoints.down("mobile")} {
      margin: 0;
      padding: 0;
      background-color: ${rgba(theme.palette.midtone.main, 0.66)};
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
      transition: all 50ms ease-out;

      ${theme.breakpoints.down("mobile")} {
        margin: ${theme.spacing(2, 2, 0)};
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
        svg {
          transform: rotate(90deg);
        }
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

  .results {
    margin: ${theme.spacing(4, 0, -8)};
    padding: ${theme.spacing(4, 3)};
    background-color: ${theme.palette.black.main};

    ${theme.breakpoints.down("mobile")} {
      margin: ${theme.spacing(0, 0, -4)};
      padding: ${theme.spacing(2)};
    }

    h2 {
      margin: 0;
      font-size: ${theme.typography.generalHeading.fontSize}px;
      line-height: ${theme.typography.generalHeading.lineHeight};
      font-weight: ${theme.typography.generalHeadingBold.fontWeight};
    }

    ul.operator-list {
      margin: ${theme.spacing(3, 0, 0)};
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

      li.operator {
        width: 100%;
        height: 280px;
        flex-grow: 1;
        border-radius: ${theme.spacing(0.5)};
        background-color: ${theme.palette.black.main};
        background-size: cover;
        background-position-y: top;
        background-image: linear-gradient(
            120deg,
            ${theme.palette.midtoneDarker.main} 0%,
            transparent 18%
          ),
          linear-gradient(to bottom, transparent 42%, #000 100%),
          var(--bg-image);
        box-shadow: ${theme.spacing(0.25)} ${theme.spacing(0.5)}
          ${theme.spacing(1)} rgba(0, 0, 0, 0.15);
        transition: all 0.15s ease-in-out;

        ${theme.breakpoints.down("mobile")} {
          width: 148px;
        }

        &.no-guide {
          opacity: 0.5;
          cursor: initial;
        }

        &.no-guide,
        &.has-guide a {
          display: grid;
          grid-template-rows: max-content 1fr max-content;
        }

        &.has-guide a {
          width: 100%;
          height: 100%;
          color: inherit;
        }

        .on-hover {
          display: none;
          font-size: ${theme.typography.body3.fontSize}px;
          line-height: ${theme.typography.body3.lineHeight};
          text-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)}
            rgba(0, 0, 0, 0.5);
        }

        &:hover {
          .operator-info {
            display: none;
          }

          .on-hover {
            margin-top: -4px;
            padding: ${theme.spacing(2)};
            display: grid;
            grid-template-columns: max-content 1fr max-content;
            align-items: flex-end;
            border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};

            .go-to-guide-icon {
              grid-column: 3;
              height: ${theme.typography.body3.lineHeight};
            }
          }

          &.has-guide {
            transform: scale(1.1);
            filter: brightness(110%);

            .on-hover {
              border-bottom: ${theme.spacing(0.5)} solid
                ${theme.palette.white.main};
            }
          }
        }

        .operator-info {
          grid-row: 3;
          display: grid;
          grid-template-rows: repeat(2, max-content);
          grid-template-columns: 1fr max-content;
          padding: ${theme.spacing(2)};
          row-gap: ${theme.spacing(1)};

          .operator-name,
          .rarity,
          .operator-class {
            text-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)}
              rgba(0, 0, 0, 0.5);
          }

          .operator-name {
            grid-column: span 2;
            font-size: ${theme.typography.body2.fontSize}px;
            line-height: ${theme.typography.body2.lineHeight};
            font-weight: ${theme.typography.body2Bold.fontWeight};
          }

          .rarity,
          .operator-class {
            font-size: ${theme.typography.label2.fontSize}px;
            line-height: ${theme.typography.label2.lineHeight};
          }

          .rarity {
            grid-column: 2;
          }

          .operator-class {
            grid-row: 2;
            text-transform: uppercase;
          }
        }

        .operator-subclass {
          grid-row: 1;

          .operator-subclass-icon {
            width: 40px;
            height: 40px;
            margin: ${theme.spacing(1, 0, 0, 1)};
            line-height: 1;
            filter: drop-shadow(
              0 ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.5)
            );
          }
        }
      }
    }

    .no-results {
      margin-top: ${theme.spacing(3)};
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
