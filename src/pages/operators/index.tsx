import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import { ClassNames, css } from "@emotion/react";
import { Theme } from "@mui/material";
import { DateTime } from "luxon";
import gatsbySlugify from "@sindresorhus/slugify";

import Layout from "../../Layout";
import {
  operatorPortrait,
  operatorSubclassIcon,
  sgPageBanner,
} from "../../utils/images";
import {
  professionToClass,
  subProfessionToSubclass,
} from "../../utils/globals";
import NavigateRightArrow from "../../components/icons/NavigateRightArrow";
import CustomCheckbox from "../../components/CustomCheckbox";

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
  };
}

const Operators: React.VFC<Props> = (props) => {
  const { nodes: operators } = props.data.allOperatorsJson;
  const { nodes: guideNodes } = props.data.allContentfulOperatorAnalysis;
  const operatorsWithGuides = new Set(
    guideNodes.map((node) => node.operator.name)
  );
  const lastUpdatedAt = guideNodes
    .map((node) => DateTime.fromISO(node.updatedAt))
    .reduce((prev, curr) => (curr > prev ? curr : prev));
  const [showOnlyGuideAvailable, setShowOnlyGuideAvailable] = useState(true);

  const handleGuideAvailableChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlyGuideAvailable(e.target.checked);
  };

  const operatorsToShow = showOnlyGuideAvailable
    ? operators.filter((op) => operatorsWithGuides.has(op.name))
    : operators;

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
          <CustomCheckbox
            label="Guide available"
            onChange={handleGuideAvailableChange}
            checked={showOnlyGuideAvailable}
          />
        </div>
        <ul className="operator-list">
          {operatorsToShow.map((op) => {
            const operatorClass = professionToClass(op.profession);
            const subclass = subProfessionToSubclass(op.subProfessionId);
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
                        <span className="operator-class">{operatorClass}</span>
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
                        <a href={`/operators/${gatsbySlugify(op.name)}`}>
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
      </main>
    </Layout>
  );
};
export default Operators;

const styles = (theme: Theme) => css`
  padding: ${theme.spacing(0, 3)};

  ${theme.breakpoints.down("mobile")} {
    padding: ${theme.spacing(0, 2)};
  }

  .last-updated {
    .date {
      font-weight: ${theme.typography.body1Bold.fontWeight};
    }
  }

  .sort-and-filter-options {
    height: 39px; // FIXME should be unnecessary once sort buttons are added
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: ${theme.typography.navigationLink.fontSize}px;
    line-height: ${theme.typography.navigationLink.lineHeight};
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
        linear-gradient(to bottom, transparent 42%, #000 100%), var(--bg-image);
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
          align-content: flex-end;
          align-items: center;
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
          object-fit: contain;
          filter: drop-shadow(
            0 ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.5)
          );
        }
      }
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
  }
`;
