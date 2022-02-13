import { Theme, useTheme, css, GlobalStyles } from "@mui/material";
import { graphql } from "gatsby";
import { lighten, rgba, transparentize } from "polished";
import { DateTime } from "luxon";
import parse, { attributesToProps } from "html-react-parser";
import { Element } from "domhandler/lib/node";

import Introduction from "../../components/Introduction";
import CharacterStats from "../../components/CharacterStats";
import SkillInfo, { SkillObject } from "../../components/SkillInfo";
import Synergies from "../../components/Synergies";
import { SynergyQuality } from "../../components/Synergy";
import Tabs from "../../components/Tabs";
import TabButtons from "../../components/TabButtons";
import TabPanels from "../../components/TabPanels";
import TalentInfo, { TalentObject } from "../../components/TalentInfo";
import Layout from "../../Layout";
import { replaceSelfClosingHtmlTags } from "../../utils/globals";
import Gallery from "../../components/Gallery";
import CardWithTabs from "../../components/CardWithTabs";
import { CharacterObject } from "../../utils/types";
import MasteryRecommendation from "../../components/MasteryRecommendation";
import { operatorImage } from "../../utils/images";
import { Media } from "../../Media";

interface HTMLToReactContext {
  skills: SkillObject[];
  recommendedSkills: boolean[];
  talents: TalentObject[];
  operator: CharacterObject;
  contentfulAssets: ContentfulAsset[];
  summon?: CharacterObject;
}

const contentfulSrcUrlRegex =
  /\/\/images\.ctfassets.net\/(?<spaceId>[^/]+)\/(?<contentfulId>[^/]+)/;

const contentfulSrcToLocalFilePath = (
  srcUrl: string,
  contentfulAssets: ContentfulAsset[]
): string => {
  const match = contentfulSrcUrlRegex.exec(srcUrl);
  if (match?.groups?.spaceId == null || match?.groups?.contentfulId == null) {
    throw new Error(
      `Don't know how to convert this contentful asset URL: ${srcUrl}`
    );
  }
  const { spaceId, contentfulId } = match.groups;
  const asset = contentfulAssets.find(
    (asset) => asset.spaceId === spaceId && asset.contentful_id === contentfulId
  );
  if (asset == null) {
    throw new Error(
      `Didn't find a matching asset for this contentful asset URL: ${srcUrl} (spaceId = ${spaceId}, contentfulId = ${contentfulId})`
    );
  }
  return asset.localFile.publicURL;
};

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
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              isRecommended={context.recommendedSkills[index!]}
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
          if (!context.summon) {
            console.log(context);
            throw new Error(
              "Can't render <SummonStats /> because summon is missing from context. Check your console for context contents"
            );
          }
          return <CharacterStats characterObject={context.summon} />;
        } else if (domNode.name === "masteryrecommendation") {
          const props = attributesToProps(domNode.attribs);
          return (
            //@ts-expect-error props will contain level and priority
            <MasteryRecommendation
              {...props}
              //@ts-expect-error children[0].data should exist on a text node
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              analysis={domNode.children[0].data}
            />
          );
        } else if ((domNode.firstChild as Element)?.name === "img") {
          const contents = (domNode.children as Element[])
            .filter((element) => element.name === "img")
            .map((imgElement, i) => {
              const { src: contentfulSrc, ...rest } = imgElement.attribs;
              const patchedAttributes = {
                src: contentfulSrcToLocalFilePath(
                  contentfulSrc,
                  context.contentfulAssets
                ),
                ...rest,
              };
              return <img key={i} {...attributesToProps(patchedAttributes)} />;
            });
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
    bannerImage: {
      localFile: {
        publicURL: string;
      };
    };
    customBgPositionX: string;
  };
  author: {
    name: string;
  }[];
  introduction: MarkdownNode;
  customByline?: string;
  talent1Analysis: MarkdownNode;
  talent2Analysis: MarkdownNode;
  skill1Recommended?: boolean;
  skill1Analysis: MarkdownNode;
  skill2Recommended?: boolean;
  skill2Analysis: MarkdownNode;
  skill3Recommended?: boolean;
  skill3Analysis: MarkdownNode;
  synergies:
    | {
        synergyName: string;
        isGroup: boolean;
        synergyQuality: SynergyQuality;
        synergyDescription: MarkdownNode;
        shouldInvertIconOnHighlight?: boolean;
        customSynergyIcon: {
          localFile: {
            publicURL: string;
          };
        };
      }[]
    | null;
  strengths: MarkdownHtmlAstNode;
  weaknesses: MarkdownHtmlAstNode;
  updatedAt: string; // ISO 8601 timestamp
}

interface ContentfulAsset {
  spaceId: string;
  contentful_id: string;
  localFile: {
    publicURL: string;
  };
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
        profession: string;
        subProfessionId: string;
      }[];
    };
    allSummonsJson: {
      nodes: CharacterObject[];
    };
    allContentfulAsset: {
      nodes: ContentfulAsset[];
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
  const contentfulAssets = data.allContentfulAsset.nodes;

  const skillRecommended = [
    contentful.skill1Recommended ?? false,
    contentful.skill2Recommended ?? false,
    contentful.skill3Recommended ?? false,
  ];
  const context = {
    talents: operatorObject.talents,
    skills: operatorObject.skillData,
    recommendedSkills: skillRecommended,
    operator: operatorObject,
    contentfulAssets,
    summon: summons.length > 0 ? summons[0] : undefined,
  };
  const theme = useTheme();

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
    .map((html, i) => {
      // if this operator has per-skill summons, then pass the correct summon for this skill
      if (summons.length > 1) {
        context.summon = summons[i];
      }
      return htmlToReact(html, context, i);
    });

  const operatorMap = Object.fromEntries(
    data.allOperatorsJson.nodes.map(({ name, ...rest }) => [name, rest])
  );

  const synergies = (contentful.synergies ?? []).map((syn) => {
    const baseProps = {
      name: syn.synergyName,
      isGroup: syn.isGroup,
      quality: syn.synergyQuality,
      analysis: syn.synergyDescription.childMarkdownRemark.html,
      shouldInvertIconOnHighlight: syn.shouldInvertIconOnHighlight,
    };
    if (syn.isGroup) {
      if (!syn.customSynergyIcon?.localFile?.publicURL) {
        throw new Error(
          `Missing customSynergyIcon for group synergy "${syn.synergyName}"`
        );
      }
      return {
        ...baseProps,
        iconUrl: syn.customSynergyIcon.localFile.publicURL,
      };
    }
    return { ...baseProps, ...operatorMap[syn.synergyName] };
  });

  const strengths =
    contentful.strengths.childMarkdownRemark.htmlAst.children[0].children
      .filter((child) => child.tagName === "li")
      .map((child) => child.children[0].value);
  const weaknesses =
    contentful.weaknesses.childMarkdownRemark.htmlAst.children[0].children
      .filter((child) => child.tagName === "li")
      .map((child) => child.children[0].value);

  const operatorName = contentful.operator.name;
  const [baseChar, alterName] = operatorName.split(" the ");
  const description = `${
    contentful.introduction.childMarkdownRemark.html
      .replace(/<\/?[A-za-z-]*>/g, "")
      .split(/(\.)\s*/)[0]
  }.`;

  return (
    <Layout
      pageTitle={`${operatorName} Guide`}
      customPageHeading={
        alterName ? (
          <>
            <h1>{baseChar}</h1>
            <h1>
              <span className="alter-name">The {alterName}</span>
            </h1>
          </>
        ) : (
          <h1>{baseChar}</h1>
        )
      }
      bannerImageUrl={contentful.operator.bannerImage.localFile.publicURL}
      image={operatorImage(operatorName)}
      description={contentful.customByline ?? description}
      previousLocation="Operators"
      previousLocationLink="/operators"
    >
      <GlobalStyles
        styles={globalOverrideStyles(
          contentful.operator.accentColorInHex,
          contentful.operator.customBgPositionX
        )(theme)}
      />
      <Tabs component="main" css={styles(contentful.operator.accentColorInHex)}>
        <TabButtons className="tabs" isSwiper>
          {[
            ...["Introduction", "Talents", "Skills"],
            ...(synergies.length > 0 ? ["Synergies"] : []),
          ].map((label) => (
            <button key={label}>{label}</button>
          ))}
        </TabButtons>
        <TabPanels className="panels">
          {[
            ...[
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
            ],
            ...(synergies.length > 0
              ? [
                  {
                    component: <Synergies synergies={synergies} />,
                    className: "synergies",
                  },
                ]
              : []),
          ].map(({ component, className }, i) => (
            <div className={`analysis-section ${className}`} key={i}>
              {component}
            </div>
          ))}
        </TabPanels>
        <div className="left-sidebar">
          <Media greaterThanOrEqual="mobile">
            <hr />
          </Media>
          <div className="external-links">
            <span className="section-label">External Links</span>
            <a
              className="emphasized-link"
              href={`https://aceship.github.io/AN-EN-Tags/akhrchars.html?opname=${operatorName}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              Aceship
            </a>
            <a
              className="emphasized-link"
              href={`http://prts.wiki/w/${encodeURIComponent(
                operatorObject.cnName
              )}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              PRTS
            </a>
          </div>
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

const globalOverrideStyles =
  (accentColor: string, customBgPositionX?: string) => (theme: Theme) =>
    css`
      ${customBgPositionX &&
      css`
        body {
          background-position-x: ${customBgPositionX};
        }
      `}

      a {
        color: ${accentColor};
      }

      .heading-block {
        background: linear-gradient(
            90deg,
            ${transparentize(0.9, accentColor)},
            transparent
          ),
          ${transparentize(0.67, theme.palette.midtoneBrighter.main)};
      }

      header {
        height: ${theme.spacing(30.5)};

        .heading-and-breadcrumb {
          h1 {
            font-size: ${theme.typography.operatorPageHeading.fontSize}px;
            font-weight: ${theme.typography.operatorPageHeading.fontWeight};
            line-height: ${theme.typography.operatorPageHeading.lineHeight};
            text-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)}
              rgba(0, 0, 0, 0.5);

            .alter-name {
              display: block;
              font-size: ${theme.typography.generalHeading.fontSize}px;
              line-height: ${theme.typography.generalHeading.lineHeight};
              font-weight: normal;
            }

            ${theme.breakpoints.down("mobile")} {
              font-size: ${theme.typography.operatorNameHeading.fontSize}px;
              font-weight: ${theme.typography.operatorNameHeading.fontWeight};
              line-height: ${theme.typography.operatorNameHeading.lineHeight};
              margin-top: 0;

              .alter-name {
                font-weight: normal;
              }
            }
          }
          .breadcrumb > a {
            color: ${rgba(lighten(0.27, accentColor), 0.66)};
            background-color: ${rgba(accentColor, 0.08)};

            &:hover {
              color: ${lighten(0.27, accentColor)};
              background-color: ${rgba(accentColor, 0.4)};
            }
          }
        }
      }
    `;

const styles = (accentColor: string) => (theme: Theme) =>
  css`
    padding: ${theme.spacing(0, 3)};
    margin: ${theme.spacing(3, 0, 0)};
    display: grid;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: max-content 1fr;

    ${theme.breakpoints.down("mobile")} {
      margin: ${theme.spacing(2, 0, 0)};
      padding: 0;
      grid-template-columns: 1fr;
    }

    .fresnel-container {
      display: grid;
    }

    .fresnel-container > .swiper-container {
      background-color: ${transparentize(0.34, theme.palette.dark.main)};
      backdrop-filter: blur(8px);

      button {
        box-sizing: border-box;
        padding: ${theme.spacing(2)};
        width: max-content;
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        font-size: ${theme.typography.cardHeading.fontSize}px;
        font-weight: ${theme.typography.cardHeading.fontWeight};
        line-height: ${theme.typography.cardHeading.lineHeight};
        text-transform: ${theme.typography.cardHeading.textTransform};

        &:not(.active) {
          color: ${theme.palette.gray.main};
        }

        &.active {
          &::after {
            content: " ";
            display: inline-block;
            width: ${theme.spacing(4)};
            position: absolute;
            left: calc(50% - ${theme.spacing(2)});
            bottom: 0;
            border-bottom-width: 3px;
            border-bottom-style: solid;
          }
        }
      }

      button.active {
        color: ${accentColor};

        &::after {
          border-bottom-color: ${accentColor};
        }
      }
    }

    .fresnel-container > .tabs {
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
        border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
        background: none;
        color: ${theme.palette.gray.main};
        cursor: pointer;

        :disabled {
          cursor: initial;
          color: ${rgba(theme.palette.gray.main, 0.5)};
        }

        &:not(:disabled):not(.active):hover {
          background-color: ${transparentize(0.9, theme.palette.gray.main)};
          color: ${theme.palette.white.main};
        }

        &.active {
          background-color: ${transparentize(0.9, accentColor)};
          color: ${accentColor};
          border-right: 3px solid ${accentColor};
          font-weight: ${theme.typography.navigationLinkBold.fontWeight};
        }

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.cardHeading.fontSize}px;
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
        border-top: 1px solid ${theme.palette.midtoneBrighter.main};
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
        font-size: ${theme.typography.body2.fontSize}px;
        line-height: ${theme.typography.body2.lineHeight};
        color: ${theme.palette.gray.main};
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

          color: ${rgba(lighten(0.27, accentColor), 0.66)};
          background-color: ${rgba(accentColor, 0.08)};

          &:hover {
            color: ${lighten(0.27, accentColor)};
            background-color: ${rgba(accentColor, 0.4)};
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
      border-left: 1px solid ${theme.palette.gray.main};
      backdrop-filter: blur(8px);

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
              100% - ${theme.typography.cardHeading.fontSize}px *
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
              fill: ${theme.palette.dark.main};
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
        customBgPositionX
        bannerImage {
          localFile {
            publicURL
          }
        }
      }
      introduction {
        childMarkdownRemark {
          html
        }
      }
      customByline
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
      skill1Recommended
      skill1Analysis {
        childMarkdownRemark {
          html
        }
      }
      skill2Recommended
      skill2Analysis {
        childMarkdownRemark {
          html
        }
      }
      skill3Recommended
      skill3Analysis {
        childMarkdownRemark {
          html
        }
      }
      synergies {
        synergyName
        isGroup
        synergyQuality
        synergyDescription {
          childMarkdownRemark {
            html
          }
        }
        customSynergyIcon {
          localFile {
            publicURL
          }
        }
        shouldInvertIconOnHighlight
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
      favorKeyFrames {
        level
        data {
          atk
          def
          magicResistance
          maxHp
        }
      }
      potentialRanks {
        type
        description
        buff {
          attributes {
            attributeModifiers {
              attributeType
              value
            }
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
        profession
        subProfessionId
      }
    }

    allSummonsJson(filter: { operatorName: { eq: $operator__name } }) {
      nodes {
        charId
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

    allContentfulAsset {
      nodes {
        spaceId
        contentful_id
        localFile {
          publicURL
        }
      }
    }
  }
`;
