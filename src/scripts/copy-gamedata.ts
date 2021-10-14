import fs from "fs";
import path from "path";
import enCharacterTable from "../../ArknightsGameData/en_US/gamedata/excel/character_table.json";
import cnCharacterTable from "../../ArknightsGameData/zh_CN/gamedata/excel/character_table.json";
import enSkillTable from "../../ArknightsGameData/en_US/gamedata/excel/skill_table.json";
import cnSkillTable from "../../ArknightsGameData/zh_CN/gamedata/excel/skill_table.json";
import rangeTable from "../../ArknightsGameData/en_US/gamedata/excel/range_table.json";

const dataDir = path.join(__filename, "../../data");

const enCharacterIds = new Set(Object.keys(enCharacterTable));
const cnOnlyCharacters = Object.entries(cnCharacterTable).filter(
  ([id]) => !enCharacterIds.has(id)
);

const summonIdToOperatorName: Record<string, string> = {};
const denormalizedCharacters = [
  ...Object.entries(enCharacterTable),
  ...cnOnlyCharacters,
]
  .filter(([_, character]) => character.profession !== "TRAP")
  .map(([id, character]) => {
    const isCnOnly = !enCharacterIds.has(id);

    const phases = character.phases.map((phase) => ({
      ...phase,
      range: phase.rangeId
        ? rangeTable[phase.rangeId as keyof typeof rangeTable]
        : null,
    }));
    const talents = (character.talents || []).map((talent) => {
      const candidates = (talent.candidates || []).map((candidate) => ({
        ...candidate,
        range: candidate.rangeId
          ? rangeTable[candidate.rangeId as keyof typeof rangeTable]
          : null,
      }));
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
        const levels = baseSkillObject.levels.map((skillAtLevel) => ({
          ...skillAtLevel,
          range: skillAtLevel.rangeId
            ? rangeTable[skillAtLevel.rangeId as keyof typeof rangeTable]
            : null,
        }));
        return {
          ...baseSkillObject,
          levels,
        };
      })
      .filter((skillData) => !!skillData);

    const { name: cnName, subProfessionId } =
      cnCharacterTable[id as keyof typeof cnCharacterTable];

    if (character.tokenKey) {
      summonIdToOperatorName[character.tokenKey] = character.name;
    }

    return {
      ...character,
      id,
      phases,
      talents,
      skillData,
      cnName,
      subProfessionId,
      name: isCnOnly ? character.appellation : character.name,
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
