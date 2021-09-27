import { css, Theme } from "@emotion/react";
import { graphql } from "gatsby";
import { transparentize } from "polished";
import { Fragment, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import { DateTime } from "luxon";
import parse, { attributesToProps } from "html-react-parser";
import { Element } from "domhandler/lib/node";

import Introduction from "../../components/Introduction";
import OperatorStats from "../../components/OperatorStats";
import SkillInfo, { SkillObject } from "../../components/SkillInfo";
import Synergies from "../../components/Synergies";
import { SynergyQuality } from "../../components/SynergyOperator";
import Tabs from "../../components/Tabs";
import TabButtons from "../../components/TabButtons";
import TabPanels from "../../components/TabPanels";
import TalentInfo, { TalentObject } from "../../components/TalentInfo";
import Layout from "../../Layout";
import Card from "../../components/Card";
import { replaceSelfClosingHtmlTags, slugify } from "../../utils/globals";
import { defaultTheme } from "../../theme";
import Gallery from "../../components/Gallery";
import CardWithTabs from "../../components/CardWithTabs";
import { CharacterObject } from "../../utils/types";

type HTMLToReactContext = Partial<{
  skills: SkillObject[];
  talents: TalentObject[];
  operator: CharacterObject;
}>;

const htmlToReact = (
  html: string,
  context?: HTMLToReactContext
): string | JSX.Element | JSX.Element[] => {
  return parse(replaceSelfClosingHtmlTags(html), {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "skillinfo") {
          return (
            <SkillInfo
              className="skills-skill-info"
              skillObject={context!.skills!.shift()!}
            />
          );
        } else if (domNode.name === "talentinfo") {
          return (
            <TalentInfo
              className="talents-talent-info"
              talentObject={context!.talents!.shift()!}
            />
          );
        } else if (domNode.name === "operatorstats") {
          return <OperatorStats operatorObject={context!.operator!} />;
        } else if ((domNode.firstChild as Element).name === "img") {
          const contents = (domNode.children as Element[])
            .filter((element) => element.name === "img")
            .map((imgElement, i) => (
              <img key={i} {...attributesToProps(imgElement.attribs)} />
            ));
          return <Gallery contents={contents} />;
        }
      }
      return domNode;
    },
  });
};

interface MarkdownNode {
  childMarkdownRemark: {
    html: string;
  };
}

interface OperatorAnalysisData {
  operator: {
    accentColorInHex: string;
    limited: boolean;
    name: string;
    operatorImageUrl: string;
    archetype: {
      archetypeName: string;
    };
  };
  author: {
    name: string;
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
    operatorsJson: CharacterObject & {
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
  ]
    .filter((html) => !!html)
    .map((html) => htmlToReact(html, { talents: operatorObject.talents }));
  const skillAnalyses = [
    contentful.skill1Analysis.childMarkdownRemark.html,
    contentful.skill2Analysis.childMarkdownRemark.html,
    contentful.skill3Analysis.childMarkdownRemark.html,
  ]
    .filter((html) => !!html)
    .map((html) => htmlToReact(html, { skills: operatorObject.skillData }));
  const synergyOperators = contentful.operatorSynergies.map((os) => ({
    name: os.operatorName,
    rarity: rarityMap[os.operatorName] + 1,
    quality: os.synergyQuality,
    analysis: os.synergyDescription.childMarkdownRemark.html,
  }));

  const mainRef = useRef<HTMLDivElement>(null);
  // force a min-height on <main> to prevent forced scrolling when changing tabs
  useEffect(() => {
    const handle = setInterval(() => {
      if (
        mainRef.current &&
        document.body.classList.contains(
          `wf-${slugify(defaultTheme.typography.body.family)}--loaded`
        )
      ) {
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
        mainRef.current.setAttribute(
          "style",
          `min-height: ${maxChildHeight}px;`
        );
        clearInterval(handle);
      }
      return () => clearInterval(handle);
    }, 500);
  }, []);

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
        <Tabs
          component="main"
          ref={mainRef}
          css={styles(contentful.operator.accentColorInHex)}
        >
          <TabButtons className="tabs">
            {["Introduction", "Talents", "Skills", "Synergies", "Summary"].map(
              (label) => {
                return <button key={label}>{label}</button>;
              }
            )}
          </TabButtons>
          <div className="left-sidebar">
            <hr />
            <div className="external-links">
              <a
                href={`https://aceship.github.io/AN-EN-Tags/akhrchars.html?opname=${contentful.operator.name}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                Aceship
              </a>
              <a
                href={`http://prts.wiki/w/${encodeURIComponent(
                  operatorObject.cnName
                )}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                PRTS
              </a>
            </div>
            <hr />
            <div className="metadata">
              <div className="authors-section">
                <span className="section-label">Written By</span>
                <span className="authors">
                  {contentful.author.map((author) => author.name).join(",\n")}
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
            </div>
          </div>
          <TabPanels className="panels">
            {[
              {
                component: (
                  <Introduction
                    analysis={htmlToReact(
                      contentful.introduction.childMarkdownRemark.html,
                      { operator: operatorObject }
                    )}
                    isLimited={contentful.operator.limited}
                    operatorObject={operatorObject}
                  />
                ),
                className: "introduction",
              },
              {
                component: (
                  <CardWithTabs
                    header="Talents"
                    panelContent={talentAnalyses}
                    buttonLabelFn={(i) => `talent ${i}`}
                  />
                ),
                className: "talents",
              },
              {
                component: (
                  <CardWithTabs
                    header="Skills"
                    panelContent={skillAnalyses}
                    buttonLabelFn={(i) => `skill ${i}`}
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
                  <Card header="Summary">
                    {htmlToReact(contentful.summary.childMarkdownRemark.html)}
                  </Card>
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

const styles = (accentColor: string) => (theme: Theme) =>
  css`
    display: grid;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: max-content 1fr;

    & > .tabs {
      display: flex;
      flex-direction: column;
      border-right: 1px solid ${theme.palette.midHighlight};
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
          background-color: ${transparentize(0.9, accentColor)};
          color: ${accentColor};
          border-right: 3px solid ${accentColor};
          font-weight: ${theme.typography.navigationLinkActive.fontWeight};
        }

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.cardHeading.size};
          line-height: ${theme.typography.cardHeading.lineHeight};
          font-weight: ${theme.typography.cardHeading.weight};
          text-transform: ${theme.typography.cardHeading.textTransform};
        }
      }
    }

    .left-sidebar {
      grid-row-start: 2;
      padding-right: ${theme.spacing(4)};
      border-right: 1px solid ${theme.palette.midHighlight};

      hr {
        border: 0;
        border-top: 1px solid ${theme.palette.mid};
        margin: ${theme.spacing(3)} 0 0 0;
      }

      .external-links,
      .metadata {
        padding-left: ${theme.spacing(2)};
      }

      .external-links,
      .authors-section,
      .last-updated-section {
        margin-top: ${theme.spacing(3)};
      }

      .section-label {
        display: block;
        margin-bottom: ${theme.spacing(1)};
        font-size: ${theme.typography.body2.size};
        line-height: ${theme.typography.body2.lineHeight};
        color: ${theme.palette.gray};
      }

      .external-links {
        a {
          margin-right: ${theme.spacing(1)};
        }
      }
    }

    & > .panels {
      grid-row-start: span 3;
      margin-left: -1px;

      .analysis-section {
        border-left: 1px solid ${theme.palette.midHighlight};

        .operator-class-subclass {
          .subclass-name {
            color: ${accentColor};
          }

          svg line {
            stroke: ${accentColor};
          }
        }
      }

      .analysis-section:not(.synergies) {
        .tab-buttons {
          button.active {
            background-color: ${accentColor};
            border-color: ${accentColor};

            svg path {
              fill: ${theme.palette.background};
            }
          }

          button.inactive:hover {
            border-color: ${accentColor};

            svg path {
              fill: ${accentColor};
            }
          }
        }
      }
    }
  `;

export const query = graphql`
  query ($id: String!, $operator__name: String!) {
    contentfulOperatorAnalysis(id: { eq: $id }) {
      operator {
        accentColorInHex
        limited
        name
        operatorImageUrl
        archetype {
          archetypeName
        }
      }
      author {
        name
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
      cnName
      profession
      subProfessionId
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
