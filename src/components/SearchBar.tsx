import { graphql, useStaticQuery } from "gatsby";
import { useMemo, useState } from "react";
import { Input, Theme } from "@mui/material";
import FlexSearch from "flexsearch";
import { operatorImage } from "../utils/images";
import gatsbySlugify from "@sindresorhus/slugify";
import { css } from "@emotion/react";

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
      <Input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {results && query !== "" && results.length > 0 ? (
        <div className="results">
          {results.filter((res) => res.type === "operator") && (
            <div className="operator-results">
              <div>Operators</div>
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
                        hasGuide ? `/operators/${gatsbySlugify(res.name)}` : "#"
                      }
                    >
                      <img alt={res.name} src={operatorImage(res.name)} />
                      {res.name}
                    </a>
                  );
                })}
            </div>
          )}
          {results.filter((res) => res.type === "subclass") && (
            <div className="subclass-results">
              {results
                .filter((res) => res.type === "subclass")
                .map((res) => {
                  return (
                    <a className="subclass-card" href="``">
                      {res.name}
                    </a>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div className="results">
          <p>No results found!</p>
        </div>
      )}
    </div>
  );
};
export default SearchBar;

const styles = (theme: Theme) => css`
  .results {
    display: flex;
    flex-direction: column;
    position: absolute;

    .operator-results {
      display: flex;
      flex-direction: column;
      a.operator-card {
        img {
          height: ${theme.spacing(5)};
          border-radius: ${theme.spacing(0.5)};
          background: ${theme.palette.midtoneDarker.main};
        }
      }
    }
  }
`;
