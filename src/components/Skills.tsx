import parse from "html-react-parser";
import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";

export interface SkillsProps {
  analyses: ReturnType<typeof parse>[];
}

const Skills: React.VFC<SkillsProps> = (props) => {
  const { analyses } = props;

  return (
    <CardWithTabs header="Skills" tabType="skill">
      {analyses.map((analysis, i) => (
        <CardPanel key={i} className="skill-analysis">
          {analysis}
        </CardPanel>
      ))}
    </CardWithTabs>
  );
};
export default Skills;
