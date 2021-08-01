import { css, Theme } from "@emotion/react";
import { graphql } from "gatsby";
import { transparentize } from "polished";
import { Fragment, useState } from "react";
import Helmet from "react-helmet";
import Introduction from "../../components/Introduction";
import { OperatorObject } from "../../components/OperatorStats";
import { SkillObject } from "../../components/SkillInfo";
import Skills from "../../components/Skills";
import Synergies from "../../components/Synergies";
import { SynergyQuality } from "../../components/SynergyOperator";
import { TalentObject } from "../../components/TalentInfo";
import Talents from "../../components/Talents";
import Layout from "../../Layout";

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
}

interface Props {
  data: {
    contentfulOperatorAnalysis: OperatorAnalysisData;
    operatorsJson: OperatorObject & {
      talents: TalentObject[];
      skillData: SkillObject[];
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
  const { data, ...rest } = props;
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

  const [activeTab, setActiveTab] = useState(0);

  const styles = (theme: Theme) => css`
    display: flex;
    margin-top: ${theme.spacing(3)};

    nav {
      display: flex;
      flex-direction: column;

      button {
        width: 192px;
        height: ${theme.spacing(6)};
        padding-left: ${theme.spacing(2)};
        margin-top: ${theme.spacing(1)};
        text-align: start;
        line-height: ${theme.typography.navigationLink.lineHeight};
        border-radius: ${theme.spacing(0.5)} 0 0 ${theme.spacing(0.5)};
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
      >
        <div className="wrapper" css={styles}>
          <nav role="tablist">
            {["Introduction", "Talents", "Skills", "Synergies"].map(
              (label, i) => {
                return (
                  <button
                    key={label}
                    role="tab"
                    className={i === activeTab ? "active" : "inactive"}
                    onClick={() => setActiveTab(i)}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </nav>
          <main>
            {[
              <Introduction
                analysis={contentful.introduction.childMarkdownRemark.html}
                archetype={contentful.operator.archetype}
                operatorObject={operatorObject}
                isLimited={contentful.operator.limited}
              />,
              <Talents
                analyses={talentAnalyses}
                talentObjects={operatorObject.talents}
              />,
              <Skills
                analyses={skillAnalyses}
                skillObjects={operatorObject.skillData}
              />,
              <Synergies synergyOperators={synergyOperators} />,
            ].map((panelChild, i) => (
              <div
                className="analysis-section"
                role="tabpanel"
                key={i}
                hidden={i !== activeTab}
              >
                {panelChild}
              </div>
            ))}
          </main>
        </div>
      </Layout>
    </Fragment>
  );
};
export default OperatorAnalysis;

export const query = graphql`
  query($id: String!, $operator__name: String!) {
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

    allOperatorsJson {
      nodes {
        name
        rarity
      }
    }
  }
`;
