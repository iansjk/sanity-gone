import parse from "html-react-parser";
import Card from "./Card";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

export type IntroductionProps = OperatorInfoProps & {
  analysis: ReturnType<typeof parse>;
};

const Introduction: React.VFC<IntroductionProps> = (props) => {
  const { operatorObject, archetype, isLimited, analysis } = props;
  return (
    <Card header="Introduction">
      <OperatorInfo
        operatorObject={operatorObject}
        archetype={archetype}
        isLimited={isLimited}
      />
      <div className="introduction-content">{analysis}</div>
    </Card>
  );
};
export default Introduction;
