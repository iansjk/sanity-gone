import Image from "next/image";
import { useMediaQuery, useTheme } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Media } from "../../Media";

import { default as Link } from "../HashCompatibleNextLink";
import {
  professionToClass,
  slugify,
  subclassSlugify,
  subProfessionIdToSubclass,
  toTitleCase,
} from "../../utils/globals";
import { operatorClassIcon, operatorBranchIcon } from "../../utils/images";
import { CharacterObject } from "../../utils/types";
import OperatorPortrait from "../OperatorPortrait";

import * as classes from "./styles.css";

export interface OperatorInfoProps {
  operatorObject: CharacterObject;
  isLimited?: boolean;
}

const stripTagsRegex = /<(\/|([@$a-z.]+))>/g;

const getAttackType = (
  operatorClass: string,
  subProfessionId: string,
  description: string
): "Physical" | "Arts" | "Healing" | "None" => {
  if (subProfessionId === "bard") return "None";
  if (operatorClass === "Medic") return "Healing";
  const descriptionNoTags = description
    .replace(stripTagsRegex, "")
    .toLowerCase();
  return descriptionNoTags.includes("arts damage") ||
    descriptionNoTags.includes("法术伤害")
    ? "Arts"
    : "Physical";
};

const OperatorInfo: React.VFC<OperatorInfoProps> = (props) => {
  const { operatorObject, isLimited } = props;
  const {
    charId,
    name,
    profession,
    rarity: rawRarity,
    subProfessionId,
    description,
    position: binaryPosition,
  } = operatorObject;
  const operatorClass = professionToClass(profession);
  const subclass = subProfessionIdToSubclass(subProfessionId);
  const rarity = rawRarity + 1; // 0-indexed;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const position = description!
    .toLowerCase()
    .includes("can be deployed on ranged grids")
    ? "Melee or Ranged"
    : toTitleCase(binaryPosition);
  const attackType = getAttackType(
    professionToClass(profession),
    subProfessionId,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    description!
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));
  const [charName, alterName] = name.split(" the ");

  return (
    <div className={classes.root}>
      <div className={classes.operatorPortraitAndClass}>
        <div className={classes.nameAndClass}>
          <div className={classes.operatorName}>
            {alterName ? (
              <>
                {charName}{" "}
                <span className={classes.alterName}>The {alterName}</span>
              </>
            ) : (
              name
            )}
          </div>
          <Link
            href={`/operators#${slugify(operatorClass)}-${subclassSlugify(
              subclass
            )}`}
          >
            <a className={classes.classAndSubclass}>
              <Tippy
                content={operatorClass}
                interactive
                role="presentation"
                aria={{
                  expanded: false,
                }}
                appendTo={
                  typeof document !== "undefined" ? document.body : undefined
                }
              >
                <span className={classes.classIconContainer}>
                  <Image
                    src={operatorClassIcon(operatorClass.toLowerCase())}
                    alt={operatorClass}
                    width={24}
                    height={24}
                  />
                </span>
              </Tippy>
              <span className={classes.subclassIconContainer}>
                <Image
                  src={operatorBranchIcon(subProfessionId)}
                  alt=""
                  width={24}
                  height={24}
                />
                {subclass}
              </span>
            </a>
          </Link>
        </div>
        <Media lessThan="mobile">
          <OperatorPortrait
            variant="small"
            charId={charId}
            isLimited={isLimited}
            rarity={rarity}
          />
        </Media>
        <Media greaterThanOrEqual="mobile">
          <OperatorPortrait
            charId={charId}
            isLimited={isLimited}
            rarity={rarity}
          />
        </Media>
      </div>
      <dl className={classes.attackTypeAndPosition}>
        <div className={classes.attackTypeCell}>
          <dt>Regular Attack</dt>
          <dd className={classes.attackType[attackType]}>
            {attackType}
            {!isMobile &&
              (attackType === "Arts" || attackType === "Physical") &&
              " Damage"}
          </dd>
        </div>

        <div className={classes.positionCell}>
          <dt>Position</dt>
          <dd className={classes.attackTypeOrPositionDetails}>{position}</dd>
        </div>
      </dl>
    </div>
  );
};
export default OperatorInfo;
