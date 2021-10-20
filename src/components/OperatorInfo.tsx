import { css, Theme } from "@emotion/react";
import { Fragment } from "react";
import useIsMobile from "../hooks/useIsMobile";
import {
  professionToClass,
  slugify,
  subProfessionToSubclass,
  toTitleCase,
} from "../utils/globals";
import { operatorClassIcon, operatorSubclassIcon } from "../utils/images";
import { CharacterObject } from "../utils/types";
import OperatorPortrait from "./OperatorPortrait";

export interface OperatorInfoProps {
  operatorObject: CharacterObject;
  isLimited?: boolean;
}

const getAttackType = (
  operatorClass: string,
  subProfessionId: string,
  description: string
): "Physical" | "Arts" | "Healing" | "None" => {
  if (subProfessionId === "bard") return "None";
  if (operatorClass === "Medic") return "Healing";
  return description.toLowerCase().includes("arts damage")
    ? "Arts"
    : "Physical";
};

const OperatorInfo: React.VFC<OperatorInfoProps> = (props) => {
  const { operatorObject, isLimited } = props;
  const {
    name,
    profession,
    rarity: rawRarity,
    subProfessionId,
    description,
    position: binaryPosition,
  } = operatorObject;
  const operatorClass = professionToClass(profession);
  const subclass = subProfessionToSubclass(subProfessionId);
  const rarity = rawRarity + 1; // 0-indexed;
  const position = description
    .toLowerCase()
    .includes("can be deployed on ranged grids")
    ? "Melee or Ranged"
    : toTitleCase(binaryPosition);
  const attackType = getAttackType(
    professionToClass(profession),
    subProfessionId,
    description
  );
  const isMobile = useIsMobile();
  const [charName, alterName] = name.split(" the ");

  return (
    <div css={styles}>
      <div className="operator-portrait-and-class">
        <div className="name-and-class">
          <div className="operator-name">
            {alterName ? (
              <Fragment>
                {charName} <span className="alter-name">The {alterName}</span>
              </Fragment>
            ) : (
              name
            )}
          </div>
          <span
            className="class-and-subclass"
            // href={`/classes/${operatorClass.toLowerCase()}#${subclass.toLowerCase()}`}
          >
            <img
              className="class-icon"
              src={operatorClassIcon(operatorClass.toLowerCase())}
              alt=""
            />
            {operatorClass}
            <img
              className="subclass-icon"
              src={operatorSubclassIcon(subProfessionId)}
              alt=""
            />
            {subclass}
          </span>
        </div>
        <OperatorPortrait
          variant={isMobile ? "small" : "normal"}
          name={name}
          isLimited={isLimited}
          rarity={rarity}
        />
      </div>
      <dl className="attack-type-and-position">
        <div className="attack-type">
          <dt>Regular Attack</dt>
          <dd className={slugify(attackType)}>
            {attackType}
            {!isMobile &&
              (attackType === "Arts" || attackType === "Physical") &&
              " Damage"}
          </dd>
        </div>

        <div className="position">
          <dt>Position</dt>
          <dd>{position}</dd>
        </div>
      </dl>
    </div>
  );
};
export default OperatorInfo;

const styles = (theme: Theme) => css`
  width: 100%;
  display: grid;
  grid-template-columns: max-content 1fr max-content;

  ${theme.breakpoints.down("mobile")} {
    grid-template-columns: 1fr;
  }

  .operator-portrait-and-class {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    .name-and-class {
      padding: ${theme.spacing(0, 0, 0, 3)};
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-template-rows: repeat(2, max-content);
      align-self: center;

      ${theme.breakpoints.down("mobile")} {
        padding: ${theme.spacing(0, 0, 0, 2)};
        align-self: flex-start;
      }

      .operator-name {
        grid-column: span 2;
        font-size: ${theme.typography.operatorNameHeading.fontSize};
        font-weight: ${theme.typography.operatorNameHeading.fontWeight};
        line-height: ${theme.typography.operatorNameHeading.lineHeight};
        margin-bottom: ${theme.spacing(1)};

        ${theme.breakpoints.down("mobile")} {
          align-items: baseline;
          font-size: ${theme.typography.generalHeading.fontSize};
          line-height: ${theme.typography.generalHeading.lineHeight};
          font-weight: ${theme.typography.generalHeadingBold.fontWeight};

          .alter-name {
            margin-left: ${theme.spacing(0.5)};
            color: ${theme.palette.gray};
            font-size: ${theme.typography.body.fontSize};
            font-weight: ${theme.typography.body.fontWeight};
            line-height: ${theme.typography.body.lineHeight};
          }
        }
      }

      .class-and-subclass {
        padding: ${theme.spacing(1, 2)};
        display: flex;
        align-items: center;
        font-weight: ${theme.typography.navigationLinkBold.fontWeight};
        color: ${theme.palette.white};
        border: 1px solid ${theme.palette.gray};
        border-radius: ${theme.spacing(0.5)};

        /* &:hover {
          border-color: ${theme.palette.gray};
          background-color: ${theme.palette.midtoneBrighter};
        } */

        .class-icon,
        .subclass-icon {
          width: ${theme.spacing(3)};
          height: ${theme.spacing(3)};
          line-height: 1;
          margin-right: ${theme.spacing(1)};
        }

        .subclass-icon {
          margin-left: ${theme.spacing(1)};
        }
      }
    }
  }

  .attack-type-and-position {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    justify-content: end;
    height: max-content;
    column-gap: ${theme.spacing(3)};

    ${theme.breakpoints.down("mobile")} {
      grid-template-columns: repeat(2, 1fr);
      column-gap: ${theme.spacing(2)};
      justify-content: flex-start;
    }

    & > div {
      background: none;

      ${theme.breakpoints.down("mobile")} {
        flex-direction: column;
        align-items: flex-start;
      }

      dd {
        font-size: ${theme.typography.body.fontSize};
        font-weight: normal;

        ${theme.breakpoints.down("mobile")} {
          margin: ${theme.spacing(0.5, 0, 0)};
        }
      }
    }

    .attack-type {
      border-top-left-radius: ${theme.spacing(0.5)};

      .physical {
        color: ${theme.palette.orange};
      }

      .arts {
        color: ${theme.palette.blue};
      }

      .healing {
        color: ${theme.palette.lime};
      }

      .none {
        color: ${theme.palette.gray};
      }
    }

    .position {
      border-bottom-left-radius: ${theme.spacing(0.5)};
    }
  }
`;
