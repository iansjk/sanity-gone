import { css, Theme } from "@emotion/react";
import React from "react";
import { operatorImage } from "../utils/images";
import StarIcon from "./icons/StarIcon";

export enum SynergyQuality {
  "Anti-Synergy" = -1,
  "Decent Synergy",
  "Good Synergy",
  "Excellent Synergy",
}

export interface SynergyOperatorProps {
  synergyOperator: {
    name: string;
    rarity: number; // we'll assume this is 0-indexed, so rarity: 0 means a 1* operator
    quality: SynergyQuality;
    analysis: string;
  };
}

const SynergyOperator: React.VFC<
  SynergyOperatorProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    name,
    rarity: rawRarity,
    quality,
    analysis,
    ...rest
  } = props.synergyOperator;
  const rarity = rawRarity + 1;
  return (
    <section css={styles} {...rest}>
      <div className="synergy-operator-info">
        <div className="name-and-quality">
          <h3 className="operator-name">{name}</h3>
          <span className={`synergy-quality quality-${quality}`}>
            {SynergyQuality[quality]}
          </span>
        </div>
        <div className="portrait-and-rarity">
          <img className="operator-portrait" src={operatorImage(name)} alt="" />
          <span className="rarity-wrapper">
            <span
              className={`rarity rarity-${rarity}-stars`}
              aria-label={`Rarity: ${rarity} stars`}
            >
              {rarity}
              <StarIcon />
            </span>
          </span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: analysis }} />
    </section>
  );
};
export default SynergyOperator;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  .synergy-operator-info {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;

    .name-and-quality {
      margin-left: ${theme.spacing(2)};

      .operator-name {
        font-size: 24px;
        margin: 0 0 ${theme.spacing(1)};
        font-weight: ${theme.typography.highlight.weight};
      }

      .synergy-quality {
        color: ${theme.palette.gray};

        &.quality--1 {
          color: ${theme.palette.red};
        }

        &.quality-1 {
          color: ${theme.palette.blue};
        }

        &.quality-2 {
          color: ${theme.palette.lime};
        }
      }
    }

    .portrait-and-rarity {
      position: relative;
      border: ${theme.spacing(0.25)} solid ${theme.palette.white};
      border-radius: ${theme.spacing(0.5)};
      width: 70px;
      height: 70px;

      .operator-portrait {
        width: 66px;
        height: 66px;
        margin: ${theme.spacing(0.25)};
        border-radius: ${theme.spacing(0.25)};
      }

      .rarity-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        bottom: -14px;
        left: 0;
        width: 100%;

        .rarity {
          color: ${theme.palette.midRarity};
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          padding: ${theme.spacing(0.25)} ${theme.spacing(0.5)};
          border-radius: ${theme.spacing(0.5)};
          border: ${theme.spacing(0.25)} solid ${theme.palette.midRarity};
          line-height: 1;

          &.rarity-6-stars {
            background-color: ${theme.palette.orange};
          }
        }
      }
    }
  }
`;
