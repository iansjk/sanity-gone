import React, { Fragment } from "react";
import { tint, transparentize } from "polished";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import removeMarkdown from "remove-markdown";
import { Tab } from "@headlessui/react";
import ScrollContainer from "react-indiana-drag-scroll";

import Introduction from "../../components/Introduction";
import CharacterStats from "../../components/CharacterStats";
import SkillInfo from "../../components/SkillInfo";
import Synergies from "../../components/Synergies";
import TalentInfo from "../../components/TalentInfo";
import Layout from "../../components/Layout";
import CardWithTabs, { CardWithTabsProps } from "../../components/CardWithTabs";
import { CharacterObject, DenormalizedModule } from "../../utils/types";
import MasteryRecommendation from "../../components/MasteryRecommendation";
import { operatorAvatar } from "../../utils/images";
import { Media } from "../../Media";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchContentfulGraphQl } from "../../utils/fetch";
import operatorsJson from "../../../data/operators.json";
import summonsJson from "../../../data/summons.json";
import modulesJson from "../../../data/modules.json";
import Modules from "../../components/Modules";
import { hexToRgb } from "../../utils/globals";
import useMediaQuery from "../../utils/media-query";
import { breakpoints } from "../../theme-helpers";

import * as classes from "./[slug].css";

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
          module1Analysis
          module2Analysis
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
          module1Analysis: string | null;
          module2Analysis: string | null;
          talent1Analysis: string | null;
          talent2Analysis: string | null;
          skill1Recommended: boolean;
          skill1Analysis: string | null;
          skill2Recommended: boolean;
          skill2Analysis: string | null;
          skill3Recommended: boolean;
          skill3Analysis: string | null;
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
  const modules: DenormalizedModule[] | null =
    (modulesJson[
      operatorObject.charId as keyof typeof modulesJson
    ] as unknown as DenormalizedModule[]) ?? null;
  const synergyOperatorNames = operatorAnalysis.synergiesCollection?.items
    .filter((syn) => !syn.isGroup)
    .map((syn) => syn.synergyName);

  const props: Props = {
    charId: operatorObject.charId,
    ogDescription:
      operatorAnalysis.customByline ??
      `${
        removeMarkdown(operatorAnalysis.introduction)
          .replace(/<\/?[A-za-z-]*>/g, "")
          .split(/(\.)\s*/)[0]
      }.`,
    guide: {
      operator: operatorAnalysis.operator,
      sys: operatorAnalysis.sys,
      introduction: await serialize(operatorAnalysis.introduction),
      strengths: await serialize(operatorAnalysis.strengths),
      weaknesses: await serialize(operatorAnalysis.weaknesses),
      module1Analysis:
        operatorAnalysis.module1Analysis &&
        operatorAnalysis.module1Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.module1Analysis)
          : null,
      module2Analysis:
        operatorAnalysis.module2Analysis &&
        operatorAnalysis.module2Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.module2Analysis)
          : null,
      talent1Analysis:
        operatorAnalysis.talent1Analysis &&
        operatorAnalysis.talent1Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.talent1Analysis)
          : null,
      talent2Analysis:
        operatorAnalysis.talent2Analysis &&
        operatorAnalysis.talent2Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.talent2Analysis)
          : null,
      skill1Recommended: operatorAnalysis.skill1Recommended ?? false,
      skill1Analysis:
        operatorAnalysis.skill1Analysis &&
        operatorAnalysis.skill1Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.skill1Analysis)
          : null,
      skill2Recommended: operatorAnalysis.skill2Recommended ?? false,
      skill2Analysis:
        operatorAnalysis.skill2Analysis &&
        operatorAnalysis.skill2Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.skill2Analysis)
          : null,
      skill3Recommended: operatorAnalysis.skill3Recommended ?? false,
      skill3Analysis:
        operatorAnalysis.skill3Analysis &&
        operatorAnalysis.skill3Analysis.trim().length > 0
          ? await serialize(operatorAnalysis.skill3Analysis)
          : null,
      synergies: await Promise.all(
        operatorAnalysis.synergiesCollection?.items.map(async (syn) => {
          return {
            ...syn,
            synergyDescription: await serialize(syn.synergyDescription),
          };
        }) ?? []
      ),
    },
    operatorObject,
    summons: summons as unknown as CharacterObject[],
    modules,
    allOperators: synergyOperatorNames
      ? Object.fromEntries(
          synergyOperatorNames.map((opName) => {
            const op = operatorsJson[
              opName as keyof typeof operatorsJson
            ] as CharacterObject;
            return [
              opName,
              {
                charId: op.charId,
                rarity: op.rarity,
                profession: op.profession,
                subProfessionId: op.subProfessionId,
              },
            ];
          })
        )
      : {},
  };
  return { props };
};

interface Props {
  charId: string;
  ogDescription: string;
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
    sys: {
      publishedAt: string; // ISO 8601 timestamp
    };
    introduction: MDXRemoteSerializeResult;
    strengths: MDXRemoteSerializeResult;
    weaknesses: MDXRemoteSerializeResult;
    module1Analysis: MDXRemoteSerializeResult | null;
    module2Analysis: MDXRemoteSerializeResult | null;
    talent1Analysis: MDXRemoteSerializeResult | null;
    talent2Analysis: MDXRemoteSerializeResult | null;
    skill1Recommended: boolean;
    skill1Analysis: MDXRemoteSerializeResult | null;
    skill2Recommended: boolean;
    skill2Analysis: MDXRemoteSerializeResult | null;
    skill3Recommended: boolean;
    skill3Analysis: MDXRemoteSerializeResult | null;
    synergies: {
      synergyName: string;
      synergyQuality: number | null;
      isGroup: boolean;
      customSynergyIcon: {
        url: string;
      };
      shouldInvertIconOnHighlight?: boolean;
      synergyDescription: MDXRemoteSerializeResult;
    }[];
  };
  operatorObject: CharacterObject;
  summons: CharacterObject[];
  modules: DenormalizedModule[] | null;
  allOperators: {
    [operatorName: string]: Pick<
      CharacterObject,
      "rarity" | "profession" | "subProfessionId"
    >;
  };
}

const OperatorAnalysis: React.VFC<Props> = (props) => {
  const {
    charId,
    ogDescription,
    guide,
    operatorObject,
    summons,
    allOperators,
    modules,
  } = props;
  const {
    operator,
    sys,
    introduction,
    strengths,
    weaknesses,
    module1Analysis,
    module2Analysis,
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
    skill1Recommended,
    skill2Recommended,
    skill3Recommended,
  ];

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
  const [baseChar, alterName] = operatorName.split(/\sthe\s/i);
  const shouldShowModules =
    modules && modules.length > 0 && (module1Analysis || module2Analysis);
  const talents = [talent1Analysis, talent2Analysis].filter((x) =>
    Boolean(x)
  ) as MDXRemoteSerializeResult[];
  const skills = [skill1Analysis, skill2Analysis, skill3Analysis].filter((x) =>
    Boolean(x)
  ) as MDXRemoteSerializeResult[];

  const isMobile = useMediaQuery(breakpoints.down("mobile"));
  const cardProps: Partial<CardWithTabsProps> = {
    classes: {
      headingBlock: classes.cardHeadingBlock,
      heading: classes.cardHeading,
    },
  };

  return (
    <Layout
      pageTitle={`${operatorName} Guide`}
      customPageHeading={
        alterName ? (
          <>
            <h1 className={classes.heading}>{baseChar}</h1>
            <h1 className={classes.heading}>
              <span className={classes.alterName}>The {alterName}</span>
            </h1>
          </>
        ) : (
          <h1 className={classes.heading}>{baseChar}</h1>
        )
      }
      bannerImageProps={{
        url: guide.operator.bannerImage.url,
        width: guide.operator.bannerImage.width,
        height: guide.operator.bannerImage.height,
      }}
      image={operatorAvatar(charId)}
      description={ogDescription}
      previousLocation="Operators"
      previousLocationLink="/operators"
      classes={{
        breadcrumbLink: classes.breadcrumbLink,
        header: classes.header,
        headingAndBreadcrumb: classes.headingAndBreadcrumb,
      }}
      style={
        {
          "--accent-color": operator.accentColorInHex,
          "--accent-color-rgb": hexToRgb(operator.accentColorInHex),
          "--accent-color-transparentized-09": transparentize(
            0.9,
            operator.accentColorInHex
          ),
          "--accent-color-transparentized-08": transparentize(
            0.8,
            operator.accentColorInHex
          ),
          "--accent-color-tinted-027": hexToRgb(
            tint(0.27, operator.accentColorInHex)
          ),
        } as React.CSSProperties
      }
    >
      {/* <GlobalStyles
        styles={globalOverrideStyles(
          operator.accentColorInHex,
          operator.customBgPositionX
        )(theme)}
      /> */}
      {/* we add a key prop here to force rerendering of Tabs if e.g. a user clicks a guide search result while already on a guide page */}
      <Tab.Group
        as={"main"}
        className={classes.tabContainer}
        vertical={!isMobile}
        key={operator.name}
      >
        <Tab.List as={ScrollContainer} className={classes.tabButtons}>
          {[
            ...["Introduction"],
            ...["Talents", "Skills"],
            ...(shouldShowModules ? ["Modules"] : []),
            ...(synergies.length > 0 ? ["Synergy"] : []),
          ].map((label) => (
            <Tab as={Fragment} key={label}>
              <button className={classes.button}>{label}</button>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={classes.panels}>
          {[
            ...[
              {
                component: (
                  <Introduction
                    analysis={introduction}
                    isLimited={operator.limited}
                    operatorObject={operatorObject}
                    summonObject={summons[0]}
                    strengths={strengths}
                    weaknesses={weaknesses}
                    {...cardProps}
                  />
                ),
                className: "introduction",
              },
            ],
            ...[
              {
                component: (
                  <CardWithTabs
                    header="Talents"
                    {...cardProps}
                    tabGroups={[
                      {
                        buttons: talents.map((_, i) => {
                          return { label: `talent ${i + 1}` };
                        }),
                        panels: talents.map((mdxSource, i) => (
                          <MDXRemote
                            key={i}
                            {...mdxSource}
                            components={{
                              TalentInfo: () => (
                                <TalentInfo
                                  talentObject={operatorObject.talents[i]}
                                />
                              ),
                              SummonStats: () => (
                                <CharacterStats characterObject={summons[0]} />
                              ),
                            }}
                          />
                        )),
                      },
                    ]}
                  />
                ),
                className: "talents",
              },
              {
                component: (
                  <CardWithTabs
                    header="Skills"
                    {...cardProps}
                    tabGroups={[
                      {
                        buttons: skills.map((_, i) => {
                          return { label: `skill ${i + 1}` };
                        }),
                        panels: skills.map((mdxSource, i) => (
                          <MDXRemote
                            key={i}
                            {...mdxSource}
                            components={{
                              SkillInfo: () => (
                                <SkillInfo
                                  isRecommended={skillRecommended[i]}
                                  skillObject={operatorObject.skillData[i]}
                                />
                              ),
                              SummonStats: () => (
                                <CharacterStats
                                  characterObject={
                                    summons.length > 1 ? summons[i] : summons[0]
                                  }
                                />
                              ),
                              MasteryRecommendation,
                              img: (props) => (
                                // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                                <img {...props} className={classes.imgEmbed} />
                              ),
                            }}
                          />
                        )),
                      },
                    ]}
                  />
                ),
                className: "skills",
              },
            ],
            ...(shouldShowModules
              ? [
                  {
                    component: (
                      <Modules
                        operatorName={operatorObject.name}
                        modules={modules}
                        moduleAnalyses={
                          [module1Analysis, module2Analysis].filter((x) =>
                            Boolean(x)
                          ) as MDXRemoteSerializeResult[]
                        }
                        {...cardProps}
                      />
                    ),
                    className: "modules",
                  },
                ]
              : []),
            ...(synergies.length > 0
              ? [
                  {
                    component: (
                      <Synergies synergies={synergies} {...cardProps} />
                    ),
                    className: "synergies",
                  },
                ]
              : []),
          ].map(({ component, className }, i) => (
            <Tab.Panel className={`analysis-section ${className}`} key={i}>
              {component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
        <div className={classes.leftSidebar}>
          <Media greaterThanOrEqual="mobile">
            <hr className={classes.separator} />
          </Media>
          <div className={classes.leftSidebarSection}>
            <span className={classes.sectionLabel}>External Links</span>
            <a
              className={classes.externalLink}
              href={`https://aceship.github.io/AN-EN-Tags/akhrchars.html?opname=${operatorName}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              Aceship
            </a>
            <a
              className={classes.externalLink}
              href={`http://prts.wiki/w/${encodeURIComponent(
                operatorObject.cnName
              )}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              PRTS
            </a>
          </div>
          <div className={classes.leftSidebarSection}>
            <span className={classes.sectionLabel}>Last updated</span>
            <span className={classes.lastUpdated}>
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(publishedAt))}
            </span>
          </div>
        </div>
      </Tab.Group>
    </Layout>
  );
};
export default OperatorAnalysis;
