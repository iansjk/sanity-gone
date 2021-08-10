import { css, Theme } from "@emotion/react";
import { professionToClass } from "../utils/globals";
import { operatorClassIcon, operatorSubclassIcon } from "../utils/images";
import { OperatorObject } from "./OperatorStats";
import OperatorPortrait from "./OperatorPortrait";

export interface OperatorInfoProps {
  operatorObject: OperatorObject;
  isLimited?: boolean;
}

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

const IconSeparator: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="0.646447" y1="18.1318" x2="17.617" y2="1.16124" stroke="#fff" />
  </svg>
);

const OperatorInfo: React.VFC<OperatorInfoProps> = (props) => {
  const { operatorObject, isLimited } = props;
  const {
    name,
    profession,
    rarity: rawRarity,
    subProfessionId,
  } = operatorObject;
  const operatorClass = professionToClass(profession);
  const rarity = rawRarity + 1; // 0-indexed;
  return (
    <div css={styles}>
      <div className="name-and-class">
        <div className="operator-name">{name}</div>
        <div className="operator-class-subclass">
          <div className="class-subclass-icons">
            <img
              className="class-icon"
              src={operatorClassIcon(operatorClass.toLowerCase())}
              alt=""
            />
            <IconSeparator className="separator" aria-hidden="true" />
            <img
              className="subclass-icon"
              src={operatorSubclassIcon(subProfessionId)}
              alt=""
            />
          </div>
          <div className="class-and-subclass">
            <span className="subclass-name">
              {subProfessionToSubclass[subProfessionId]}
            </span>
            <br />
            <span className="class-name">{operatorClass}</span>
          </div>
        </div>
      </div>
      <OperatorPortrait
        variant="normal"
        name={name}
        isLimited={isLimited}
        rarity={rarity}
      />
    </div>
  );
};
export default OperatorInfo;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  .name-and-class {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: ${theme.spacing(0, 0, 0, 3)};

    .operator-name {
      font-size: ${theme.typography.operatorNameHeading.size};
      font-weight: ${theme.typography.operatorNameHeading.weight};
      line-height: ${theme.typography.operatorNameHeading.lineHeight};
      margin-bottom: ${theme.spacing(1)};
    }

    .operator-class-subclass {
      display: flex;
      align-items: center;

      .class-subclass-icons {
        display: grid;
        grid-template-columns: 24px 18px 24px;
        column-gap: ${theme.spacing(1)};
        padding: ${theme.spacing(1)};
        background-color: ${theme.palette.background};
        border-radius: ${theme.spacing(1)};

        .class-icon,
        .subclass-icon {
          width: 24px;
          height: 24px;
          line-height: 1;
        }
      }

      .class-and-subclass {
        margin-left: ${theme.spacing(2)};
        font-size: ${theme.typography.label2.size};
        line-height: ${theme.typography.label2.lineHeight};
        font-weight: ${theme.typography.label2.fontWeight};
        text-transform: uppercase;

        .class-name {
          color: ${theme.palette.white};
        }
      }
    }
  }
`;
