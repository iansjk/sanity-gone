import { InterpolatedValue } from "../utils/description-parser";

interface ModuleObject {
  phases: {
    equipLevel: number;
    parts: unknown[];
    attributeBlackboard: InterpolatedValue[];
    tokenAttributeBlackboard: unknown;
  }[];
}

export interface ModuleInfoProps {
  moduleObject: ModuleObject;
}

const ModuleInfo: React.VFC<ModuleInfoProps> = (props) => {
  const { moduleObject } = props;
  return <></>;
};
export default ModuleInfo;
