import { RangeObject } from "./OperatorRange";
import { InterpolatedValue } from "./SkillInfo";

interface InnerTalentObject {
  unlockCondition: {
    phase: number;
    level: number;
  };
  requiredPotentialRank: number;
  name: string;
  description: string;
  // this object only has rangeId,
  // but we'll expect that the range has been denormalized ahead of time
  range: RangeObject | null;
  // this is the same format of interpolation object as is used in SkillInfo
  blackboard: InterpolatedValue[];
}

interface TalentObject {
  candidates: InnerTalentObject[];
}

export interface TalentInfoProps {
  talentObjects: TalentObject[];
}

export const TalentInfo: React.VFC = (props) => {
  return <></>;
};
