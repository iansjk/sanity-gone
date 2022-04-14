import { css, Theme, useTheme } from "@mui/material";
import Image from "next/image";

import { operatorAvatar } from "../utils/images";
import TiltedStarIcon from "./icons/TiltedStarIcon";
import StarIcon from "./icons/StarIcon";

const imageSize = {
  normal: 96,
  small: 74,
};

export interface OperatorPortraitProps {
  charId?: string;
  rarity?: number; // 1-indexed, NOT 0-indexed
  isLimited?: boolean;
  variant?: "normal" | "small";
  iconOverride?: string;
}

const OperatorPortrait: React.VFC<OperatorPortraitProps> = ({
  variant = "normal",
  ...rest
}) => {
  const { charId, rarity, isLimited, iconOverride } = rest;
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
          <span className="limited" title="Limited operator">
            Limited
          </span>
        </span>
      )}
      <Image
        className={`operator-portrait ${variant}`}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src={iconOverride ?? operatorAvatar(charId!)}
        alt=""
        width={imageSize[variant]}
        height={imageSize[variant]}
        objectFit={iconOverride ? "contain" : "cover"}
      />
      {rarity && (
        <span className={`rarity-wrapper ${variant}`}>
          <span className={`rarity rarity-${rarity}-stars`}>
            <span className="visually-hidden">Rarity: {rarity} stars</span>
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
      )}
    </div>
  );
};
export default OperatorPortrait;

const styles = (theme: Theme) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.spacing(0.5)};
  border: ${theme.spacing(0.25)} solid ${theme.palette.white.main};
  background: ${theme.palette.midtoneExtra.main};

  &.normal {
    margin-bottom: 9px;
  }

  .operator-portrait {
    border-radius: ${theme.spacing(0.25)};
    object-fit: scale-down;

    &.normal {
      margin-bottom: ${theme.spacing(0.5)};
    }

    &.small {
      margin-bottom: ${theme.spacing(0.25)};
    }
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
      display: inline-block;
      position: relative;
      top: -1px;
      padding: 0 2px;
      font-size: ${theme.typography.body2.fontSize}px;
      font-weight: ${theme.typography.body2Bold.fontWeight};
      line-height: 1;
      color: ${theme.palette.red.main};
      text-transform: uppercase;
      text-align: center;
      background-color: ${theme.palette.midtoneExtra.main};
      border-radius: ${theme.spacing(0.25)};
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
          fill: ${theme.palette.white.main};
          stroke: ${theme.palette.midtoneExtra.main};
          stroke-width: ${theme.spacing(0.25)};
        }
      }

      &.rarity-6-stars {
        svg path {
          fill: ${theme.palette.orange.main};
        }
      }

      &.rarity-5-stars {
        svg path {
          fill: ${theme.palette.yellow.main};
        }
      }

      &.rarity-4-stars {
        svg path {
          fill: ${theme.palette.softBlue.main};
        }
      }

      &.rarity-3-stars {
        svg path {
          fill: ${theme.palette.blue.main};
        }
      }
    }
  }

  .rarity-wrapper.small {
    bottom: -15px;

    .rarity {
      color: ${theme.palette.midtoneExtra.main};
      font-size: ${theme.typography.smallPortraitRarity.fontSize}px;
      line-height: ${theme.typography.smallPortraitRarity.lineHeight};
      font-weight: ${theme.typography.smallPortraitRarity.fontWeight};
      display: inline-flex;
      align-items: center;
      padding: ${theme.spacing(0, 0.5)};
      border-radius: ${theme.spacing(0.5)};
      border: ${theme.spacing(0.25)} solid ${theme.palette.midtoneExtra.main};
      background-color: ${theme.palette.white.main};

      svg {
        margin-left: 1px;
        margin-bottom: -1px;
      }

      &.rarity-6-stars {
        background-color: ${theme.palette.orange.main};
      }

      &.rarity-5-stars {
        background-color: ${theme.palette.yellow.main};
      }

      &.rarity-4-stars {
        background-color: ${theme.palette.softBlue.main};
      }

      &.rarity-3-stars {
        background-color: ${theme.palette.blue.main};
      }
    }
  }
`;
