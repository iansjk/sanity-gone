import { css, Theme } from "@emotion/react";
import CardWithTabs from "./CardWithTabs";
import SynergyOperator, {
  SynergyOperatorProps,
  SynergyQuality,
} from "./SynergyOperator";
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
      css={styles}
      buttons={sortedSynergyOperators.flatMap((synOp, i) => {
        const button = (
          <button
            key={synOp.name}
            aria-label={synOp.name}
            className="operator-button synergy-operator-button"
            style={{ backgroundImage: `url("${operatorImage(synOp.name)}")` }}
          />
        );
        if (
          i === 0 ||
          sortedSynergyOperators[i - 1].quality !== synOp.quality
        ) {
          const [qualityLabel] = SynergyQuality[synOp.quality].split(" ");
          return [
            <span
              key={qualityLabel}
              className={`synergy-quality quality-${synOp.quality}`}
              aria-label={SynergyQuality[synOp.quality]}
            >
              {qualityLabel}
            </span>,
            button,
          ];
        }
        return button;
      })}
      panels={sortedSynergyOperators.map((synOp) => (
        <SynergyOperator key={synOp.name} {...synOp} />
      ))}
    />
  );
};
export default Synergies;

const styles = (theme: Theme) => css`
  .tab-buttons {
    .operator-button.synergy-operator-button {
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

    .synergy-quality {
      text-align: center;
      font-size: ${theme.typography.label1.size};
      font-weight: ${theme.typography.label1.fontWeight};
      line-height: ${theme.typography.label1.lineHeight};
      text-transform: uppercase;
      width: 100%;
      overflow: hidden;

      &::after {
        content: " ";
        display: block;
        width: ${theme.spacing(3)};
        margin: ${theme.spacing(1)} auto ${theme.spacing(2)};
        border-bottom: 1px solid ${theme.palette.midtoneBrighter};
      }
    }

    .synergy-quality.quality-2 {
      color: ${theme.palette.lime};
    }

    .synergy-quality.quality-1 {
      color: ${theme.palette.blue};
    }

    .synergy-quality.quality-0 {
      color: ${theme.palette.gray};
    }

    .synergy-quality.quality--1 {
      color: ${theme.palette.red};
    }
  }
`;
