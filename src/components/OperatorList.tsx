import React, { Fragment, useMemo } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { css, Theme, Tooltip } from "@mui/material";
import slugify from "@sindresorhus/slugify";
import cx from "clsx";
import { rgba } from "polished";

import { OperatorListOperator, PortraitNode } from "../pages/operators";
import { professionToClass, subProfessionIdToSubclass } from "../utils/globals";
import { operatorSubclassIcon } from "../utils/images";

interface Props {
  operators: OperatorListOperator[];
  operatorsToShow: OperatorListOperator[];
  operatorsWithGuides: string[];
  portraitNodes: PortraitNode[];
  onSubclassFilter: (profession: string, subProfessionId: string) => void;
}

const OperatorList: React.VFC<Props> = React.memo((props) => {
  const {
    operators,
    operatorsToShow,
    operatorsWithGuides,
    portraitNodes,
    onSubclassFilter,
  } = props;

  const nameToSlugMap = useMemo(() => {
    return Object.fromEntries(
      operators.map((op) => [op.name, slugify(op.name)])
    );
  }, [operators]);

  return (
    <ul className="operator-list" css={styles}>
      {operators.map((op) => {
        const operatorClass = professionToClass(op.profession);
        const subclass = subProfessionIdToSubclass(op.subProfessionId);
        const hasGuide = operatorsWithGuides.includes(op.name);
        const [charName, alterName] = op.name.split(" the ");
        const portraitNode = portraitNodes.find(
          ({ name: filename }) => filename === nameToSlugMap[op.name]
        );
        if (!portraitNode) {
          throw new Error(
            `Couldn't find portrait for ${op.name}, expecting ${slugify(
              op.name
            )}`
          );
        }
        return (
          <li
            key={op.name}
            className={cx(
              "operator-card",
              hasGuide ? "has-guide" : "no-guide",
              `rarity-${op.rarity + 1}-star${op.rarity > 0 ? "s" : ""}`
            )}
            style={
              !operatorsToShow.find((opToShow) => opToShow.id === op.id)
                ? { display: "none" }
                : {}
            }
          >
            <GatsbyImage
              className="operator-portrait-container"
              imgClassName="operator-portrait"
              image={portraitNode.childImageSharp.gatsbyImageData}
              alt=""
            />
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
                        <span className="alter-name">{alterName}</span>
                      </Fragment>
                    ) : (
                      op.name
                    )}
                  </span>
                  <span
                    className="rarity"
                    title={`Rarity: ${op.rarity + 1} stars`}
                  >
                    <span className="rarity-number">{op.rarity + 1}</span>{" "}
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
                    onSubclassFilter(op.profession, op.subProfessionId)
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
                <span className="visually-hidden">Guide Unavailable</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
});
OperatorList.displayName = "OperatorList";
export default OperatorList;

const styles = (theme: Theme) => css`
  margin: ${theme.spacing(3, 3, 0)};
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${theme.spacing(3)};
  list-style: none;

  ${theme.breakpoints.down("mobile")} {
    margin: ${theme.spacing(2, 0, 0)};
    gap: ${theme.spacing(2)};
  }

  li.operator-card {
    width: 100%;
    height: 280px;
    flex-grow: 1;
    display: grid;
    grid-template-areas: "x";
    border-radius: ${theme.spacing(0.5)};
    box-shadow: ${theme.customShadows.baseShadow};
    transition: filter 0.15s ease-in-out;
    will-change: filter;
    contain: content;

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

      .operator-card-content .operator-info {
        --gradient-end: #1c1e16;
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

      .operator-card-content .operator-info {
        --gradient-end: #161b1e;
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

      .operator-card-content .operator-info {
        --gradient-end: #1c1921;
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

      .operator-card-content .operator-info {
        --gradient-end: #201d1a;
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

      .operator-card-content .operator-info {
        --gradient-end: #201916;
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
        --gradient-end: #1c1c1c;
        grid-area: info;
        align-content: end;
        display: grid;
        grid-template-rows: repeat(2, max-content);
        grid-template-columns: 1fr max-content;
        padding: ${theme.spacing(1.5)};
        row-gap: ${theme.spacing(1)};
        color: ${theme.palette.white.main};
        background: linear-gradient(
          to bottom,
          transparent 40%,
          ${rgba(theme.palette.blackest.main, 0.7)} 67%,
          var(--gradient-end) 100%
        );

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
            font-weight: ${theme.typography.operatorCardAlterName.fontWeight};
            line-height: ${theme.typography.operatorCardAlterName.lineHeight};
            text-transform: ${theme.typography.operatorCardAlterName
              .textTransform};
          }
        }

        .rarity {
          grid-column: 2;
          font-size: ${theme.typography.operatorBrowserNameHeading.fontSize}px;
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
        will-change: height;

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
        width: 100%;
        background-color: ${theme.palette.black.main};
        border-radius: ${theme.spacing(0.5)};
      }
    }
  }
`;
