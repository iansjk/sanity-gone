import { css, Theme } from "@emotion/react";
import CardWithTabs from "./CardWithTabs";
import Synergy, { SynergyProps, SynergyQuality } from "./Synergy";
import { operatorImage } from "../utils/images";

export interface SynergiesProps {
  synergies: SynergyProps[];
}

const Synergies: React.VFC<SynergiesProps> = ({ synergies }) => {
  // sort by descending synergy quality
  const sortedSynergies = synergies.sort(
    (a, b) => (b.quality ?? 0.5) - (a.quality ?? 0.5) // sort right above 0 ("decent") but below 1 ("good")
  );

  return (
    <CardWithTabs
      header="Synergies"
      css={styles}
      buttons={sortedSynergies.flatMap((syn, i) => {
        const button = (
          <button
            key={syn.name}
            aria-label={syn.name}
            className="operator-button synergy-operator-button"
            style={{
              backgroundImage: `url("${
                syn.isGroup ? syn.iconUrl! : operatorImage(syn.name)
              }")`,
            }}
          />
        );
        if (
          syn.quality &&
          (i === 0 || sortedSynergies[i - 1].quality !== syn.quality)
        ) {
          const [qualityLabel] = SynergyQuality[syn.quality].split(" ");
          return [
            <span
              key={qualityLabel}
              className={`synergy-quality quality-${syn.quality}`}
              aria-label={SynergyQuality[syn.quality]}
            >
              {qualityLabel}
            </span>,
            button,
          ];
        }
        return button;
      })}
      panels={sortedSynergies.map((synOp) => (
        <Synergy key={synOp.name} {...synOp} />
      ))}
    />
  );
};
export default Synergies;

const styles = (theme: Theme) => css`
  .tab-buttons {
    .operator-button.synergy-operator-button {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
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
