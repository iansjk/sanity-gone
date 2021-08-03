import fs from "fs";
import path from "path";
import enCharacterTable from "../../ArknightsGameData/en_US/gamedata/excel/character_table.json";
import cnCharacterTable from "../../ArknightsGameData/zh_CN/gamedata/excel/character_table.json";
import skillTable from "../../ArknightsGameData/en_US/gamedata/excel/skill_table.json";
import rangeTable from "../../ArknightsGameData/en_US/gamedata/excel/range_table.json";

const dataDir = path.join(__filename, "../../data");

const denormalizedOperators = Object.entries(enCharacterTable).map(([id, op]) => {
  const phases = op.phases.map((phase) => ({
    ...phase,
    range: phase.rangeId
      ? rangeTable[phase.rangeId as keyof typeof rangeTable]
      : null,
  }));
  const talents = (op.talents || []).map((talent) => {
    const candidates = (talent.candidates || []).map((candidate) => ({
      ...candidate,
      range: candidate.rangeId
        ? rangeTable[candidate.rangeId as keyof typeof rangeTable]
        : null,
    }));
    return { ...talent, candidates };
  });

  const skillData = op.skills
    .map((skill) => {
      const skillId = skill.skillId;
      if (!skillId) {
        return null;
      }
      const baseSkillObject = skillTable[skillId as keyof typeof skillTable];
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

  return {
    ...op,
    id,
    phases,
    talents,
    skillData,
  };
});
fs.writeFileSync(
  path.join(dataDir, "operators.json"),
  JSON.stringify(denormalizedOperators, null, 2)
);

const denormalizedSkills = Object.entries(skillTable).map(([id, skill]) => {
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

const cnNames = Object.entries(cnCharacterTable).map(([id, cnOp]) => {
  const enName = enCharacterTable[id as keyof typeof enCharacterTable]?.name ?? "(Not available)";
  return { enName, cnName: cnOp.name }
});
fs.writeFileSync(
  path.join(dataDir, "cn-names.json"),
  JSON.stringify(cnNames, null, 2)
);
