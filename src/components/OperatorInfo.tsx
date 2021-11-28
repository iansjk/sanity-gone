import { css } from "@emotion/react";
import { useMediaQuery, useTheme, Theme } from "@mui/material";
import { Fragment } from "react";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));
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
  align-items: center;

  ${theme.breakpoints.down("mobile")} {
    grid-template-columns: 1fr;
    row-gap: ${theme.spacing(2)};
  }

  .operator-portrait-and-class {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    .name-and-class {
      padding: ${theme.spacing(0.5, 0, 0, 3)};
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-template-rows: repeat(2, max-content);
      align-self: baseline;

      ${theme.breakpoints.down("mobile")} {
        padding: ${theme.spacing(0, 0, 0, 2)};
        align-self: flex-start;
      }

      .operator-name {
        grid-column: span 2;
        font-size: ${theme.typography.operatorNameHeading.fontSize}px;
        font-weight: ${theme.typography.operatorNameHeading.fontWeight};
        line-height: ${theme.typography.operatorNameHeading.lineHeight};
        margin-bottom: ${theme.spacing(1)};

        ${theme.breakpoints.down("mobile")} {
          align-items: baseline;
          font-size: ${theme.typography.generalHeading.fontSize}px;
          line-height: ${theme.typography.generalHeading.lineHeight};
          font-weight: ${theme.typography.generalHeadingBold.fontWeight};

          .alter-name {
            margin-left: ${theme.spacing(0.5)};
            color: ${theme.palette.gray.main};
            font-size: ${theme.typography.body1.fontSize}px;
            font-weight: ${theme.typography.body1.fontWeight};
            line-height: ${theme.typography.body1.lineHeight};
          }
        }
      }

      .class-and-subclass {
        padding: ${theme.spacing(1, 1.5)};
        display: flex;
        align-items: center;
        font-weight: ${theme.typography.navigationLinkBold.fontWeight};
        color: ${theme.palette.white.main};
        border: 1px solid ${theme.palette.gray.main};
        border-radius: ${theme.spacing(0.5)};

        /* &:hover {
          border-color: ${theme.palette.gray.main};
          background-color: ${theme.palette.midtoneBrighter.main};
        } */

        .class-icon,
        .subclass-icon {
          width: ${theme.spacing(3)};
          height: ${theme.spacing(3)};
          line-height: 1;
          margin-right: ${theme.spacing(1)};
          object-fit: contain;
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
        font-size: ${theme.typography.body1.fontSize}px;
        font-weight: normal;

        ${theme.breakpoints.down("mobile")} {
          margin: ${theme.spacing(0.5, 0, 0)};
        }
      }
    }

    .attack-type {
      border-top-left-radius: ${theme.spacing(0.5)};

      .physical {
        color: ${theme.palette.orange.main};
      }

      .arts {
        color: ${theme.palette.blue.main};
      }

      .healing {
        color: ${theme.palette.lime.main};
      }

      .none {
        color: ${theme.palette.gray.main};
      }
    }

    .position {
      border-bottom-left-radius: ${theme.spacing(0.5)};
    }
  }
`;
