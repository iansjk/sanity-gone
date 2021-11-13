import React, { Fragment, useEffect, useState } from "react";
import { graphql } from "gatsby";
import { rgba } from "polished";
import slugify from "@sindresorhus/slugify";
import { css } from "@emotion/react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Theme,
} from "@mui/material";

import Layout from "../Layout";
import { operatorClassIcon, operatorSubclassIcon } from "../utils/images";
import {
  classToProfession,
  professionToClass,
  subclassToSubProfessionId,
  subProfessionIdToSubclass,
  toTitleCase,
} from "../utils/globals";

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

const Classes: React.VFC<Props> = ({ data }) => {
  const { nodes: operatorClasses } = data.allContentfulOperatorClass;
  const { nodes: operatorSubclasses } = data.allContentfulOperatorSubclass;
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const [isSubclassMenuOpen, setIsSubclassMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [selectedSubProfessionId, setSelectedSubProfessionId] = useState<
    string | null
  >(null);

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

  return (
    <Layout pageTitle="Classes and Subclasses">
      <main css={styles}>
        <div className="class-subclass-select">
          <label aria-hidden="true">Select</label>
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
              "Class"
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
              "Subclass"
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
        </div>
        <div className="results">
          {selectedProfession && selectedClass ? (
            <section className="class-card">
              <div className="icon-container">
                <img src={operatorClassIcon(slugify(selectedClass))} alt="" />
              </div>
              <div className="name-container">
                <h2>{selectedClass}</h2>
                {/* <a className="emphasized-link">Browse</a> */}
              </div>
              <div
                className="analysis"
                dangerouslySetInnerHTML={{
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  __html: operatorClasses.find(
                    ({ profession }) => profession === selectedProfession
                  )!.analysis.childMarkdownRemark.html,
                }}
              />
            </section>
          ) : (
            <div className="select-class-message">Select operator class</div>
          )}
          {selectedSubProfessionId && selectedSubclass && (
            <section className="subclass-card">
              <div className="icon-container">
                <img
                  src={operatorSubclassIcon(selectedSubProfessionId)}
                  alt=""
                />
              </div>
              <div className="name-container">
                <h3>{selectedSubclass}</h3>
                {/* <a className="emphasized-link">Browse</a> */}
              </div>
              <div
                className="analysis"
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
          {selectedProfession && !selectedSubProfessionId && (
            <div className="select-subclass-message">
              Select operator subclass
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};
export default Classes;

const styles = (theme: Theme) => css`
  margin: ${theme.spacing(4, 0, 0)};
  display: flex;
  flex-direction: column;
  border-radius: ${theme.spacing(1)};
  background-color: ${rgba(theme.palette.midtone.main, 0.66)};

  .class-subclass-select {
    display: flex;
    align-items: center;
    padding: ${theme.spacing(3, 4)};
    border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};

    & > *:not(:last-child) {
      margin-right: ${theme.spacing(2)};
    }

    label {
      font-size: ${theme.typography.skillTalentHeading.fontSize}px;
      line-height: ${theme.typography.skillTalentHeading.lineHeight};
      font-weight: ${theme.typography.skillTalentHeading.fontWeight};
    }

    button {
      transition-property: background-color, box-shadow, border-color;

      &.no-selection {
        color: ${theme.palette.gray.main};
      }

      img {
        margin-right: ${theme.spacing(1)};
      }
    }
  }

  .results {
    img {
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};

      ${theme.breakpoints.down("mobile")} {
        width: ${theme.spacing(3)};
        height: ${theme.spacing(3)};
      }
    }

    .select-class-message,
    .select-subclass-message {
      display: flex;
      width: 100%;
      padding: ${theme.spacing(2, 0)};
      justify-content: center;
      align-items: center;
      color: ${theme.palette.gray.main};
    }

    .select-class-message {
      background-color: ${theme.palette.midtone.main};
      border-radius: ${theme.spacing(0.5)};
    }

    .select-subclass-message {
      background-color: ${theme.palette.midtoneDarker.main};
      border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
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
        padding: ${theme.spacing(3)};

        img {
          margin: auto;
        }
      }

      .name-container {
        display: flex;
        align-items: center;
        padding: ${theme.spacing(2, 0, 0, 2)};

        h2,
        h3 {
          margin: ${theme.spacing(0, 2, 0, 0)};
          font-size: ${theme.typography.generalHeading.fontSize}px;
          line-height: ${theme.typography.generalHeading.lineHeight};
          font-weight: ${theme.typography.generalHeadingBold.fontWeight};
        }
      }

      .analysis {
        padding: ${theme.spacing(2)};

        p {
          margin: 0;
        }
      }
    }

    .class-card {
      background-color: ${theme.palette.midtone.main};
      border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};
      border-top-right-radius: ${theme.spacing(0.5)};

      .icon-container {
        border-top-left-radius: ${theme.spacing(0.5)};
        background-color: ${theme.palette.midtoneBrighter.main};
      }
    }

    .subclass-card {
      background-color: ${theme.palette.midtoneDarker.main};
      border-bottom-right-radius: ${theme.spacing(0.5)};

      .icon-container {
        border-bottom-left-radius: ${theme.spacing(0.5)};
        background-color: ${theme.palette.midtone.main};
      }
    }
  }
`;

export const query = graphql`
  query {
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
