import { css, Theme } from "@emotion/react";
import { professionToClass } from "../utils/globals";
import { operatorClassIcon, operatorImage } from "../utils/images";
import TiltedStarIcon from "./icons/TiltedStarIcon";
import { OperatorObject } from "./OperatorStats";

export interface OperatorInfoProps {
  operatorObject: OperatorObject;
  archetype: string;
  isLimited?: boolean;
}

const OperatorInfo: React.VFC<OperatorInfoProps> = (props) => {
  const { operatorObject, archetype, isLimited } = props;
  const { name, profession, rarity: rawRarity } = operatorObject;
  const operatorClass = professionToClass(profession);
  const rarity = rawRarity + 1; // 0-indexed;
  return (
    <div css={styles}>
      <div className="name-and-class">
        <div className="operator-name">{name}</div>
        <div className="operator-class">
          <img
            className="class-icon"
            src={operatorClassIcon(operatorClass.toLowerCase())}
            alt=""
          />
          <span className="archetype-name">{archetype}</span>
          <span>&nbsp;</span>
          <span className="class-name">{operatorClass}</span>
        </div>
      </div>
      <div className="portrait-and-rarity">
        {isLimited && (
          <span className="limited-wrapper">
            <span className="limited" aria-label="Limited operator">
              Limited
            </span>
          </span>
        )}
        <img className="operator-portrait" src={operatorImage(name)} alt="" />
        <span
          className={`rarity rarity-${rarity}-stars`}
          aria-label={`Rarity: ${rarity} stars`}
        >
          {[...Array(rarity).keys()].map((i) => (
            <TiltedStarIcon key={i} aria-hidden="true" />
          ))}
        </span>
      </div>
    </div>
  );
};
export default OperatorInfo;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  .portrait-and-rarity {
    width: 104px;
    height: 104px;
    position: relative;
    border-radius: ${theme.spacing(0.5)};
    border: ${theme.spacing(0.25)} solid #fff;

    .operator-portrait {
      margin: ${theme.spacing(0.5)};
      width: 96px;
      height: 96px;
      border-radius: ${theme.spacing(0.25)};
    }

    .rarity {
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 100%;
      text-align: center;

      svg {
        margin-right: -6px;

        path {
          fill: ${theme.palette.white};
          stroke: ${theme.palette.mid};
          stroke-width: 2px;
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

    .limited-wrapper {
      position: absolute;
      left: 0;
      top: -8px;
      width: 100%;
      line-height: 1;
      display: flex;
      justify-content: center;

      .limited {
        font-size: 14px;
        color: ${theme.palette.red};
        text-transform: uppercase;
        display: inline-block;
        text-align: center;
        background-color: #1e1e26;
        padding: 0 2px;
      }
    }
  }

  .name-and-class {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 0 0 ${theme.spacing(3)};

    .operator-name {
      font-size: 36px;
      font-weight: bold;
      line-height: 24px;
      margin-bottom: 16px;
    }

    .operator-class {
      display: flex;
      align-items: center;
      line-height: 32px;

      .class-icon {
        width: 24px;
        height: 24px;
        margin-right: ${theme.spacing(1)};
      }

      .archetype-name {
        color: ${theme.palette.white};
      }

      .class-name {
        color: ${theme.palette.gray};
      }
    }
  }
`;
