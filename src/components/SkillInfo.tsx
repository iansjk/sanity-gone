import OperatorRange, { RangeObject } from "./OperatorRange";

export interface SkillLevelObject {
  name: string;
  description: string;
  // SkillLevelObject only has rangeId (of type string) in the game data,
  // but we expect it to be denormalized into a RangeObject before being passed to <SkillInfo />
  range: RangeObject;
  spData: {
    spType: number;
    spCost: number;
    initSp: number;
  };
  duration: number;
  // "blackboard" is used for interpolating formatted numeric values into the description,
  // e.g. "gains ATK <@ba.vup>+{atk:0%}</>, <@ba.vup>reduced</> attack interval, DEF <@ba.vup>+{def:0%}</>, ..."
  // references blackboard.atk, blackboard.def and is formatted to
  // "gains ATK +140%, reduced attack interval, DEF +80%, ..." with blue text for the interpolated values
  blackboard: {
    key: string;
    value: number;
  }[];
}

export interface SkillInfoProps {
  skillObject: {
    skillId: string;
    iconId: string | null;
    levels: SkillLevelObject[];
  };
}

const SkillInfo: React.VFC<SkillInfoProps> = ({ skillObject }) => {
  const { skillId, iconId, levels } = skillObject;
  const { name, description, spData, range, duration } = levels[
    levels.length - 1
  ];
  const { initSp, spCost } = spData;
  return <OperatorRange rangeObject={range} />;
};
export default SkillInfo;
