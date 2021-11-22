import { useMemo, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { InputBase, Theme } from "@mui/material";
import FlexSearch from "flexsearch";
import {
  operatorClassIcon,
  operatorImage,
  operatorSubclassIcon,
} from "../utils/images";
import gatsbySlugify from "@sindresorhus/slugify";
import { css } from "@emotion/react";
import { slugify } from "../utils/globals";
import SearchIcon from "./icons/SearchIcon";
import { transparentize } from "polished";
import levenshtein from "js-levenshtein";

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

// Interface representing a search result.
// This could be either a class, subclass, or operator (denoted by "type").
// This involves a certain amount of weird hacking, because each type of search
// result has different keys available to it.
interface SearchResult {
  type: string;
  name: string;
  class?: string;
  subclass?: string;
  rarity?: string;
  subProfession?: string;
}

// the onInputChange function prop is necessary to hide the other elements in
// the mobile menu while the search is active (CSS doesn't let me do it).
interface SearchBarProps {
  placeholder: string;
  whenInputChange?: (input: string) => void;
}

// helper method to sort the results, because FlexSearch isn't very good at it
// compares prefix first, then if both are either prefixed or not prefixed,
// it compares based on Levenshtein distance instead
// I know, my naming skills are impeccable
const prefenshteinCompare = (query: string, a: string, b: string) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const lowercaseQuery = query.toLowerCase();

  const startsWithA = a.startsWith(lowercaseQuery);
  const startsWithB = b.startsWith(lowercaseQuery);
  if (startsWithA && !startsWithB) {
    return -1;
  }
  if (startsWithB && !startsWithA) {
    return 1;
  }
  return levenshtein(lowercaseQuery, a) - levenshtein(lowercaseQuery, b);
};

const SearchBar: React.VFC<SearchBarProps> = (props) => {
  const { placeholder, ...rest } = props;

  // need to read the list of guides, to disable the links to operators without
  // guides yet
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
  const [isFocused, setFocus] = useState(false);

  // Gets the results based on the current query state
  // This uses memoization, so the same query will not be repeated twice
  const results = useMemo((): SearchResult[] => {
    if (!query || !index || !store) return [];

    // @ts-expect-error trust me bro its a string array
    const rawResults: string[] = index.search(query);

    return rawResults.map((name: string): SearchResult => store[name]);
  }, [index, query, store]);

  return (
    <div
      className={`search ${isFocused ? "focused" : "not-focused"}`}
      css={styles}
      {...rest}
      onFocus={() => setFocus(true)}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        // @ts-expect-error React docs tells me to do this
        if (e.currentTarget.contains(e.relatedTarget)) {
          return;
        }
        setFocus(false);
      }}
    >
      <div className={`search-bar ${query && isFocused ? " menu-down" : ""}`}>
        <SearchIcon className="search-icon" />
        <InputBase
          className="search-input"
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            if (props.whenInputChange) {
              props.whenInputChange(e.target.value);
            }
          }}
        />
      </div>
      {results &&
        query &&
        (results.length > 0 ? (
          <div className="search-results">
            {results.filter((res) => res.type === "operator").length > 0 && (
              <div className="operator-results">
                <div className="category-label">Operators</div>
                {results
                  .filter((res) => res.type === "operator")
                  .sort((a, b) => prefenshteinCompare(query, a.name, b.name))
                  .slice(0, 5) // limit of 5 operator results
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
                        {!hasGuide && <div className="gray-overlay" />}
                      </a>
                    );
                  })}
              </div>
            )}
            {results.filter(
              (res) => res.type === "subclass" || res.type === "class"
            ).length > 0 && (
              <div className="classes-results">
                <div className="category-label">Classes</div>
                {results
                  .filter(
                    (res) => res.type === "subclass" || res.type === "class"
                  )
                  .sort((a, b) => prefenshteinCompare(query, a.name, b.name))
                  .slice(0, 3) // limit of 3 subclass or class results
                  .map((res) => {
                    return res.type === "subclass" ? (
                      <a
                        className="classes-card"
                        key={res.name}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        href={`/operators#${slugify(res.class!)}-${slugify(
                          res.name
                        )}`}
                      >
                        <img
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          src={operatorSubclassIcon(res.subProfession!)}
                          alt={res.subProfession}
                        />
                        <div className="classes-info">
                          {res.name}
                          <span className="class-name">{res.class} Branch</span>
                        </div>
                      </a>
                    ) : (
                      <a
                        className="classes-card"
                        key={res.name}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        href={`/operators#${slugify(res.class!)}`}
                      >
                        <img
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          src={operatorClassIcon(res.class!)}
                          alt={res.class}
                        />
                        <div className="classes-info">
                          {res.name}
                          <span className="class-name">Class</span>
                        </div>
                      </a>
                    );
                  })}
              </div>
            )}
          </div>
        ) : (
          <div className="search-results">
            <div className="category-label">No results found!</div>
          </div>
        ))}
    </div>
  );
};
export default SearchBar;

const styles = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: ${theme.spacing(52)};

  img {
    object-fit: contain;
  }

  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: ${theme.spacing(4.5)};
    border-radius: ${theme.spacing(0.5)};
    border: 1px solid ${transparentize(0.9, theme.palette.white.main)};

    &:hover {
      border: 1px solid ${transparentize(0.8, theme.palette.white.main)};
      background: ${transparentize(0.67, theme.palette.dark.main)};
    }

    &:focus-within {
      border: 1px solid ${theme.palette.gray.main};
      background: ${theme.palette.dark.main};
    }

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

      & > input::placeholder {
        opacity: 0.66;
      }
    }
  }

  &.not-focused {
    .search-results {
      display: none;
    }
  }

  .search-results {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    width: 100%;
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

        // logic for disabled buttons
        &.disabled {
          cursor: default;
          opacity: 25%;
        }

        &:hover:not(.disabled) {
          background: ${theme.palette.midtoneBrighter.main};
        }
      }
    }

    .classes-results {
      display: flex;
      flex-direction: column;

      a.classes-card {
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

        .classes-info {
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