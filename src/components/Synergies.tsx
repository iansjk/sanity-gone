import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";
import SynergyOperator, { SynergyOperatorProps } from "./SynergyOperator";

export interface SynergiesProps {
  synergyOperators: SynergyOperatorProps[];
}

const Synergies: React.VFC<SynergiesProps> = ({ synergyOperators }) => {
  return (
    <CardWithTabs header="Synergies" tabType="synergy">
      {synergyOperators.map((synergyOperator) => (
        <CardPanel key={synergyOperator.name}>
          <SynergyOperator {...synergyOperator} />
        </CardPanel>
      ))}
    </CardWithTabs>
  );
};
export default Synergies;
