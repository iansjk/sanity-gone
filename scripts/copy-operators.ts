import fs from "fs";
import path from "path";
import enCharacterTable from "./ArknightsGameData/en_US/gamedata/excel/character_table.json";
import cnCharacterTable from "./ArknightsGameData/zh_CN/gamedata/excel/character_table.json";
import enSkillTable from "./ArknightsGameData/en_US/gamedata/excel/skill_table.json";
import cnSkillTable from "./ArknightsGameData/zh_CN/gamedata/excel/skill_table.json";
import rangeTable from "./ArknightsGameData/zh_CN/gamedata/excel/range_table.json";
import jetSkillTranslations from "./jet-tls/skills.json";
import jetTalentTranslations from "./jet-tls/talents.json";
import {
  GameDataCharacter,
  DenormalizedCharacter,
  SkillAtLevel,
} from "./types";
import { fixJetSkillDescriptionTags } from "./fix-jet-skill-descs";

const dataDir = path.join(__dirname, "../data");
fs.mkdirSync(dataDir, { recursive: true });

const NAME_OVERRIDES: Record<string, string> = {
  "THRM-EX": "Thermal-EX",
};

const useNameOverride = (name: string) => NAME_OVERRIDES[name] ?? name;

void (async () => {
  console.log("Updating operators and summons...");
  const enCharacterIds = new Set(Object.keys(enCharacterTable));
  const cnOnlyCharacters = Object.entries(cnCharacterTable).filter(
    ([charId]) => !enCharacterIds.has(charId)
  );

  const summonIdToOperatorName: Record<string, string> = {};
  const denormalizedCharacters: DenormalizedCharacter[] = (
    [...Object.entries(enCharacterTable), ...cnOnlyCharacters] as [
      string,
      GameDataCharacter
    ][]
  )
    .filter(
      ([_, character]) =>
        character.profession !== "TRAP" && !character.isNotObtainable
    )
    .map(([charId, character], i) => {
      const isCnOnly = !enCharacterIds.has(charId);
      const characterName = useNameOverride(
        isCnOnly ? character.appellation : character.name
      );

      character.skills
        .filter((skill) => skill.overrideTokenKey != null)
        .forEach((skill) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
                    charId as keyof typeof jetTalentTranslations
                  ][talentIndex][phaseIndex];
                baseCandidateObject.name = talentTL.name;
                baseCandidateObject.description = talentTL.desc;
              } catch {
                console.warn(
                  `No translation found for: character ${charId}, talent index ${talentIndex}, phase index ${phaseIndex}`
                );
              }
            }
            return baseCandidateObject;
          }
        );
        return { ...talent, candidates };
      });

      const skillData = character.skills
        .filter((skill) => skill.skillId != null)
        .map((skill) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const skillId = skill.skillId!;
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
        cnCharacterTable[charId as keyof typeof cnCharacterTable];

      if (character.tokenKey) {
        summonIdToOperatorName[character.tokenKey] = characterName;
      }

      return {
        ...character,
        charId,
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
  const operatorsJson = Object.fromEntries(
    denormalizedOperators
      .map(
        (character) =>
          [character.name, character] as [string, DenormalizedCharacter]
      )
      .sort(([_, charA], [__, charB]) => {
        // sort by descending rarity and descending fileIndex
        return charB.rarity - charA.rarity || charB.fileIndex - charA.fileIndex;
      })
  );
  fs.writeFileSync(
    path.join(dataDir, "operators.json"),
    JSON.stringify(operatorsJson, null, 2)
  );

  const denormalizedSummons = denormalizedCharacters
    .filter((character) => character.profession === "TOKEN")
    .map((summon) => ({
      ...summon,
      operatorName: summonIdToOperatorName[summon.charId],
    }));
  const summonsJson = denormalizedSummons.reduce((allSummons, summon) => {
    if (allSummons[summon.operatorName] != null) {
      allSummons[summon.operatorName].push(summon);
    } else {
      allSummons[summon.operatorName] = [summon];
    }
    return allSummons;
  }, {} as Record<string, DenormalizedCharacter[]>);
  fs.writeFileSync(
    path.join(dataDir, "summons.json"),
    JSON.stringify(summonsJson, null, 2)
  );
})();
