import React, { Fragment, useMemo } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Tooltip } from "@mui/material";
import slugify from "@sindresorhus/slugify";
import cx from "clsx";

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
    <ul className="operator-list">
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
