/* eslint-disable */
// @ts-nocheck

import fs from "fs";
import path from "path";
import enCharacterTable from "../../ArknightsGameData/en_US/gamedata/excel/character_table.json";
import cnCharacterTable from "../../ArknightsGameData/zh_CN/gamedata/excel/character_table.json";
import enSkillTable from "../../ArknightsGameData/en_US/gamedata/excel/skill_table.json";
import cnSkillTable from "../../ArknightsGameData/zh_CN/gamedata/excel/skill_table.json";
import rangeTable from "../../ArknightsGameData/en_US/gamedata/excel/range_table.json";
import jetSkillTranslations from "./jet-tls/skills.json";
import jetTalentTranslations from "./jet-tls/talents.json";
import jetTraitTranslations from "./jet-tls/traits.json";
import { Character, SkillAtLevel } from "./gamedata-types";
import { subProfessionLookup } from "../utils/globals";
import {
  descriptionToHtml,
  InterpolatedValue,
} from "../utils/description-parser";

const dataDir = path.join(__filename, "../../data");
const jetSkillDescriptionRegex =
  /{{(?<tagName>[^}]+)}(:(?<formatString>[0-9.%f]+))?}/;
const fixJetSkillDescriptionTags = (description: string): string => {
  let newDescription = description;
  // need to convert tag formatting used in Jet's TL json data
  // from e.g. {{attack@atk_scale}:.0%} to {attack@atk_scale:0%}
  // to match formatting used in skill_table.json
  let match: RegExpMatchArray | null = null;
  do {
    match = jetSkillDescriptionRegex.exec(newDescription);
    if (match?.groups) {
      const { tagName, formatString } = match.groups;

      let newFormatString: string | null = null;
      if (formatString === ".0%") {
        newFormatString = "0%";
      } else if (formatString === ".0f") {
        newFormatString = null;
      } else if (formatString != null) {
        newFormatString = formatString;
      }

      newDescription = newDescription.replace(
        jetSkillDescriptionRegex,
        `{${tagName}${newFormatString ? `:${newFormatString}` : ""}}`
      );
    }
  } while (match);
  return newDescription;
};

const NAME_OVERRIDES: Record<string, string> = {
  "THRM-EX": "Thermal-EX",
};
const useNameOverride = (name: string) => NAME_OVERRIDES[name] ?? name;

(() => {
  const enCharacterIds = new Set(Object.keys(enCharacterTable));
  const cnOnlyCharacters = Object.entries(cnCharacterTable).filter(
    ([id]) => !enCharacterIds.has(id)
  );

  const summonIdToOperatorName: Record<string, string> = {};
  const denormalizedCharacters = (
    [...Object.entries(enCharacterTable), ...cnOnlyCharacters] as [
      string,
      Character
    ][]
  )
    .filter(([_, character]) => character.profession !== "TRAP")
    .map(([id, character], i) => {
      const isCnOnly = !enCharacterIds.has(id);
      const characterName = useNameOverride(
        isCnOnly ? character.appellation : character.name
      );

      character.skills
        .filter((skill) => skill.overrideTokenKey != null)
        .forEach((skill) => {
          summonIdToOperatorName[skill.overrideTokenKey!] = characterName;
        });

      const phases = character.phases.map((phase) => ({
        ...phase,
        range: phase.rangeId
          ? rangeTable[phase.rangeId as keyof typeof rangeTable]
          : null,
      }));

      const talents = (character.talents || []).map((talent, talentIndex) => {
        const candidates = (talent.candidates || []).map(
          (candidate, phaseIndex) => {
            const baseCandidateObject = {
              ...candidate,
              range: candidate.rangeId
                ? rangeTable[candidate.rangeId as keyof typeof rangeTable]
                : null,
            };
            if (isCnOnly && character.profession !== "TOKEN") {
              try {
                const talentTL =
                  jetTalentTranslations[
                    id as keyof typeof jetTalentTranslations
                  ][talentIndex][phaseIndex];
                baseCandidateObject.name = talentTL.name;
                baseCandidateObject.description = talentTL.desc;
              } catch {
                console.warn(
                  `No translation found for: character ${id}, talent index ${talentIndex}, phase index ${phaseIndex}`
                );
              }
            }
            return baseCandidateObject;
          }
        );
        return { ...talent, candidates };
      });

      const skillData = character.skills
        .map((skill) => {
          const skillId = skill.skillId;
          if (!skillId) {
            return null;
          }
          const baseSkillObject = isCnOnly
            ? cnSkillTable[skillId as keyof typeof cnSkillTable]
            : enSkillTable[skillId as keyof typeof enSkillTable];
          const levels = baseSkillObject.levels.map(
            (skillAtLevel: SkillAtLevel, levelIndex) => {
              const baseSkillLevelObject = {
                ...skillAtLevel,
                range: skillAtLevel.rangeId
                  ? rangeTable[skillAtLevel.rangeId as keyof typeof rangeTable]
                  : null,
              };
              if (isCnOnly && character.profession !== "TOKEN") {
                try {
                  const skillTL =
                    jetSkillTranslations[
                      skillId as keyof typeof jetSkillTranslations
                    ];
                  baseSkillLevelObject.name = skillTL.name;
                  baseSkillLevelObject.description = fixJetSkillDescriptionTags(
                    skillTL.desc[levelIndex]
                  );
                } catch {
                  console.warn(
                    `No translation found for: skill ${skillId}, level index ${levelIndex}`
                  );
                }
              }
              return baseSkillLevelObject;
            }
          );
          return {
            ...baseSkillObject,
            levels,
          };
        })
        .filter((skillData) => !!skillData);

      const { name: cnName, subProfessionId } =
        cnCharacterTable[id as keyof typeof cnCharacterTable];

      if (character.tokenKey) {
        summonIdToOperatorName[character.tokenKey] = characterName;
      }

      return {
        ...character,
        id,
        phases,
        talents,
        skillData,
        cnName,
        subProfessionId,
        name: useNameOverride(
          isCnOnly ? character.appellation : character.name
        ),
        isCnOnly,
        fileIndex: i,
      };
    });
  const denormalizedOperators = denormalizedCharacters.filter(
    (character) => character.profession !== "TOKEN"
  );
  fs.writeFileSync(
    path.join(dataDir, "operators.json"),
    JSON.stringify(denormalizedOperators, null, 2)
  );

  const denormalizedSummons = denormalizedCharacters
    .filter((character) => character.profession === "TOKEN")
    .map((summon) => ({
      ...summon,
      operatorName: summonIdToOperatorName[summon.id],
    }));
  fs.writeFileSync(
    path.join(dataDir, "summons.json"),
    JSON.stringify(denormalizedSummons, null, 2)
  );

  const denormalizedSkills = Object.entries(enSkillTable).map(([id, skill]) => {
    const levels = skill.levels.map((level) => ({
      ...level,
      range: level.rangeId
        ? rangeTable[level.rangeId as keyof typeof rangeTable]
        : null,
    }));
    return {
      ...skill,
      id,
      levels,
    };
  });
  fs.writeFileSync(
    path.join(dataDir, "skills.json"),
    JSON.stringify(denormalizedSkills, null, 2)
  );

  const denormalizedTraits = Object.keys(subProfessionLookup).map(
    (subclass) => {
      const firstOp = denormalizedOperators.find(
        ({ subProfessionId }) => subProfessionId === subclass
      );

      let description = firstOp.description;
      const trait = firstOp.trait;

      // left in console.log comments - useful for debugging bad trait descriptions
      // console.log(description);
      if (description in jetTraitTranslations.full) {
        // console.log("in descs");
        description = fixJetSkillDescriptionTags(
          jetTraitTranslations.full[description].en
        );
      }

      let blackboard: InterpolatedValue[] = [];
      if (trait) {
        blackboard = trait.candidates[trait.candidates.length - 1].blackboard;
      }

      return {
        subclass: subclass,
        description: descriptionToHtml(description, blackboard),
      };
    }
  );
  fs.writeFileSync(
    path.join(dataDir, "traits.json"),
    JSON.stringify(denormalizedTraits, null, 2)
  );
})();
