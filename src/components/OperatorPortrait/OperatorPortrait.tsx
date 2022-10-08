import Image from "next/image";

import TiltedStarIcon from "../icons/TiltedStarIcon";
import StarIcon from "../icons/StarIcon";
import { operatorAvatar } from "../../utils/images";
import { spacing } from "../../theme-helpers";

import * as classes from "./styles.css";

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

  const portraitMargin = spacing(variant === "normal" ? 0.5 : 0.25);
  const containerSizeCss = `calc(${portraitMargin} + ${portraitMargin} + ${imageSize[variant]}px)`;

  return (
    <div
      className={classes.root[variant]}
      style={{ width: containerSizeCss, height: containerSizeCss }}
    >
      {isLimited && variant === "normal" && (
        <span className={classes.limitedWrapper}>
          <span className={classes.limitedText} title="Limited operator">
            Limited
          </span>
        </span>
      )}
      <Image
        className={classes.operatorPortrait[variant]}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src={iconOverride ?? operatorAvatar(charId!)}
        alt=""
        width={imageSize[variant]}
        height={imageSize[variant]}
        objectFit={iconOverride ? "contain" : "cover"}
      />
      {rarity && (
        <span className={classes.rarityWrapper[variant]}>
          <span
            className={
              variant === "small"
                ? classes.raritySmall[rarity as 1 | 2 | 3 | 4 | 5 | 6]
                : classes.rarityNormal
            }
          >
            <span className="visually-hidden">Rarity: {rarity} stars</span>
            {variant === "normal" ? (
              [...Array(rarity).keys()].map((i) => (
                <TiltedStarIcon
                  key={i}
                  aria-hidden="true"
                  className={classes.rarityStarNormalSvg}
                  pathClassName={
                    classes.rarityStarNormalPath[
                      rarity as 1 | 2 | 3 | 4 | 5 | 6
                    ]
                  }
                />
              ))
            ) : (
              <span aria-hidden="true">
                {rarity}
                <StarIcon className={classes.rarityStarSmall} />
              </span>
            )}
          </span>
        </span>
      )}
    </div>
  );
};
export default OperatorPortrait;
