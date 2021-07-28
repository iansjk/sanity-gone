import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";
import SynergyOperator, { SynergyOperatorProps } from "./SynergyOperator";

interface SynergiesProps {
  synergyOperators: SynergyOperatorProps[];
}

const Synergies: React.VFC<SynergiesProps> = ({ synergyOperators }) => {
  return (
    <CardWithTabs header="Synergies" tabType="synergy">
      <CardPanel>
        {synergyOperators.map(({ synergyOperator }) => (
          <SynergyOperator
            key={synergyOperator.name}
            synergyOperator={synergyOperator}
          />
        ))}
      </CardPanel>
    </CardWithTabs>
  );
};
export default Synergies;
