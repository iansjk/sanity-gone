import { css, Theme } from "@emotion/react";
import { rgba } from "polished";
import useIsMobile from "../hooks/useIsMobile";
import { professionToClass, slugify, toTitleCase } from "../utils/globals";
import { operatorClassIcon, operatorSubclassIcon } from "../utils/images";
import { CharacterObject } from "../utils/types";
import OperatorPortrait from "./OperatorPortrait";

export interface OperatorInfoProps {
  operatorObject: CharacterObject;
  isLimited?: boolean;
}

const getAttackType = (
  operatorClass: string,
  description: string
): "Physical" | "Arts" | "Healing" => {
  if (operatorClass === "Medic") return "Healing";
  return description.toLowerCase().includes("arts damage")
    ? "Arts"
    : "Physical";
};

const subProfessionToSubclass: Record<string, string> = {
  pioneer: "Pioneer",
  charger: "Spearhead",
  tactician: "Tactician",
  bearer: "Flagbearer",
  centurion: "Assault",
  fighter: "Brawler",
  artsfghter: "Spellblade",
  instructor: "Instructor",
  lord: "Warlord",
  sword: "Swordmaster",
  musha: "Musha",
  fearless: "Fearless",
  reaper: "Reaper",
  librator: "Liberator",
  protector: "Ironguard",
  guardian: "Guardian",
  unyield: "Unyielding",
  artsprotector: "Arts Ironguard",
  duelist: "Champion",
  fastshot: "Rapid Fire",
  closerange: "Heavy",
  aoesniper: "Cannoneer",
  longrange: "Marksman",
  reaperrange: "Spreadshot",
  siegesniper: "Siege",
  bombarder: "Bombardier",
  corecaster: "Core",
  splashcaster: "Dispersal",
  funnel: "Magitech",
  phalanx: "Formation",
  mystic: "Mystic",
  chain: "Chain",
  blastcaster: "Barrage",
  physician: "Healer",
  ringhealer: "Mass Healer",
  healer: "Mender",
  slower: "Inhibitor",
  underminer: "Weakener",
  bard: "Bard",
  blessing: "Protector",
  summoner: "Summoner",
  executor: "Executioner",
  pusher: "Pusher",
  stalker: "Stalker",
  hookmaster: "Grappler",
  geek: "Geek",
  merchant: "Merchant",
  traper: "Trapper",
  dollkeeper: "Puppeteer",
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
  const subclass = subProfessionToSubclass[subProfessionId];
  const rarity = rawRarity + 1; // 0-indexed;
  const position = description
    .toLowerCase()
    .includes("can be deployed on ranged grids")
    ? "Melee or Ranged"
    : toTitleCase(binaryPosition);
  const attackType = getAttackType(professionToClass(profession), description);
  const isMobile = useIsMobile();

  return (
    <div css={styles}>
      <div className="operator-portrait-and-class">
        <div className="name-and-class">
          <div className="operator-name">{name}</div>
          <a
            className="class-and-subclass"
            href={`/classes/${operatorClass.toLowerCase()}#${subclass.toLowerCase()}`}
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
          </a>
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
          <dt>Attack Type</dt>
          <dd className={slugify(attackType)}>
            {attackType}
            {!isMobile && " Damage"}
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
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: ${theme.spacing(0, 0, 0, 3)};

      ${theme.breakpoints.down("mobile")} {
        padding: ${theme.spacing(0, 0, 0, 2)};
        justify-content: flex-start;
      }

      .operator-name {
        font-size: ${theme.typography.operatorNameHeading.fontSize};
        font-weight: ${theme.typography.operatorNameHeading.fontWeight};
        line-height: ${theme.typography.operatorNameHeading.lineHeight};
        margin-bottom: ${theme.spacing(1)};

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.generalHeading.fontSize};
          line-height: ${theme.typography.generalHeading.lineHeight};
          font-weight: ${theme.typography.generalHeadingBold.fontWeight};
        }
      }

      .class-and-subclass {
        padding: ${theme.spacing(1)};
        display: flex;
        align-items: center;
        font-weight: ${theme.typography.navigationLinkBold.fontWeight};
        color: ${theme.palette.white};
        border: 1px solid ${theme.palette.midtoneBrighter};
        border-radius: ${theme.spacing(0.5)};

        &:hover {
          border-color: ${theme.palette.gray};
          background-color: ${theme.palette.midtoneBrighter};
        }

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

      .true {
        color: ${theme.palette.gray};
      }
    }

    .position {
      border-bottom-left-radius: ${theme.spacing(0.5)};
    }
  }
`;
