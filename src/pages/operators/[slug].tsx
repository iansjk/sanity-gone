import React from "react";
import { Theme, useTheme, css, GlobalStyles } from "@mui/material";
import { lighten, rgba, transparentize } from "polished";
import { DateTime } from "luxon";
import parse, { attributesToProps } from "html-react-parser";
import { Element } from "domhandler/lib/node";

import Introduction from "../../components/Introduction";
import CharacterStats from "../../components/CharacterStats";
import SkillInfo, { SkillObject } from "../../components/SkillInfo";
import Synergies from "../../components/Synergies";
import Tabs from "../../components/Tabs";
import TabButtons from "../../components/TabButtons";
import TabPanels from "../../components/TabPanels";
import TalentInfo, { TalentObject } from "../../components/TalentInfo";
import Layout from "../../Layout";
import { replaceSelfClosingHtmlTags } from "../../utils/globals";
import Gallery from "../../components/Gallery";
import CardWithTabs from "../../components/CardWithTabs";
import { CharacterObject, ModuleObject } from "../../utils/types";
import MasteryRecommendation from "../../components/MasteryRecommendation";
import { operatorImage } from "../../utils/images";
import { Media } from "../../Media";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchContentfulGraphQl } from "../../utils/fetch";
import operatorsJson from "../../../data/operators.json";
import summonsJson from "../../../data/summons.json";
import modulesJson from "../../../data/modules.json";
import { markdownToHtmlString } from "../../utils/markdown";
import ModuleInfo from "../../components/ModuleInfo";
import Module from "../../components/Module";

interface HTMLToReactContext {
  skills: SkillObject[];
  recommendedSkills: boolean[];
  talents: TalentObject[];
  operator: CharacterObject;
  summon?: CharacterObject;
  module: ModuleObject | null;
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
        } else if (domNode.name === "moduleinfo") {
          if (!context.module) {
            console.log(context);
            throw new Error(
              "Can't render <ModuleInfo /> because module is missing from context. Check your console for context contents"
            );
          }

          return (
            <ModuleInfo
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              module={context.module!}
              operatorName={context.operator.charId}
            />
          );
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

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    query {
      operatorAnalysisCollection {
        items {
          operator {
            slug
          }
        }
      }
    }
  `;
  const data = await fetchContentfulGraphQl<{
    operatorAnalysisCollection: {
      items: {
        operator: {
          slug: string;
        };
      }[];
    };
  }>(query);
  const paths = data.operatorAnalysisCollection.items.map((item) => ({
    params: {
      slug: item.operator.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { slug } = params!;
  const query = `
    query {
      operatorAnalysisCollection (where: {operator: {slug: "${
        slug as string
      }" }} limit: 1) {
        items {
          operator {
            name
            limited
            bannerImage {
              url
              width
              height
            }
            accentColorInHex
            customBgPositionX
          }
          customByline
          sys {
            publishedAt
          }
          introduction
          strengths
          weaknesses
          moduleAnalysis
          talent1Analysis
          talent2Analysis
          skill1Recommended
          skill1Analysis
          skill2Recommended
          skill2Analysis
          skill3Recommended
          skill3Analysis
          synergiesCollection {
            items {
              synergyName
              synergyQuality
              isGroup
              customSynergyIcon {
                url
              }
              shouldInvertIconOnHighlight
              synergyDescription
            }
          }
        }
      }
    }  
  `;
  const data = await fetchContentfulGraphQl<{
    operatorAnalysisCollection: {
      items: [
        {
          operator: {
            name: string;
            limited: boolean;
            bannerImage: {
              url: string;
              width: number;
              height: number;
            };
            accentColorInHex: string;
            customBgPositionX: string;
          };
          customByline: string;
          sys: {
            publishedAt: string;
          };
          introduction: string;
          strengths: string;
          weaknesses: string;
          moduleAnalysis: string;
          talent1Analysis: string;
          talent2Analysis: string;
          skill1Recommended: boolean;
          skill1Analysis: string;
          skill2Recommended: boolean;
          skill2Analysis: string;
          skill3Recommended: boolean;
          skill3Analysis: string;
          synergiesCollection: {
            items: [
              {
                synergyName: string;
                synergyQuality: number | null;
                isGroup: boolean;
                customSynergyIcon: {
                  url: string;
                };
                shouldInvertIconOnHighlight: boolean;
                synergyDescription: string;
              }
            ];
          } | null;
        }
      ];
    };
  }>(query);

  const operatorAnalysis = data.operatorAnalysisCollection.items[0];
  const { name: operatorName } = operatorAnalysis.operator;
  const operatorObject = operatorsJson[
    operatorName as keyof typeof operatorsJson
  ] as unknown as CharacterObject;
  const summons = summonsJson[operatorName as keyof typeof summonsJson] ?? [];
  let modules: ModuleObject | null =
    (modulesJson[
      operatorObject.charId as keyof typeof modulesJson
    ] as unknown as ModuleObject) ?? null;
  if (!modules.hasTranslation) {
    modules = null;
  }

  const markdownListItemRegex = /^\s*-\s(.+)$/;
  const props: Props = {
    charId: operatorObject.charId,
    guide: {
      operator: operatorAnalysis.operator,
      customByline: operatorAnalysis.customByline,
      sys: operatorAnalysis.sys,
      introduction: await markdownToHtmlString(operatorAnalysis.introduction),
      strengths: operatorAnalysis.strengths
        .split("\n")
        .filter((line) => markdownListItemRegex.exec(line))
        .map((line) => {
          const match = markdownListItemRegex.exec(line);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return match![1];
        }),
      weaknesses: operatorAnalysis.weaknesses
        .split("\n")
        .filter((line) => markdownListItemRegex.exec(line))
        .map((line) => {
          const match = markdownListItemRegex.exec(line);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return match![1];
        }),
      moduleAnalysis: await markdownToHtmlString(
        operatorAnalysis.moduleAnalysis
      ),
      talent1Analysis: await markdownToHtmlString(
        operatorAnalysis.talent1Analysis
      ),
      talent2Analysis: await markdownToHtmlString(
        operatorAnalysis.talent2Analysis
      ),
      skill1Recommended: operatorAnalysis.skill1Recommended,
      skill1Analysis: await markdownToHtmlString(
        operatorAnalysis.skill1Analysis
      ),
      skill2Recommended: operatorAnalysis.skill2Recommended,
      skill2Analysis: await markdownToHtmlString(
        operatorAnalysis.skill2Analysis
      ),
      skill3Recommended: operatorAnalysis.skill3Recommended,
      skill3Analysis: await markdownToHtmlString(
        operatorAnalysis.skill3Analysis
      ),
      synergies: operatorAnalysis.synergiesCollection?.items ?? [],
    },
    operatorObject,
    summons: summons as unknown as CharacterObject[],
    module: modules,
    allOperators: Object.fromEntries(
      Object.entries(operatorsJson).map(([opName, op]) => [
        opName,
        {
          rarity: op.rarity,
          profession: op.profession,
          subProfessionId: op.subProfessionId,
        },
      ])
    ),
  };
  return { props };
};

interface Props {
  charId: string; // for aceship.json in postbuild task
  guide: {
    operator: {
      accentColorInHex: string;
      limited: boolean;
      name: string;
      bannerImage: {
        url: string;
        width: number;
        height: number;
      };
      customBgPositionX: string;
    };
    customByline?: string;
    sys: {
      publishedAt: string; // ISO 8601 timestamp
    };
    introduction: string;
    strengths: string[];
    weaknesses: string[];
    moduleAnalysis: string;
    talent1Analysis: string;
    talent2Analysis: string;
    skill1Recommended?: boolean;
    skill1Analysis: string;
    skill2Recommended?: boolean;
    skill2Analysis: string;
    skill3Recommended?: boolean;
    skill3Analysis: string;
    synergies: {
      synergyName: string;
      synergyQuality: number | null;
      isGroup: boolean;
      customSynergyIcon: {
        url: string;
      };
      shouldInvertIconOnHighlight?: boolean;
      synergyDescription: string;
    }[];
  };
  operatorObject: CharacterObject;
  summons: CharacterObject[];
  module: ModuleObject | null;
  allOperators: {
    [operatorName: string]: Pick<
      CharacterObject,
      "rarity" | "profession" | "subProfessionId"
    >;
  };
}

const OperatorAnalysis: React.VFC<Props> = (props) => {
  const { guide, operatorObject, summons, allOperators, module } = props;
  const {
    operator,
    customByline,
    sys,
    introduction,
    strengths,
    weaknesses,
    moduleAnalysis,
    talent1Analysis,
    talent2Analysis,
    skill1Recommended,
    skill2Recommended,
    skill3Recommended,
    skill1Analysis,
    skill2Analysis,
    skill3Analysis,
    synergies: synergiesRaw,
  } = guide;
  const { publishedAt } = sys;
  const skillRecommended = [
    skill1Recommended ?? false,
    skill2Recommended ?? false,
    skill3Recommended ?? false,
  ];
  const context = {
    talents: operatorObject.talents,
    skills: operatorObject.skillData,
    recommendedSkills: skillRecommended,
    operator: operatorObject,
    module: module,
    summon: summons.length > 0 ? summons[0] : undefined,
  };
  const theme = useTheme();
  const moduleAnalysisHtml =
    module != null ? htmlToReact(moduleAnalysis, context) : null;

  const talentAnalyses = [talent1Analysis, talent2Analysis]
    .filter((html) => !!html)
    .map((html, i) => htmlToReact(html, context, i));

  const skillAnalyses = [skill1Analysis, skill2Analysis, skill3Analysis]
    .filter((html) => !!html)
    .map((html, i) => {
      // if this operator has per-skill summons, then pass the correct summon for this skill
      if (summons.length > 1) {
        context.summon = summons[i];
      }
      return htmlToReact(html, context, i);
    });

  const synergies = synergiesRaw.map((syn) => {
    const baseProps = {
      name: syn.synergyName,
      isGroup: syn.isGroup,
      analysis: syn.synergyDescription,
      shouldInvertIconOnHighlight: syn.shouldInvertIconOnHighlight,
      quality: syn.synergyQuality,
    };
    if (syn.isGroup) {
      if (!syn.customSynergyIcon.url) {
        throw new Error(
          `Missing customSynergyIcon for group synergy "${syn.synergyName}"`
        );
      }
      return {
        ...baseProps,
        iconUrl: syn.customSynergyIcon.url,
      };
    }
    return { ...baseProps, ...allOperators[syn.synergyName] };
  });

  const operatorName = operator.name;
  const [baseChar, alterName] = operatorName.split(" the ");
  const description = `${
    introduction.replace(/<\/?[A-za-z-]*>/g, "").split(/(\.)\s*/)[0]
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
      bannerImageProps={{
        url: guide.operator.bannerImage.url,
        width: guide.operator.bannerImage.width,
        height: guide.operator.bannerImage.height,
      }}
      image={operatorImage(operatorName)}
      description={customByline ?? description}
      previousLocation="Operators"
      previousLocationLink="/operators"
    >
      <GlobalStyles
        styles={globalOverrideStyles(
          operator.accentColorInHex,
          operator.customBgPositionX
        )(theme)}
      />
      {/* we add a key prop here to force rerendering of Tabs if e.g. a user clicks a guide search result while already on a guide page */}
      <Tabs
        component="main"
        key={operator.name}
        css={styles(operator.accentColorInHex)}
      >
        <TabButtons className="tabs" isSwiper>
          {[
            ...["Introduction"],
            ...(module != null ? ["Module"] : []),
            ...["Talents", "Skills"],
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
                    analysis={htmlToReact(introduction, context)}
                    isLimited={operator.limited}
                    operatorObject={operatorObject}
                    strengths={strengths}
                    weaknesses={weaknesses}
                  />
                ),
                className: "introduction",
              },
            ],
            ...(module != null
              ? [
                  {
                    component: (
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      <Module analysis={moduleAnalysisHtml} />
                    ),
                    className: "module",
                  },
                ]
              : []),
            ...[
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
            <div className="last-updated-section">
              <span className="section-label">Last updated</span>
              <span className="last-updated">
                {DateTime.fromISO(publishedAt).toLocaleString(
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

      button:not(.synergy-operator-button) {
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

      button:not(.synergy-operator-button).active {
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
