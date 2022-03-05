import { useMemo, useState } from "react";
import { InputBase, Theme } from "@mui/material";
import FlexSearch from "flexsearch";
import {
  operatorClassIcon,
  operatorImage,
  operatorBranchIcon,
} from "../utils/images";
import { css } from "@emotion/react";
import { slugify, subclassSlugify } from "../utils/globals";
import SearchIcon from "./icons/SearchIcon";
import { transparentize } from "polished";
import levenshtein from "js-levenshtein";
import Image from "next/image";
import search from "../../data/search.json";
import ReactDOM from "react-dom";
import Link from "next/link";
import HashCompatibleNextLink from "./HashCompatibleNextLink";

// Interface representing a search result.
// This could be either a class, subclass, or operator (denoted by "type").
// This involves a certain amount of weird hacking, because each type of search
// result has different keys available to it.
export interface SearchResult {
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
  const { placeholder, whenInputChange: _, ...rest } = props;
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const index = FlexSearch.create({
    tokenize: "full",
  });
  index.import(search.index);

  const store: Record<string, SearchResult> = search.store;
  const operatorsWithGuides = search.operatorsWithGuides;

  const [query, setQuery] = useState("");
  const [isFocused, setFocus] = useState(false);

  // Gets the results based on the current query state
  // This uses memoization, so the same query will not be repeated twice
  const results = useMemo((): SearchResult[] => {
    if (!query || !index || !store) return [];

    const rawResults = index.search(query);
    // @ts-expect-error: hacky way to get the results (this is actually a Promise[])
    return rawResults.map((index): SearchResult => store[index.toString()]);
  }, [index, query, store]);

  return (
    <div
      className={`search ${isFocused ? "focused" : "not-focused"}`}
      css={styles}
      {...rest}
      onFocus={() => setFocus(true)}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        if (
          !document
            .getElementById("search-results-container")
            ?.contains(e.relatedTarget)
        ) {
          // XXX this is a hack for Safari to make operator links clickable
          setTimeout(() => setFocus(false), 0);
        }
      }}
      ref={(node) => setNode(node)}
    >
      <div className={`search-bar ${query && isFocused ? " menu-down" : ""}`}>
        <SearchIcon className="search-icon" />
        <InputBase
          className="search-input"
          placeholder={placeholder}
          onChange={(e) => {
            setFocus(true);
            setQuery(e.target.value);
            if (props.whenInputChange) {
              props.whenInputChange(e.target.value);
            }
          }}
        />
      </div>
      {results &&
        query &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <div
            id="search-results-container"
            css={searchResultsStyles}
            style={{
              top: node?.getBoundingClientRect().bottom + "px",
              left: node?.getBoundingClientRect().left + "px",
              width: node?.getBoundingClientRect().width + "px",
              display: isFocused ? "block" : "none",
            }}
          >
            {results.length > 0 ? (
              <div className="search-results">
                {results.filter((res) => res.type === "operator").length >
                  0 && (
                  <div className="operator-results">
                    <div className="category-label">Operators</div>
                    {results
                      .filter((res) => res.type === "operator")
                      .sort((a, b) =>
                        prefenshteinCompare(query, a.name, b.name)
                      )
                      .slice(0, 5) // limit of 5 operator results
                      .map((res) => {
                        const slug =
                          operatorsWithGuides[
                            res.name as keyof typeof operatorsWithGuides
                          ];
                        const url = slug != null ? `/operators/${slug}` : null;
                        const hasGuide = url != null;
                        const cardContent = (
                          <>
                            <Image
                              alt={res.name}
                              src={operatorImage(res.name)}
                              width={40}
                              height={40}
                            />
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
                          </>
                        );

                        return hasGuide ? (
                          <Link key={res.name} href={url}>
                            <a className="operator-card">{cardContent}</a>
                          </Link>
                        ) : (
                          <div
                            key={res.name}
                            className="operator-card disabled"
                          >
                            {cardContent}
                            <div className="gray-overlay" />
                          </div>
                        );
                      })}
                  </div>
                )}
                {results.filter(
                  (res) => res.type === "branch" || res.type === "class"
                ).length > 0 && (
                  <div className="classes-results">
                    <div className="category-label">Classes</div>
                    {results
                      .filter(
                        (res) => res.type === "branch" || res.type === "class"
                      )
                      .sort((a, b) =>
                        prefenshteinCompare(query, a.name, b.name)
                      )
                      .slice(0, 3) // limit of 3 subclass or class results
                      .map((res) => {
                        return res.type === "branch" ? (
                          <HashCompatibleNextLink
                            key={res.name}
                            href={`/operators#${slugify(
                              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                              res.class!
                            )}-${subclassSlugify(res.name)}`}
                          >
                            <a className="classes-card">
                              <Image
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                src={operatorBranchIcon(res.subProfession!)}
                                alt={res.subProfession}
                                height={40}
                                width={40}
                              />
                              <div className="classes-info">
                                {res.name}
                                <span className="class-name">
                                  {res.class} Branch
                                </span>
                              </div>
                            </a>
                          </HashCompatibleNextLink>
                        ) : (
                          <HashCompatibleNextLink
                            key={res.name}
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            href={`/operators#${slugify(res.class!)}`}
                          >
                            <a className="classes-card">
                              <Image
                                src={operatorClassIcon(
                                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                  res.class!.toLowerCase()
                                )}
                                alt={res.class}
                                width={40}
                                height={40}
                              />
                              <div className="classes-info">
                                {res.name}
                                <span className="class-name">Class</span>
                              </div>
                            </a>
                          </HashCompatibleNextLink>
                        );
                      })}
                  </div>
                )}
              </div>
            ) : (
              <div className="search-results">
                <div className="category-label">No results found!</div>
              </div>
            )}
          </div>,
          window.document.body
        )}
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
`;

const searchResultsStyles = (theme: Theme) => css`
  position: absolute;
  z-index: 1;
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

    .operator-card {
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
`;
