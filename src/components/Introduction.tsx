import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { replaceSelfClosingHtmlTags } from "../utils/globals";
import Card from "./Card";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";
import OperatorStats from "./OperatorStats";

export type IntroductionProps = OperatorInfoProps & {
  analysis: string;
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
      <div className="introduction-content">
        {parse(replaceSelfClosingHtmlTags(analysis), {
          replace: (domNode) => {
            if (
              domNode instanceof Element &&
              domNode.name.toLowerCase() === "operatorstats"
            ) {
              return <OperatorStats operatorObject={operatorObject} />;
            }
          },
        })}
      </div>
    </Card>
  );
};
export default Introduction;
