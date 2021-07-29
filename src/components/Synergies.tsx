import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";
import SynergyOperator, {
  SynergyOperatorProps,
  SynergyQuality,
} from "./SynergyOperator";
import { css, Theme } from "@emotion/react";
import { operatorImage } from "../utils/images";

export interface SynergiesProps {
  synergyOperators: SynergyOperatorProps[];
}

const Synergies: React.VFC<SynergiesProps> = ({ synergyOperators }) => {
  // sort by descending synergy quality
  const sortedSynergyOperators = synergyOperators.sort(
    (a, b) => b.quality - a.quality
  );

  return (
    <CardWithTabs
      header="Synergies"
      tabType="synergy"
      css={styles}
      buttonRenderer={(index) => {
        const operator = sortedSynergyOperators[index];
        return (
          <button
            className="operator-button"
            style={{
              backgroundImage: `url("${operatorImage(operator.name)}")`,
            }}
          />
        );
      }}
    >
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

  .tabs {
    .operator-button {
      background-size: contain;
      opacity: 0.34;

      &:hover {
        opacity: 0.67;
      }

      &.active {
        opacity: 1;
        background-color: ${theme.palette.white};
        border: ${theme.spacing(0.25)} solid ${theme.palette.white};
      }
    }
  }
`;
