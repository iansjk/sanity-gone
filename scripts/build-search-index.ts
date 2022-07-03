import { SearchResult } from "./types";
import {
  professionToClass,
  subProfessionIdToSubclass,
} from "../src/utils/globals";
import FlexSearch from "flexsearch";
import { fetchContentfulGraphQl } from "../src/utils/fetch";
import fs from "fs";
import path from "path";
import operators from "../data/operators.json";
import branches from "../data/branches.json";

const dataDir = path.join(__dirname, "../data");

void (async () => {
  console.log("Building search index...");

  const searchArray: SearchResult[] = [];
  const searchStore: Record<string, SearchResult> = {};

  Object.values(operators)
    .filter((e) => !e.isNotObtainable)
    .forEach((op) => {
      searchArray.push({
        type: "operator",
        charId: op.charId,
        name: op.name,
        class: professionToClass(op.profession),
        subclass: subProfessionIdToSubclass(op.subProfessionId),
        rarity: `${op.rarity + 1}`,
      });
    });
  [
    "Vanguard",
    "Guard",
    "Specialist",
    "Defender",
    "Supporter",
    "Sniper",
    "Medic",
    "Caster",
  ].forEach((className) => {
    searchArray.push({
      type: "class",
      name: className,
      class: className,
    });
  });
  Object.entries(branches).forEach(([branchName, branch]) => {
    searchArray.push({
      type: "branch",
      name: branch.branchName,
      class: branch.class,
      subProfession: branchName,
    });
  });
  searchArray.forEach((value: SearchResult, i) => {
    searchStore[i] = value;
  });

  const index = FlexSearch.create({
    tokenize: "full",
  });

  Object.entries(searchStore).forEach(([key, value]) => {
    index.add(+key, value.name);
  });

  const contentfulQuery = `
  query {
    operatorAnalysisCollection {
      items {
        operator {
          name
          slug
        }
      }
    }
  }
  `;
  const { operatorAnalysisCollection } = await fetchContentfulGraphQl<{
    operatorAnalysisCollection: {
      items: {
        operator: {
          name: string;
          slug: string;
        };
      }[];
    };
  }>(contentfulQuery);

  const operatorsWithGuides = Object.fromEntries(
    operatorAnalysisCollection.items.map((item) => [
      item.operator.name,
      item.operator.slug,
    ])
  );

  fs.writeFileSync(
    path.join(dataDir, "search.json"),
    JSON.stringify(
      {
        index: index.export(),
        store: searchStore,
        operatorsWithGuides,
      },
      null,
      2
    )
  );
})();
