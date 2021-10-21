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
      isSwiper
      css={styles}
      buttons={sortedSynergies.flatMap((syn, i) => {
        const button = (
          <button
            key={syn.name}
            aria-label={syn.name}
            className={`operator-button synergy-operator-button${
              syn.isGroup ? " synergy-group" : ""
            }`}
            style={{
              backgroundImage: `url("${
                syn.isGroup ? syn.iconUrl! : operatorImage(syn.name)
              }")`,
              backgroundBlendMode: syn.shouldInvertIconOnHighlight
                ? "difference"
                : "normal",
            }}
          />
        );
        if (
          syn.quality != null &&
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
  .tabs-wrapper {
    ${theme.breakpoints.down("mobile")} {
      display: grid;
      grid-template-rows: max-content 1fr;
    }

    .tab-buttons,
    .swiper-container {
      .operator-button.synergy-operator-button {
        position: relative;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.34;
        background-color: ${theme.palette.midtoneDarker};

        &:hover {
          opacity: 0.67;
        }

        &.inactive:hover {
          background-color: ${theme.palette.midtone};
        }

        &.active {
          opacity: 1;
          background-color: ${theme.palette.white};
          border: ${theme.spacing(0.25)} solid ${theme.palette.white};
        }

        &.synergy-group::after {
          content: url("data:image/svg+xml,%3Csvg width='19' height='15' viewBox='0 0 19 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 13V14H2H17H18V13C18 10.7398 16.5435 8.81315 14.5155 8.13512C15.7724 7.53028 16.6364 6.23805 16.6364 4.75C16.6364 2.68677 14.9754 1 12.9091 1C11.383 1 10.0781 1.92005 9.5 3.2323C8.92194 1.92005 7.61698 1 6.09091 1C4.02459 1 2.36364 2.68677 2.36364 4.75C2.36364 6.23805 3.2276 7.53028 4.48449 8.13512C2.45647 8.81315 1 10.7398 1 13ZM9.5 6.2677C9.85993 7.08477 10.5017 7.74979 11.3031 8.13533C10.6278 8.36125 10.0157 8.72554 9.5 9.19388C8.98429 8.72554 8.37224 8.36125 7.69688 8.13533C8.49833 7.74979 9.14007 7.08477 9.5 6.2677ZM13.2727 4.75C13.2727 4.96495 13.1021 5.125 12.9091 5.125C12.7161 5.125 12.5455 4.96495 12.5455 4.75C12.5455 4.53505 12.7161 4.375 12.9091 4.375C13.1021 4.375 13.2727 4.53505 13.2727 4.75Z' fill='%23E8E8F2' stroke='%2324242E' stroke-width='2'/%3E%3C/svg%3E%0A");
          display: block;
          width: 19px;
          height: 15px;
          position: absolute;
          right: -4px;
          bottom: -2px;
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

        ${theme.breakpoints.down("mobile")} {
          width: unset;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          margin-right: ${theme.spacing(1)};
        }

        &::after {
          margin: ${theme.spacing(0, 1, 0, 0)};
          border-bottom: none;
          border-left: 1px solid ${theme.palette.midtoneBrighter};
          width: unset;
          height: ${theme.spacing(3)};
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

    .swiper-container {
      padding: ${theme.spacing(2)};
      justify-content: flex-start;

      * {
        flex-shrink: 0;
      }
    }
  }
`;
