import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";
import SynergyOperator, {
  SynergyOperatorProps,
  SynergyQuality,
} from "./SynergyOperator";
import { css, Theme } from "@emotion/react";

export interface SynergiesProps {
  synergyOperators: SynergyOperatorProps[];
}

const Synergies: React.VFC<SynergiesProps> = ({ synergyOperators }) => {
  // sort by descending synergy quality
  const sortedSynergyOperators = synergyOperators.sort(
    (a, b) => b.quality - a.quality
  );

  return (
    <CardWithTabs header="Synergies" tabType="synergy" css={styles}>
      {sortedSynergyOperators.map((synergyOperator) => {
        const groupingKey = SynergyQuality[synergyOperator.quality].split(
          /[\s-]/
        )[0];
        return (
          <CardPanel key={synergyOperator.name} groupingKey={groupingKey}>
            <SynergyOperator {...synergyOperator} />
          </CardPanel>
        );
      })}
    </CardWithTabs>
  );
};
export default Synergies;

const styles = (theme: Theme) => css`
  .grouping-key.excellent {
    color: ${theme.palette.lime};
  }

  .grouping-key.good {
    color: ${theme.palette.blue};
  }

  .grouping-key.decent {
    color: ${theme.palette.gray};
  }

  .grouping-key.anti {
    color: ${theme.palette.red};
  }
`;
