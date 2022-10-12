import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import slugify from "@sindresorhus/slugify";
import { MdArrowForwardIos } from "react-icons/md";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetStaticProps } from "next";

import Layout from "../../components/Layout";
import {
  classToProfession,
  subclassToSubProfessionId,
  professionToClass,
  subProfessionIdToSubclass,
  toTitleCase,
} from "../../utils/globals";
import CustomCheckbox from "../../components/CustomCheckbox";
import FilterIcon from "../../components/icons/FilterIcon";
import HorizontalScroller from "../../components/HorizontalScroller";
import TraitInfo from "../../components/TraitInfo";
import OperatorList, {
  OperatorListOperator,
} from "../../components/OperatorList";
import { Media } from "../../Media";
import { fetchContentfulGraphQl } from "../../utils/fetch";
import { DenormalizedCharacter } from "../../../scripts/types";
import operatorListBannerImage from "../../images/page-banners/operators.jpg";
import { operatorClassIcon, operatorBranchIcon } from "../../utils/images";
import {
  DropdownSelect,
  DropdownOption,
  DropdownSelectRef,
} from "../../components/DropdownSelect";

import * as classes from "./index.css";

const MENU_ICON_SIZE = 18;

interface Props {
  allOperators: OperatorListOperator[];
  classes: {
    [profession: string]: {
      className: string;
      profession: string;
      analysis: MDXRemoteSerializeResult;
    };
  };
  branches: {
    [subProfessionId: string]: {
      subProfessionId: string;
      analysis: MDXRemoteSerializeResult | null;
      class: {
        profession: string;
      };
    };
  };
  operatorsWithGuides: { [operatorName: string]: string }; // operator name -> slug
}

export const getStaticProps: GetStaticProps = async () => {
  const { default: operatorsJson } = await import(
    "../../../data/operators.json"
  );
  const { default: branchesJson } = await import("../../../data/branches.json");
  const allOperators = Object.values(operatorsJson).map((operator) => {
    const { charId, name, isCnOnly, profession, subProfessionId, rarity } =
      operator as DenormalizedCharacter;
    return {
      charId,
      name,
      isCnOnly,
      profession,
      subProfessionId,
      rarity,
    };
  });

  const query = `
    query {
      operatorClassCollection {
        items {
          className
          profession
          analysis
        }
      }
      operatorSubclassCollection {
        items {
          subProfessionId
          analysis
          class {
            profession
          }
        }
      }
      operatorAnalysisCollection {
        items {
          operator {
            slug
            name
            sys {
              publishedAt
            }
          }
        }
      }
    }
  `;
  const {
    operatorClassCollection,
    operatorSubclassCollection,
    operatorAnalysisCollection,
  } = await fetchContentfulGraphQl<{
    operatorClassCollection: {
      items: {
        className: string;
        profession: string;
        analysis: string;
      }[];
    };
    operatorSubclassCollection: {
      items: {
        subProfessionId: string;
        analysis: string;
        class: {
          profession: string;
        };
      }[];
    };
    operatorAnalysisCollection: {
      items: {
        operator: {
          slug: string;
          name: string;
          sys: {
            publishedAt: string;
          };
        };
      }[];
    };
  }>(query);

  const contentfulBranchEntries = Object.fromEntries(
    operatorSubclassCollection.items.map((entry) => [
      entry.subProfessionId,
      entry,
    ])
  );
  const branchesWithAnalyses = await Promise.all(
    Object.entries(branchesJson).map(
      async ([subProfessionId, { class: className }]) => {
        const contentfulEntry = contentfulBranchEntries[subProfessionId];
        return {
          subProfessionId,
          class: contentfulEntry?.class ?? {
            profession: classToProfession(className),
          },
          analysis:
            contentfulEntry?.analysis != null
              ? await serialize(contentfulEntry.analysis)
              : null,
        };
      }
    )
  );

  const classesWithAnalyses = await Promise.all(
    operatorClassCollection.items.map(async (item) => ({
      ...item,
      analysis: await serialize(item.analysis),
    }))
  );
  const operatorsWithGuides = Object.fromEntries(
    operatorAnalysisCollection.items.map((item) => [
      item.operator.name,
      item.operator.slug,
    ])
  );
  const props: Props = {
    allOperators,
    classes: Object.fromEntries(
      classesWithAnalyses.map((akClass) => [akClass.profession, akClass])
    ),
    branches: Object.fromEntries(
      branchesWithAnalyses.map((branch) => [branch.subProfessionId, branch])
    ),
    operatorsWithGuides,
  };
  return { props };
};

const Operators: React.VFC<Props> = (props) => {
  const {
    allOperators,
    classes: opClasses,
    branches,
    operatorsWithGuides,
  } = props;

  const [showOnlyGuideAvailable, setShowOnlyGuideAvailable] = useState(true);
  const [showClassDescriptions, setShowClassDescriptions] = useState(true);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [selectedSubProfessionId, setSelectedSubProfessionId] = useState<
    string | null
  >(null);
  const router = useRouter();
  const classDropdownRef = useRef<DropdownSelectRef>(null);

  const hashChangeCallback = useCallback(() => {
    const hash = window.location.hash;
    if (hash.length > 0) {
      const classMatch = /^#([^-]*?)(?:-(.*?))?$/.exec(hash);
      const opClass = classMatch ? classMatch[1] : "";
      const opSubclass = classMatch
        ? classMatch[2]
          ? classMatch[2]
              .split("_")
              .map((word) => toTitleCase(word))
              .join(" ")
          : ""
        : ""; // yes i nested 2 ternary statements, cry about it
      setSelectedProfession(classToProfession(toTitleCase(opClass)));
      setSelectedSubProfessionId(subclassToSubProfessionId(opSubclass));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeCallback);
    router.events.on("hashChangeComplete", hashChangeCallback);
    hashChangeCallback(); // run once on mount
    return () => {
      window.removeEventListener("hashchange", hashChangeCallback);
      router.events.off("hashChangeComplete", hashChangeCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashChangeCallback]);

  const handleGuideAvailableChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlyGuideAvailable(e.target.checked);
  };

  const handleSubclassFilter = useCallback(
    (profession: string, subProfessionId: string) => {
      setSelectedProfession(profession);
      setSelectedSubProfessionId(subProfessionId);
    },
    []
  );

  const handleResetFilter = () => {
    setSelectedProfession(null);
    setSelectedSubProfessionId(null);
    classDropdownRef.current?.button?.focus();
  };

  const selectedClass =
    selectedProfession != null ? professionToClass(selectedProfession) : null;
  const selectedSubclass =
    selectedSubProfessionId != null
      ? subProfessionIdToSubclass(selectedSubProfessionId)
      : null;

  const filterSettings = useMemo(
    () => ({
      showOnlyGuideAvailable,
      selectedProfession,
      selectedSubProfessionId,
    }),
    [selectedProfession, selectedSubProfessionId, showOnlyGuideAvailable]
  );

  const sortAndFilterOptions = (
    <>
      <span className={classes.filterVisualLabel}>
        <FilterIcon />
        Filters
      </span>

      <DropdownSelect
        buttonContent={
          selectedProfession ? (
            <>
              <Image
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={operatorClassIcon(slugify(selectedClass!))}
                alt=""
                width={MENU_ICON_SIZE}
                height={MENU_ICON_SIZE}
              />
              <span>{selectedClass}</span>
            </>
          ) : (
            "All Classes"
          )
        }
        value={selectedProfession}
        onChange={(newValue) => setSelectedProfession(newValue)}
        classes={{
          button: classes.sortAndFilterButton,
        }}
        ref={classDropdownRef}
      >
        <DropdownOption value={null}>All Classes</DropdownOption>
        {Object.values(opClasses).map(
          ({ className: operatorClassName, profession }) => (
            <DropdownOption key={profession} value={profession}>
              <Image
                src={operatorClassIcon(slugify(operatorClassName))}
                alt=""
                width={MENU_ICON_SIZE}
                height={MENU_ICON_SIZE}
              />
              <span>{operatorClassName}</span>
            </DropdownOption>
          )
        )}
      </DropdownSelect>

      <DropdownSelect
        buttonContent={
          selectedSubProfessionId ? (
            <>
              <Image
                src={operatorBranchIcon(selectedSubProfessionId)}
                alt=""
                width={MENU_ICON_SIZE}
                height={MENU_ICON_SIZE}
              />
              <span>{selectedSubclass}</span>
            </>
          ) : (
            "All Branches"
          )
        }
        disabled={selectedProfession == null}
        value={selectedSubProfessionId}
        onChange={(newValue) => setSelectedSubProfessionId(newValue)}
        classes={{
          button: classes.sortAndFilterButton,
        }}
      >
        <DropdownOption value={null}>All Branches</DropdownOption>
        {Object.values(branches)
          .filter(
            ({ class: subclassClass }) =>
              subclassClass.profession === selectedProfession
          )
          .map(({ subProfessionId }) => (
            <DropdownOption key={subProfessionId} value={subProfessionId}>
              <Image
                src={operatorBranchIcon(subProfessionId)}
                alt=""
                width={MENU_ICON_SIZE}
                height={MENU_ICON_SIZE}
              />
              <span>{subProfessionIdToSubclass(subProfessionId)}</span>
            </DropdownOption>
          ))}
      </DropdownSelect>

      {(selectedProfession != null || selectedSubProfessionId != null) && (
        <button
          className={classes.resetFiltersButton}
          onClick={handleResetFilter}
        >
          Reset
        </button>
      )}

      <CustomCheckbox
        className={classes.guideAvailableCheckbox}
        label="Guide available"
        onChange={handleGuideAvailableChange}
        checked={showOnlyGuideAvailable}
      />
    </>
  );

  return (
    <Layout
      pageTitle="Operator List"
      bannerImage={operatorListBannerImage}
      blendPoint={496}
      classes={{
        topFold: classes.topFold,
        headerMainWrapper: classes.headerMainWrapper,
        header: classes.header,
        headingAndBreadcrumb: classes.headingAndBreadcrumb,
        heading: classes.heading,
        pageContent: classes.pageContent,
        footer: classes.footer,
      }}
      /* No previous location for now
      previousLocation="Home"
      previousLocationLink="/"
       */
    >
      <main className={classes.main}>
        <div className={classes.mainContainer}>
          {/* <span className="last-updated">
          Last Updated:{" "}
          <span className="date">
            {lastUpdatedAt
              .setLocale("en-GB")
              .toLocaleString(DateTime.DATE_FULL)}
          </span>
        </span> */}
          <Media lessThan="mobile">
            <HorizontalScroller className={classes.sortAndFilterOptions}>
              {sortAndFilterOptions}
            </HorizontalScroller>
          </Media>
          <Media greaterThanOrEqual="mobile">
            <div className={classes.sortAndFilterOptions}>
              {sortAndFilterOptions}
            </div>
          </Media>

          {selectedProfession != null && (
            <div className={classes.toggleButtonContainer}>
              <button
                className={classes.toggleClassDescriptionsButton}
                aria-expanded={showClassDescriptions ? "true" : undefined}
                aria-controls="class-subclass-card-container"
                onClick={() => setShowClassDescriptions((curr) => !curr)}
              >
                Class Description
                <MdArrowForwardIos />
              </button>
            </div>
          )}
          <div className={classes.classSubclassDescriptions}>
            {showClassDescriptions && (
              <div id="class-subclass-card-container">
                {selectedProfession && selectedClass && (
                  <section className={classes.classDescriptionCard}>
                    <div className={classes.classDescriptionIconContainer}>
                      <Image
                        key={selectedClass}
                        src={operatorClassIcon(slugify(selectedClass))}
                        alt=""
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className={classes.nameContainer}>
                      <h2 className={classes.classOrSubclassHeading}>
                        <span className="visually-hidden">
                          Selected class:{" "}
                        </span>
                        {selectedClass}
                      </h2>
                      <span className={classes.headingType} aria-hidden="true">
                        Class
                      </span>
                    </div>
                    <div className={classes.classOrSubclassDescription}>
                      <MDXRemote {...opClasses[selectedProfession].analysis} />
                    </div>
                  </section>
                )}
                {selectedSubProfessionId && (
                  <section className={classes.subclassDescriptionCard}>
                    <div className={classes.subclassDescriptionIconContainer}>
                      <Image
                        key={selectedSubProfessionId}
                        src={operatorBranchIcon(selectedSubProfessionId)}
                        alt=""
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className={classes.nameContainer}>
                      <h3 className={classes.classOrSubclassHeading}>
                        <span className="visually-hidden">
                          Selected branch:{" "}
                        </span>
                        {selectedSubclass}
                      </h3>
                      <span className={classes.headingType} aria-hidden="true">
                        Branch
                      </span>
                    </div>
                    {selectedSubProfessionId && (
                      <div className={classes.traitInfoContainer}>
                        <TraitInfo
                          subProfessionId={selectedSubProfessionId}
                          showSubclassIcon={false}
                        />
                      </div>
                    )}
                    <div className={classes.classOrSubclassDescription}>
                      {branches[selectedSubProfessionId].analysis != null && (
                        <MDXRemote
                          {...branches[selectedSubProfessionId].analysis!}
                          components={{
                            BranchNamePlural: () => (
                              <strong>
                                {selectedSubclass!} {selectedClass!}s
                              </strong>
                            ),
                          }}
                        />
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={classes.resultsContainer}>
          <section className={classes.results}>
            <h2 className={classes.resultsHeading}>Operators</h2>
            <OperatorList
              operators={allOperators}
              filterSettings={filterSettings}
              operatorsWithGuides={operatorsWithGuides}
              onSubclassFilter={handleSubclassFilter}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
};
export default Operators;
