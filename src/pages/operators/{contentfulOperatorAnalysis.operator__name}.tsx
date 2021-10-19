import { Fragment } from "react";
import { css, Global, Theme } from "@emotion/react";
import { graphql } from "gatsby";
import { rgba, transparentize } from "polished";
import { DateTime } from "luxon";
import parse, { attributesToProps } from "html-react-parser";
import { Element } from "domhandler/lib/node";

import Introduction from "../../components/Introduction";
import CharacterStats from "../../components/CharacterStats";
import SkillInfo, { SkillObject } from "../../components/SkillInfo";
import Synergies from "../../components/Synergies";
import { SynergyQuality } from "../../components/SynergyOperator";
import Tabs from "../../components/Tabs";
import TabButtons from "../../components/TabButtons";
import TabPanels from "../../components/TabPanels";
import TalentInfo, { TalentObject } from "../../components/TalentInfo";
import Layout from "../../Layout";
import { replaceSelfClosingHtmlTags } from "../../utils/globals";
import Gallery from "../../components/Gallery";
import CardWithTabs from "../../components/CardWithTabs";
import { CharacterObject } from "../../utils/types";
import useIsMobile from "../../hooks/useIsMobile";

interface HTMLToReactContext {
  skills: SkillObject[];
  talents: TalentObject[];
  operator: CharacterObject;
  summon?: CharacterObject;
}

const htmlToReact = (
  html: string,
  context: HTMLToReactContext,
  index?: number
): string | JSX.Element | JSX.Element[] => {
  return parse(replaceSelfClosingHtmlTags(html), {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "skillinfo") {
          return (
            <SkillInfo
              className="skills-skill-info"
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              skillObject={context.skills[index!]}
            />
          );
        } else if (domNode.name === "talentinfo") {
          return (
            <TalentInfo
              className="talents-talent-info"
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              talentObject={context.talents[index!]}
            />
          );
        } else if (domNode.name === "operatorstats") {
          return <CharacterStats characterObject={context.operator} />;
        } else if (domNode.name === "summonstats") {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return <CharacterStats characterObject={context.summon!} />;
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

interface AstNode {
  type: string;
  tagName: string;
  properties: Record<string, string>;
  children: AstNode[];
  value: string;
}

interface MarkdownHtmlAstNode {
  childMarkdownRemark: {
    htmlAst: AstNode;
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
  strengths: MarkdownHtmlAstNode;
  weaknesses: MarkdownHtmlAstNode;
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
    allSummonsJson: {
      nodes: CharacterObject[];
    };
  };
}

const OperatorAnalysis: React.VFC<Props> = (props) => {
  const { data } = props;
  const {
    contentfulOperatorAnalysis: contentful,
    operatorsJson: operatorObject,
  } = data;
  const summons = data.allSummonsJson.nodes;
  const context = {
    talents: operatorObject.talents,
    skills: operatorObject.skillData,
    operator: operatorObject,
    summon: summons.length > 0 ? summons[0] : undefined,
  };
  const isMobile = useIsMobile();

  const rarityMap = Object.fromEntries(
    data.allOperatorsJson.nodes.map(({ name, rarity }) => [name, rarity])
  );

  const talentAnalyses = [
    contentful.talent1Analysis.childMarkdownRemark.html,
    contentful.talent2Analysis?.childMarkdownRemark.html,
  ]
    .filter((html) => !!html)
    .map((html, i) => htmlToReact(html, context, i));
  const skillAnalyses = [
    contentful.skill1Analysis.childMarkdownRemark.html,
    contentful.skill2Analysis.childMarkdownRemark.html,
    contentful.skill3Analysis?.childMarkdownRemark.html,
  ]
    .filter((html) => !!html)
    .map((html, i) => htmlToReact(html, context, i));
  const synergyOperators = contentful.operatorSynergies.map((os) => ({
    name: os.operatorName,
    rarity: rarityMap[os.operatorName] + 1,
    quality: os.synergyQuality,
    analysis: os.synergyDescription.childMarkdownRemark.html,
  }));

  const strengths =
    contentful.strengths.childMarkdownRemark.htmlAst.children[0].children
      .filter((child) => child.tagName === "li")
      .map((child) => child.children[0].value);
  const weaknesses =
    contentful.weaknesses.childMarkdownRemark.htmlAst.children[0].children
      .filter((child) => child.tagName === "li")
      .map((child) => child.children[0].value);

  return (
    <Layout
      pageTitle={contentful.operator.name}
      bannerImageUrl={contentful.operator.operatorImageUrl}
      previousLocation="Operators"
      previousLocationLink="/operators"
    >
      <Global
        styles={globalOverrideStyles(contentful.operator.accentColorInHex)}
      />
      <Tabs component="main" css={styles(contentful.operator.accentColorInHex)}>
        <TabButtons className="tabs" isSwiper>
          {["Introduction", "Module", "Talents", "Skills", "Synergies"].map(
            (label) => (
              <button disabled={label === "Module"} key={label}>
                {label}
              </button>
            )
          )}
        </TabButtons>
        <TabPanels className="panels">
          {[
            {
              component: (
                <Introduction
                  analysis={htmlToReact(
                    contentful.introduction.childMarkdownRemark.html,
                    context
                  )}
                  isLimited={contentful.operator.limited}
                  operatorObject={operatorObject}
                  strengths={strengths}
                  weaknesses={weaknesses}
                />
              ),
              className: "introduction",
            },
            {
              component: <Fragment />,
              className: "module",
            },
            {
              component: (
                <CardWithTabs
                  header="Talents"
                  panelContent={talentAnalyses}
                  buttonLabelFn={(i) => `talent ${i + 1}`}
                />
              ),
              className: "talents",
            },
            {
              component: (
                <CardWithTabs
                  header="Skills"
                  panelContent={skillAnalyses}
                  buttonLabelFn={(i) => `skill ${i + 1}`}
                />
              ),
              className: "skills",
            },
            {
              component: <Synergies synergyOperators={synergyOperators} />,
              className: "synergies",
            },
          ].map(({ component, className }, i) => (
            <div className={`analysis-section ${className}`} key={i}>
              {component}
            </div>
          ))}
        </TabPanels>
        <div className="left-sidebar">
          {!isMobile && <hr />}
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
            {/* <div className="authors-section">
              <span className="section-label">Written by</span>
              <span className="authors">
                {contentful.author.map((author) => author.name).join(",\n")}
              </span>
            </div> */}

            <div className="last-updated-section">
              <span className="section-label">Last updated</span>
              <span className="last-updated">
                {DateTime.fromISO(contentful.updatedAt).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </span>
            </div>
          </div>
        </div>
      </Tabs>
    </Layout>
  );
};
export default OperatorAnalysis;

const globalOverrideStyles = (accentColor: string) => (theme: Theme) =>
  css`
    a {
      color: ${accentColor};
    }

    header {
      .heading-and-breadcrumb {
        h1 {
          font-size: ${theme.typography.operatorPageHeading.fontSize};
          font-weight: ${theme.typography.operatorPageHeading.fontWeight};
          line-height: ${theme.typography.operatorPageHeading.lineHeight};
          text-shadow: ${theme.typography.operatorPageHeading.textShadow};
        }
      }
    }
  `;

const styles = (accentColor: string) => (theme: Theme) =>
  css`
    display: grid;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: max-content 1fr;

    ${theme.breakpoints.down("mobile")} {
      grid-template-columns: 1fr;
    }

    .swiper-container {
      .swiper-slide-active {
        &::after {
          border-bottom-color: ${accentColor};
        }

        button {
          color: ${accentColor};
        }
      }
    }

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
        border: 0;
        background: none;
        color: ${theme.palette.gray};
        cursor: pointer;

        ${theme.breakpoints.up("maxWidth", theme.spacing(2))} {
          border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
        }

        :disabled {
          cursor: initial;
          color: ${rgba(theme.palette.gray, 0.5)};
        }

        &:not(:disabled):hover {
          background-color: ${transparentize(0.9, theme.palette.gray)};
          color: ${theme.palette.white};
        }

        &.active {
          background-color: ${transparentize(0.9, accentColor)};
          color: ${accentColor};
          border-right: 3px solid ${accentColor};
          font-weight: ${theme.typography.navigationLinkBold.fontWeight};
        }

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.cardHeading.fontSize};
          line-height: ${theme.typography.cardHeading.lineHeight};
          font-weight: ${theme.typography.cardHeading.fontWeight};
          text-transform: ${theme.typography.cardHeading.textTransform};
        }
      }
    }

    .left-sidebar {
      grid-row-start: 2;
      padding-right: ${theme.spacing(4)};

      ${theme.breakpoints.down("mobile")} {
        grid-row: 3;
        padding: ${theme.spacing(0, 2, 3)};
      }

      hr {
        border: 0;
        border-top: 1px solid ${theme.palette.midtoneBrighter};
        margin: ${theme.spacing(3)} 0 0 0;
      }

      .external-links,
      .metadata {
        padding-left: ${theme.spacing(2)};

        ${theme.breakpoints.down("mobile")} {
          padding: 0;
        }
      }

      .external-links,
      .authors-section,
      .last-updated-section {
        margin-top: ${theme.spacing(3)};
      }

      .section-label {
        display: block;
        margin-bottom: ${theme.spacing(1)};
        font-size: ${theme.typography.body2.fontSize};
        line-height: ${theme.typography.body2.lineHeight};
        color: ${theme.palette.gray};
      }

      .metadata {
        ${theme.breakpoints.down("mobile")} {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .external-links {
        a {
          margin-right: ${theme.spacing(1)};

          ${theme.breakpoints.down("mobile")} {
            display: inline-block;
            padding: ${theme.spacing(1, 2)};
            margin-right: ${theme.spacing(2)};
            font-size: ${theme.typography.navigationLink.fontSize};
            line-height: ${theme.typography.navigationLink.lineHeight};
            font-weight: ${theme.typography.navigationLinkBold.fontWeight};
            border: 1px solid ${accentColor};
            border-radius: ${theme.spacing(0.5)};
            filter: drop-shadow(
              ${theme.spacing(0.25)} ${theme.spacing(0.5)} ${theme.spacing(1)}
                rgba(0, 0, 0, 0.15)
            );
          }
        }
      }

      .last-updated-section {
        .last-updated {
          font-style: italic;
        }
      }
    }

    & > .panels {
      grid-row-start: span 3;
      grid-column: 2 / span 2;
      margin-left: -1px;
      height: 100%;
      border-left: 1px solid ${theme.palette.gray};
      backdrop-filter: blur(${theme.spacing(1)});

      ${theme.breakpoints.down("mobile")} {
        grid-row: 2;
        grid-column: 1;
        border: none;
        backdrop-filter: unset;
      }

      .analysis-section {
        height: 100%;

        section {
          height: 100%;

          .card-content {
            box-sizing: border-box;
            height: calc(
              100% - ${theme.typography.cardHeading.fontSize} *
                ${theme.typography.cardHeading.lineHeight} - ${theme.spacing(4)}
            );

            ${theme.breakpoints.down("mobile")} {
              height: 100%;
            }

            .tabs-wrapper {
              height: 100%;
            }
          }
        }
      }

      .analysis-section:not(.synergies) {
        .tab-buttons {
          button.active {
            background-color: ${accentColor};
            border-color: ${accentColor};

            svg path {
              fill: ${theme.palette.dark};
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
      strengths {
        childMarkdownRemark {
          htmlAst
        }
      }
      weaknesses {
        childMarkdownRemark {
          htmlAst
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

    allSummonsJson(filter: { operatorName: { eq: $operator__name } }) {
      nodes {
        id
        name
        profession
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
      }
    }
  }
`;
