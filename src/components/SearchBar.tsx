import { graphql, useStaticQuery } from "gatsby";
import { useMemo, useState } from "react";
import { InputBase, Theme } from "@mui/material";
import FlexSearch from "flexsearch";
import { operatorImage, operatorSubclassIcon } from "../utils/images";
import gatsbySlugify from "@sindresorhus/slugify";
import { css } from "@emotion/react";
import { slugify } from "../utils/globals";
import SearchIcon from "./icons/SearchIcon";

interface SearchQuery {
  localSearchGlobal: {
    index: string;
    store: Record<string, SearchResult>;
  };
  allContentfulOperatorAnalysis: {
    nodes: {
      operator: {
        name: string;
      };
    }[];
  };
}

interface SearchResult {
  type: string;
  name: string;
  class?: string;
  subclass?: string;
  rarity?: string;
  subProfession?: string;
}

const SearchBar: React.VFC = () => {
  const search: SearchQuery = useStaticQuery(graphql`
    query SearchQuery {
      localSearchGlobal {
        index
        store
      }
      allContentfulOperatorAnalysis {
        nodes {
          operator {
            name
          }
        }
      }
    }
  `);

  const store = search.localSearchGlobal.store;
  const index = FlexSearch.create();
  index.import(search.localSearchGlobal.index);

  const operatorsWithGuides = new Set(
    search.allContentfulOperatorAnalysis.nodes.map((node) => node.operator.name)
  );

  const [query, setQuery] = useState("");

  const results = useMemo((): SearchResult[] => {
    if (!query || !index || !store) return [];

    // @ts-expect-error trust me bro its a string array
    const rawResults: string[] = index.search(query, 5); //limit of 5 results

    console.log(rawResults);
    return rawResults.map((name: string): SearchResult => store[name]);
  }, [index, query, store]);

  return (
    <div className="search" css={styles}>
      <div className={query ? "search-bar menu-down" : "search-bar"}>
        <SearchIcon className="search-icon" />
        <InputBase
          className="search-input"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      {results &&
        query &&
        (results.length > 0 ? (
          <div className="results">
            {results.filter((res) => res.type === "operator").length > 0 && (
              <div className="operator-results">
                <div className="category-label">Operators</div>
                {results
                  .filter((res) => res.type === "operator")
                  .map((res) => {
                    const hasGuide = operatorsWithGuides.has(res.name);
                    return (
                      <a
                        className={
                          hasGuide ? "operator-card" : "operator-card disabled"
                        }
                        key={res.name}
                        href={
                          hasGuide
                            ? `/operators/${gatsbySlugify(res.name)}`
                            : "#"
                        }
                      >
                        <img alt={res.name} src={operatorImage(res.name)} />
                        <div className="operator-info">
                          {res.name}
                          <div className="rarity-and-class">
                            <span
                              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                              className={`rarity rarity-${res.rarity!}-stars`}
                            >
                              {res.rarity}★
                            </span>
                            <span className="class-and-subclass">
                              {res.class}&nbsp; •&nbsp; {res.subclass}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </div>
            )}
            {results.filter((res) => res.type === "subclass").length > 0 && (
              <div className="archetype-results">
                <div className="category-label">Archetypes</div>
                {results
                  .filter((res) => res.type === "subclass")
                  .map((res) => {
                    return (
                      <a
                        className="archetype-card"
                        key={res.name}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        href={`/classes#${slugify(res.class!)}-${slugify(
                          res.name
                        )}`}
                      >
                        <img
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          src={operatorSubclassIcon(res.subProfession!)}
                          alt={res.subProfession}
                        />
                        <div className="archetype-info">
                          {res.name}
                          <span className="class-name">
                            {res.class} Subclass
                          </span>
                        </div>
                      </a>
                    );
                  })}
              </div>
            )}
          </div>
        ) : (
          <div className="results">
            <div className="category-label">No results found!</div>
          </div>
        ))}
    </div>
  );
};
export default SearchBar;

const styles = (theme: Theme) => css`
  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: ${theme.spacing(52)};
    height: ${theme.spacing(4.5)};
    border-radius: ${theme.spacing(0.5)};
    border: 1px solid ${theme.palette.gray.main};

    &.menu-down {
      border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
    }
    .search-icon {
      margin: ${theme.spacing(0, 2)};
    }
    .search-input {
      flex: 1 1 0;
      color: ${theme.palette.white.main};
      margin: ${theme.spacing(1, 0)};
      font-size: ${theme.typography.body2.fontSize}px;
    }
  }

  .results {
    width: ${theme.spacing(52)};
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 5;
    background-color: ${theme.palette.midtone.main};
    border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
    border: 1px solid ${theme.palette.midtoneBrighter.main};

    .category-label {
      height: ${theme.spacing(4.5)};
      padding-left: ${theme.spacing(2)};
      display: flex;
      align-items: center;
      background: ${theme.palette.midtone.main};

      font-size: ${theme.typography.body3.fontSize}px;
      line-height: ${theme.typography.body3.lineHeight};
      color: ${theme.palette.gray.main};
    }

    .operator-results {
      display: flex;
      flex-direction: column;

      a.operator-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: ${theme.spacing(8)};
        padding-left: ${theme.spacing(2)};

        img {
          height: ${theme.spacing(5)};
          border-radius: ${theme.spacing(0.5)};
          background: ${theme.palette.midtoneDarker.main};
        }

        .operator-info {
          display: flex;
          flex-direction: column;
          color: ${theme.palette.white.main};
          margin-left: ${theme.spacing(2)};

          .rarity-and-class {
            display: flex;
            flex-direction: row;
            font-size: ${theme.typography.body3.fontSize}px;
            line-height: ${theme.typography.body3.lineHeight};

            .rarity {
              width: ${theme.spacing(3)};
            }
            .class-and-subclass {
              color: ${theme.palette.gray.main};
            }
          }
        }

        &.disabled {
          // cursor: default;
        }

        &:hover {
          // add :not(.disabled)
          background: ${theme.palette.midtoneBrighter.main};
        }
      }
    }

    .archetype-results {
      display: flex;
      flex-direction: column;

      a.archetype-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: ${theme.spacing(8)};
        padding-left: ${theme.spacing(2)};

        img {
          height: ${theme.spacing(5)};
          width: ${theme.spacing(5)};
          border-radius: ${theme.spacing(0.5)};
        }

        .archetype-info {
          display: flex;
          flex-direction: column;
          color: ${theme.palette.white.main};
          margin-left: ${theme.spacing(2)};

          .class-name {
            font-size: ${theme.typography.body3.fontSize}px;
            line-height: ${theme.typography.body3.lineHeight};
            color: ${theme.palette.gray.main};
          }
        }

        &:hover {
          background: ${theme.palette.midtoneBrighter.main};
        }
      }
    }
  }
`;
