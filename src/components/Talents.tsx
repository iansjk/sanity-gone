import parse from "html-react-parser";
import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";

export interface TalentsProps {
  analyses: ReturnType<typeof parse>[];
}

const Talents: React.FC<TalentsProps> = (props) => {
  const { analyses } = props;
  return (
    <CardWithTabs header="Talents" tabType="talent">
      {analyses.map((analysis, i) => (
        <CardPanel key={i} className="talent-analysis">
          {analysis}
        </CardPanel>
      ))}
    </CardWithTabs>
  );
};
export default Talents;
