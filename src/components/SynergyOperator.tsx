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
        margin: 0;
        font-size: ${theme.typography.generalHeadingBold.size};
        font-weight: ${theme.typography.generalHeadingBold.weight};
        line-height: ${theme.typography.generalHeadingBold.lineHeight};
      }

      .synergy-quality {
        font-size: ${theme.typography.body2.size};
        text-transform: uppercase;
        line-height: 1.25;
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
          font-size: ${theme.typography.smallPortraitRarity.size};
          line-height: ${theme.typography.smallPortraitRarity.lineHeight};
          font-weight: ${theme.typography.smallPortraitRarity.fontWeight};
          display: inline-flex;
          align-items: center;
          padding: 0 ${theme.spacing(0.5)};
          border-radius: ${theme.spacing(0.5)};
          border: ${theme.spacing(0.25)} solid ${theme.palette.midRarity};
          background-color: ${theme.palette.white};

          svg {
            margin-left: 1px;
          }

          &.rarity-6-stars {
            background-color: ${theme.palette.orange};
          }

          &.rarity-5-stars {
            background-color: ${theme.palette.yellow};
          }

          &.rarity-4-stars {
            background-color: ${theme.palette.softBlue};
          }

          &.rarity-3-stars {
            background-color: ${theme.palette.blue};
          }
        }
      }
    }
  }
`;
