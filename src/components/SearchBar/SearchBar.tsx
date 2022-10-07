/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import FlexSearch, { Index } from "flexsearch";
import { Combobox } from "@headlessui/react";
import levenshtein from "js-levenshtein";
import { useRouter } from "next/router";

import {
  operatorAvatar,
  operatorClassIcon,
  operatorBranchIcon,
} from "../../utils/images";
import { slugify, subclassSlugify } from "../../utils/globals";
import SearchIcon from "../icons/SearchIcon";
import search from "../../../data/search.json";

import * as classes from "./styles.css";

interface ClassSearchResult {
  type: "class";
  name: string;
  class: string;
}

interface BranchSearchResult {
  type: "branch";
  name: string;
  class: string;
  subProfession: string;
}

interface OperatorSearchResult {
  type: "operator";
  charId: string;
  name: string;
  class: string;
  subclass: string;
  rarity: string;
}

export type SearchResult =
  | ClassSearchResult
  | BranchSearchResult
  | OperatorSearchResult;

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

interface Props {
  placeholder: string;
  onSelected?: () => void;
}

const SearchBar: React.VFC<Props> = ({ placeholder, onSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const index = useRef<null | Index<SearchResult>>(null);
  const router = useRouter();

  useEffect(() => {
    index.current = FlexSearch.create({
      tokenize: "full",
    });
    index.current.import(search.index);
  }, []);

  const results: SearchResult[] = useMemo(() => {
    if (index.current == null || query.length === 0) {
      return [];
    }
    return (
      index.current
        .search(query)
        // @ts-expect-error this does NOT return Promise<T[]>, it returns T[] synchronously
        .map((resultIndex) => search.store[resultIndex])
    );
  }, [query]);

  let operatorResults: OperatorSearchResult[] = [];
  let classResults: (ClassSearchResult | BranchSearchResult)[] = [];
  results.forEach((result) => {
    if (result.type === "operator") {
      operatorResults.push(result);
    } else {
      classResults.push(result);
    }
  });
  operatorResults = operatorResults
    .sort((a, b) => prefenshteinCompare(query, a.name, b.name))
    .slice(0, 5); // limit of 5 operator results
  classResults = classResults
    .sort((a, b) => prefenshteinCompare(query, a.name, b.name))
    .slice(0, 3); // limit of 3 subclass or class results

  return (
    <form
      role="search"
      className={classes.root}
      onClick={() => inputRef.current?.focus()}
    >
      <SearchIcon className={classes.searchIcon} />
      <Combobox<SearchResult>
        onChange={(value) => {
          if (value.type === "operator") {
            router.push(`/operators/${slugify(value.name)}`);
          } else if (value.type === "class") {
            router.push(`/operators#${slugify(value.class)}`);
          } else {
            router.push(
              `/operators#${slugify(value.class)}-${subclassSlugify(
                value.name
              )}`
            );
          }
          onSelected && onSelected();
        }}
      >
        <Combobox.Input<"input">
          ref={inputRef}
          className={classes.input}
          aria-label="Search operators and guides"
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Combobox.Options<"div"> as="div" className={classes.results}>
          {operatorResults.length > 0 && (
            <ul
              role="group"
              aria-labelledby="search-results-operators"
              className={classes.optionGroup}
            >
              <li
                role="presentation"
                id="search-results-operators"
                className={classes.optionGroupLabel}
              >
                Operators
              </li>
              {operatorResults.map((result) => {
                const hasGuide =
                  search.operatorsWithGuides[
                    result.name as keyof typeof search.operatorsWithGuides
                  ] != null;
                return (
                  <Combobox.Option<"li", SearchResult | null>
                    key={result.charId}
                    className={classes.option}
                    disabled={!hasGuide}
                    value={result}
                  >
                    <img
                      className={classes.optionIcon.operator}
                      alt=""
                      src={operatorAvatar(result.charId)}
                      width={40}
                      height={40}
                    />
                    <span>{result.name}</span>
                    <span className={classes.optionSubtitle}>
                      <span
                        className={
                          classes.rarity[
                            result.rarity as unknown as keyof typeof classes.rarity
                          ]
                        }
                      >
                        {result.rarity}★
                      </span>
                      <span>
                        {result.class}&nbsp; •&nbsp; {result.subclass}
                      </span>
                    </span>
                  </Combobox.Option>
                );
              })}
            </ul>
          )}
          {classResults.length > 0 && (
            <ul
              role="group"
              aria-labelledby="search-results-classes"
              className={classes.optionGroup}
            >
              <li
                role="presentation"
                id="search-results-classes"
                className={classes.optionGroupLabel}
              >
                Classes
              </li>
              {classResults.map((result) => (
                <Combobox.Option<"li", SearchResult | null>
                  key={
                    "subProfession" in result
                      ? result.subProfession
                      : result.class
                  }
                  className={classes.option}
                  value={result}
                >
                  <img
                    className={classes.optionIcon[result.type]}
                    alt=""
                    src={
                      result.type === "class"
                        ? operatorClassIcon(result.class.toLowerCase())
                        : operatorBranchIcon(result.subProfession)
                    }
                    width={40}
                    height={40}
                  />
                  <span>{result.name}</span>
                  <span className={classes.optionSubtitle}>
                    {result.type === "class"
                      ? "Class"
                      : `${result.class} Branch`}
                  </span>
                </Combobox.Option>
              ))}
            </ul>
          )}
          {query && results.length === 0 && (
            <Combobox.Option<"li", SearchResult | null>
              className={classes.optionGroupLabel}
              value={null}
            >
              No results found!
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox>
    </form>
  );
};

export default SearchBar;
