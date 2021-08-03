import { css, Theme } from "@emotion/react";
import { graphql } from "gatsby";
import { transparentize } from "polished";
import { Fragment, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import { DateTime } from "luxon";
import Introduction from "../../components/Introduction";
import { OperatorObject } from "../../components/OperatorStats";
import { SkillObject } from "../../components/SkillInfo";
import Skills from "../../components/Skills";
import Synergies from "../../components/Synergies";
import { SynergyQuality } from "../../components/SynergyOperator";
import Tabs from "../../components/Tabs";
import TabButtons from "../../components/TabButtons";
import TabPanels from "../../components/TabPanels";
import { TalentObject } from "../../components/TalentInfo";
import Talents from "../../components/Talents";
import Layout from "../../Layout";
import Card from "../../components/Card";

interface MarkdownNode {
  childMarkdownRemark: {
    html: string;
  };
}

interface OperatorAnalysisData {
  operator: {
    accentColorInHex: string;
    archetype: string;
    limited: boolean;
    name: string;
    operatorImageUrl: string;
  };
  author: {
    authorDiscordTag: string;
  }[];
  introduction: MarkdownNode;
  talent1Analysis: MarkdownNode;
  talent2Analysis: MarkdownNode;
  skill1Analysis: MarkdownNode;
  skill2Analysis: MarkdownNode;
  skill3Analysis: MarkdownNode;
  operatorSynergies: {
    operatorName: string;
    synergyQuality: SynergyQuality;
    synergyDescription: MarkdownNode;
  }[];
  summary: MarkdownNode;
  updatedAt: string; // ISO 8601 timestamp
}

interface Props {
  data: {
    contentfulOperatorAnalysis: OperatorAnalysisData;
    operatorsJson: OperatorObject & {
      talents: TalentObject[];
      skillData: SkillObject[];
    };
    cnNamesJson: {
      cnName: string;
    };
    allOperatorsJson: {
      nodes: {
        name: string;
        rarity: number;
      }[];
    };
  };
}

const OperatorAnalysis: React.VFC<Props> = (props) => {
  const { data } = props;
  const {
    contentfulOperatorAnalysis: contentful,
    operatorsJson: operatorObject,
  } = data;

  const rarityMap = Object.fromEntries(
    data.allOperatorsJson.nodes.map(({ name, rarity }) => [name, rarity])
  );

  const talentAnalyses = [
    contentful.talent1Analysis.childMarkdownRemark.html,
    contentful.talent2Analysis.childMarkdownRemark.html,
  ].filter((html) => !!html);
  const skillAnalyses = [
    contentful.skill1Analysis.childMarkdownRemark.html,
    contentful.skill2Analysis.childMarkdownRemark.html,
    contentful.skill3Analysis.childMarkdownRemark.html,
  ].filter((html) => !!html);
  const synergyOperators = contentful.operatorSynergies.map((os) => ({
    name: os.operatorName,
    rarity: rarityMap[os.operatorName] + 1,
    quality: os.synergyQuality,
    analysis: os.synergyDescription.childMarkdownRemark.html,
  }));

  const mainRef = useRef<HTMLDivElement>(null);
  // force a min-height on <main> to prevent forced scrolling when changing tabs
  useEffect(() => {
    if (mainRef.current) {
      const maxChildHeight = Math.max(
        ...Array.from(
          mainRef.current.querySelectorAll(".analysis-section")
        ).map((child) => {
          child.setAttribute("style", "display: inherit;");
          const childHeight = child.getBoundingClientRect().height;
          child.removeAttribute("style");
          return childHeight;
        })
      );
      mainRef.current.setAttribute("style", `min-height: ${maxChildHeight}px;`);
    }
  }, []);

  const styles = (theme: Theme) => css`
    display: flex;

    & > .tabs {
      display: flex;
      flex-direction: column;
      z-index: 1;

      button {
        width: 192px;
        height: ${theme.spacing(6)};
        padding-left: ${theme.spacing(2)};
        margin-top: ${theme.spacing(1)};
        text-align: start;
        line-height: ${theme.typography.navigationLink.lineHeight};
        border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
        border: 0;
        background: none;
        color: ${theme.palette.gray};
        cursor: pointer;

        &:hover {
          background-color: ${transparentize(0.9, theme.palette.gray)};
          color: ${theme.palette.white};
        }

        &.active {
          background-color: ${transparentize(
            0.9,
            contentful.operator.accentColorInHex
          )};
          color: ${contentful.operator.accentColorInHex};
          border-right: 3px solid ${contentful.operator.accentColorInHex};
          font-weight: ${theme.typography.navigationLinkActive.fontWeight};
        }
      }

      .section-label {
        display: block;
      }
    }

    & > .panels {
      margin-left: -1px;

      .analysis-section {
        border-left: 1px solid ${theme.palette.midHighlight};
      }

      .analysis-section:not(.synergies) {
        .tabs {
          button.active {
            background-color: ${contentful.operator.accentColorInHex};
            border-color: ${contentful.operator.accentColorInHex};
            color: ${theme.palette.background};
          }

          button.inactive:hover {
            border-color: ${contentful.operator.accentColorInHex};
            color: ${contentful.operator.accentColorInHex};
          }
        }
      }
    }
  `;

  return (
    <Fragment>
      <Helmet>
        <title>{contentful.operator.name}</title>
      </Helmet>
      <Layout
        pageTitle={contentful.operator.name}
        bannerImageUrl={contentful.operator.operatorImageUrl}
        previousLocation="Operators"
        previousLocationLink="/operators"
        accentColor={contentful.operator.accentColorInHex}
      >
        <Tabs className="wrapper" css={styles}>
          <TabButtons className="tabs">
            {["Introduction", "Talents", "Skills", "Synergies", "Summary"].map(
              (label) => {
                return <button key={label}>{label}</button>;
              }
            )}
            <hr />
            <div className="external-links">Aceship PRTS</div>
            <hr />
            <div className="authors-section">
              <span className="section-label">Written By</span>
              <span className="authors">
                {contentful.author
                  .map((author) => author.authorDiscordTag)
                  .join(",\n")}
              </span>
            </div>
            <div className="last-updated-section">
              <span className="section-label">Last Updated</span>
              <span className="last-updated">
                {DateTime.fromISO(contentful.updatedAt).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </span>
            </div>
          </TabButtons>
          <TabPanels className="panels">
            {[
              {
                component: (
                  <Introduction
                    analysis={contentful.introduction.childMarkdownRemark.html}
                    archetype={contentful.operator.archetype}
                    operatorObject={operatorObject}
                    isLimited={contentful.operator.limited}
                  />
                ),
                className: "introduction",
              },
              {
                component: (
                  <Talents
                    analyses={talentAnalyses}
                    talentObjects={operatorObject.talents}
                  />
                ),
                className: "talents",
              },
              {
                component: (
                  <Skills
                    analyses={skillAnalyses}
                    skillObjects={operatorObject.skillData}
                  />
                ),
                className: "skills",
              },
              {
                component: <Synergies synergyOperators={synergyOperators} />,
                className: "synergies",
              },
              {
                component: (
                  <Card
                    header="Summary"
                    dangerouslySetInnerHTML={{
                      __html: contentful.summary.childMarkdownRemark.html,
                    }}
                  />
                ),
                className: "summary",
              },
            ].map(({ component, className }, i) => (
              <div className={`analysis-section ${className}`} key={i}>
                {component}
              </div>
            ))}
          </TabPanels>
        </Tabs>
      </Layout>
    </Fragment>
  );
};
export default OperatorAnalysis;

export const query = graphql`
  query ($id: String!, $operator__name: String!) {
    contentfulOperatorAnalysis(id: { eq: $id }) {
      operator {
        accentColorInHex
        archetype
        limited
        name
        operatorImageUrl
      }
      author {
        authorDiscordTag
      }
      introduction {
        childMarkdownRemark {
          html
        }
      }
      talent1Analysis {
        childMarkdownRemark {
          html
        }
      }
      talent2Analysis {
        childMarkdownRemark {
          html
        }
      }
      skill1Analysis {
        childMarkdownRemark {
          html
        }
      }
      skill2Analysis {
        childMarkdownRemark {
          html
        }
      }
      skill3Analysis {
        childMarkdownRemark {
          html
        }
      }
      operatorSynergies {
        operatorName
        synergyQuality
        synergyDescription {
          childMarkdownRemark {
            html
          }
        }
      }
      summary {
        childMarkdownRemark {
          html
        }
      }
      updatedAt
    }

    operatorsJson(name: { eq: $operator__name }) {
      name
      profession
      position
      description
      rarity
      talents {
        candidates {
          unlockCondition {
            phase
            level
          }
          requiredPotentialRank
          name
          description
          range {
            grids {
              row
              col
            }
          }
          blackboard {
            key
            value
          }
        }
      }
      phases {
        range {
          grids {
            row
            col
          }
        }
        maxLevel
        attributesKeyFrames {
          level
          data {
            maxHp
            atk
            def
            baseAttackTime
            magicResistance
            cost
            blockCnt
            respawnTime
          }
        }
      }
      skillData {
        skillId
        iconId
        levels {
          name
          description
          range {
            grids {
              row
              col
            }
          }
          skillType
          spData {
            spType
            spCost
            initSp
          }
          duration
          blackboard {
            key
            value
          }
        }
      }
    }

    cnNamesJson(enName: { eq: $operator__name }) {
      cnName
    }

    allOperatorsJson {
      nodes {
        name
        rarity
      }
    }
  }
`;
