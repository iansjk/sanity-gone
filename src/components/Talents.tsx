import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";

export interface TalentsProps {
  analyses: string[];
  talentObjects: any[];
}

const Talents: React.FC<TalentsProps> = (props) => {
  const { analyses, talentObjects } = props;
  return (
    <CardWithTabs header="Talents" tabType="talent">
      {analyses.map((htmlString: string, i) => (
        <CardPanel key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />
      ))}
    </CardWithTabs>
  );
};
export default Talents;
