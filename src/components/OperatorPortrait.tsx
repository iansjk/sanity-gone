import { css, Theme, useTheme } from "@emotion/react";
import { operatorImage } from "../utils/images";
import TiltedStarIcon from "./icons/TiltedStarIcon";
import StarIcon from "./icons/StarIcon";

const imageSize = {
  normal: 96,
  small: 66,
};

export interface OperatorPortraitProps {
  name: string;
  rarity: number; // 1-indexed, NOT 0-indexed
  isLimited?: boolean;
  variant?: "normal" | "small";
}

const OperatorPortrait: React.VFC<OperatorPortraitProps> = ({
  variant = "normal",
  ...rest
}) => {
  const { name, rarity, isLimited } = rest;
  const theme = useTheme();

  const portraitMargin = theme.spacing(variant === "normal" ? 0.5 : 0.25);
  const containerSizeCss = `calc(${portraitMargin} + ${portraitMargin} + ${imageSize[variant]}px)`;

  return (
    <div
      className={variant}
      css={styles}
      style={{ width: containerSizeCss, height: containerSizeCss }}
    >
      {isLimited && variant === "normal" && (
        <span className="limited-wrapper">
          <span className="limited" aria-label="Limited operator">
            Limited
          </span>
        </span>
      )}
      <img
        className="operator-portrait"
        src={operatorImage(name)}
        alt=""
        width={imageSize[variant]}
        height={imageSize[variant]}
        style={{ margin: portraitMargin }}
      />
      <span className={`rarity-wrapper ${variant}`}>
        <span
          className={`rarity rarity-${rarity}-stars`}
          aria-label={`Rarity: ${rarity} stars`}
        >
          {variant === "normal" ? (
            [...Array(rarity).keys()].map((i) => (
              <TiltedStarIcon key={i} aria-hidden="true" />
            ))
          ) : (
            <span aria-hidden="true">
              {rarity}
              <StarIcon />
            </span>
          )}
        </span>
      </span>
    </div>
  );
};
export default OperatorPortrait;

const styles = (theme: Theme) => css`
  position: relative;
  border-radius: ${theme.spacing(0.5)};
  border: ${theme.spacing(0.25)} solid ${theme.palette.white};

  &.small {
    margin-bottom: 13px;
  }

  &.normal {
    margin-bottom: 9px;
  }

  .operator-portrait {
    border-radius: ${theme.spacing(0.25)};
  }

  .limited-wrapper {
    position: absolute;
    left: 0;
    top: -8px;
    width: 100%;
    line-height: 1;
    display: flex;
    justify-content: center;

    .limited {
      font-size: ${theme.typography.body2.size};
      line-height: 1;
      color: ${theme.palette.red};
      text-transform: uppercase;
      display: inline-block;
      text-align: center;
      background-color: ${theme.palette.midRarity};
      padding: 0 2px;
    }
  }

  .rarity-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    left: 0;
  }

  .rarity-wrapper.normal {
    bottom: -18px;

    .rarity {
      display: inline-block;
      padding-right: 6px; /* needed to counteract the negative margin-right below */

      svg {
        margin-right: -6px;

        path {
          fill: ${theme.palette.white};
          stroke: ${theme.palette.mid};
          stroke-width: ${theme.spacing(0.25)};
        }
      }

      &.rarity-6-stars {
        svg path {
          fill: ${theme.palette.orange};
        }
      }

      &.rarity-5-stars {
        svg path {
          fill: ${theme.palette.yellow};
        }
      }

      &.rarity-4-stars {
        svg path {
          fill: ${theme.palette.softBlue};
        }
      }

      &.rarity-3-stars {
        svg path {
          fill: ${theme.palette.blue};
        }
      }
    }
  }

  .rarity-wrapper.small {
    bottom: -15px;

    .rarity {
      color: ${theme.palette.midRarity};
      font-size: ${theme.typography.smallPortraitRarity.size};
      line-height: ${theme.typography.smallPortraitRarity.lineHeight};
      font-weight: ${theme.typography.smallPortraitRarity.fontWeight};
      display: inline-flex;
      align-items: center;
      padding: ${theme.spacing(0, 0.5)};
      border-radius: ${theme.spacing(0.5)};
      border: ${theme.spacing(0.25)} solid ${theme.palette.midRarity};
      background-color: ${theme.palette.white};

      svg {
        margin-left: 1px;
        margin-bottom: -1px;
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
`;
