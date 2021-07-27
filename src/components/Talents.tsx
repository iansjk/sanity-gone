import CardWithPanels from "./CardWithPanels";
import CardPanel from "./CardPanel";

export interface TalentsProps {
  analyses: string[];
  talentObjects: any[];
}

const Talents: React.FC<TalentsProps> = (props) => {
  const { analyses, talentObjects } = props;
  return (
    <CardWithPanels header="Talents" buttonPrefix="T">
      {analyses.map((htmlString: string, i) => (
        <CardPanel key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />
      ))}
    </CardWithPanels>
  );
};
export default Talents;
