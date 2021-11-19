import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import { ClassNames, css } from "@emotion/react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Theme,
} from "@mui/material";
import { DateTime } from "luxon";
import slugify from "@sindresorhus/slugify";

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
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const [isSubclassMenuOpen, setIsSubclassMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [selectedSubProfessionId, setSelectedSubProfessionId] = useState<
    string | null
  >(null);

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

  const handleClassClick = (profession: string) => () => {
    setSelectedProfession((oldProfession) => {
      if (oldProfession !== profession) {
        setSelectedSubProfessionId(null);
      }
      return profession;
    });
    setIsClassMenuOpen(false);
  };

  const handleSubclassClick = (subProfessionId: string) => () => {
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

  return (
    <Layout
      pageTitle="Operator List"
      bannerImageUrl={sgPageBanner("operators")}
      blendPoint={496}
    >
      <main css={styles}>
        <span className="last-updated">
          Last Updated:{" "}
          <span className="date">
            {lastUpdatedAt
              .setLocale("en-GB")
              .toLocaleString(DateTime.DATE_FULL)}
          </span>
        </span>
        <div className="sort-and-filter-options">
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
            className={
              selectedSubProfessionId ? "has-selection" : "no-selection"
            }
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
          <div className="spacer" />
          <CustomCheckbox
            label="Guide available"
            onChange={handleGuideAvailableChange}
            checked={showOnlyGuideAvailable}
          />
        </div>
        <div className="class-subclass-descriptions">
          {selectedProfession && (
            <div
              className="class-description"
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                __html: operatorClasses.find(
                  ({ profession }) => profession === selectedProfession
                )!.analysis.childMarkdownRemark.html,
              }}
            />
          )}
          {selectedSubProfessionId && (
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

const styles = (theme: Theme) => css`
  .last-updated {
    padding: ${theme.spacing(0, 3)};

    .date {
      font-weight: ${theme.typography.body1Bold.fontWeight};
    }
  }

  .sort-and-filter-options {
    margin: ${theme.spacing(4, 0, 0)};
    padding: ${theme.spacing(0, 3)};
    display: flex;
    align-items: center;
    font-size: ${theme.typography.navigationLink.fontSize}px;
    line-height: ${theme.typography.navigationLink.lineHeight};

    & > * + * {
      margin-left: ${theme.spacing(2)};
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
    padding: ${theme.spacing(0, 3)};
  }

  .results {
    margin: ${theme.spacing(4, 0, -8, 0)};
    padding: ${theme.spacing(3)};
    background-color: ${theme.palette.black.main};

    ${theme.breakpoints.down("mobile")} {
      margin-top: ${theme.spacing(-4)};
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
