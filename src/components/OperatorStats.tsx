import { css, Theme } from "@emotion/react";
import { professionToClass, slugify, toTitleCase } from "../utils/globals";
import {
  ArtsResistanceIcon,
  AttackPowerIcon,
  AttackSpeedIcon,
  BlockIcon,
  DPCostIcon,
  DefenseIcon,
  HealthIcon,
  RedeployTimeIcon,
} from "./icons/operatorStats";
import OperatorRange, { RangeObject } from "./OperatorRange";

const getDamageType = (
  operatorClass: string,
  description: string
): "Physical" | "Arts" | "Healing" => {
  if (operatorClass === "Medic") return "Healing";
  return description.toLowerCase().includes("arts damage")
    ? "Arts"
    : "Physical";
};

interface AttributeKeyFrame {
  level: number;
  data: {
    maxHp: number;
    atk: number;
    def: number;
    baseAttackTime: number;
    magicResistance: number;
    cost: number;
    blockCnt: number;
    respawnTime: number;
    [otherProperties: string]: unknown;
  };
}

interface OperatorPhaseObject {
  characterPrefabKey: string;
  // character_table.json's "phases" objects have rangeIds,
  // but we expect this to be denormalized first
  range: RangeObject;
  maxLevel: number;
  attributesKeyFrames: AttributeKeyFrame[];
}

// from character_table.json
export interface OperatorObject {
  name: string;
  cnName: string;
  profession: string;
  subProfessionId: string;
  position: "MELEE" | "RANGED";
  description: string;
  phases: OperatorPhaseObject[];
  rarity: number; // 0-indexed, so a 1* op has value 0
}

export interface OperatorStatsProps {
  operatorObject: OperatorObject;
}

const OperatorStats: React.VFC<OperatorStatsProps> = (props) => {
  const { operatorObject } = props;
  const {
    profession,
    position: binaryPosition,
    description,
    phases,
  } = operatorObject;
  const position = description
    .toLowerCase()
    .includes("can be deployed on ranged grids")
    ? "Melee or Ranged"
    : toTitleCase(binaryPosition);
  const activePhase = phases[phases.length - 1];
  const { range: rangeObject } = activePhase;
  const activeKeyFrame =
    activePhase.attributesKeyFrames[activePhase.attributesKeyFrames.length - 1];
  const {
    maxHp: health,
    atk: attackPower,
    def: defense,
    magicResistance: artsResistance,
    cost: dpCost,
    blockCnt: blockCount,
    respawnTime: redeployTimeInSeconds,
    baseAttackTime: attacksPerSecond,
  } = activeKeyFrame.data;
  const damageType = getDamageType(professionToClass(profession), description);

  return (
    <section css={styles}>
      <h3 className="visually-hidden">Operator Stats</h3>
      <dl>
        <div className="damage-type">
          <dt>Damage Type</dt>
          <dd className={slugify(damageType)}>{damageType}</dd>
        </div>

        <div className="position">
          <dt>Position</dt>
          <dd>{position}</dd>
        </div>

        <div className="health">
          <dt>
            <HealthIcon aria-hidden="true" /> Health
          </dt>
          <dd>{health}</dd>
        </div>

        <div className="attack-power">
          <dt>
            <AttackPowerIcon aria-hidden="true" /> Attack Power
          </dt>
          <dd>{attackPower}</dd>
        </div>

        <div className="defense">
          <dt>
            <DefenseIcon aria-hidden="true" /> Defense
          </dt>
          <dd>{defense}</dd>
        </div>

        <div className="attack-interval">
          <dt>
            <AttackSpeedIcon aria-hidden="true" /> Attack Interval
          </dt>
          <dd>{attacksPerSecond} sec</dd>
        </div>

        <div className="arts-resistance">
          <dt>
            <ArtsResistanceIcon aria-hidden="true" /> Arts Resistance
          </dt>
          <dd>{artsResistance}%</dd>
        </div>

        <div className="block">
          <dt>
            <BlockIcon aria-hidden="true" /> Block
          </dt>
          <dd>{blockCount}</dd>
        </div>

        <div className="redeploy-time">
          <dt>
            <RedeployTimeIcon aria-hidden="true" /> Redeploy Time
          </dt>
          <dd>{redeployTimeInSeconds} sec</dd>
        </div>

        <div className="dp-cost">
          <dt>
            <DPCostIcon aria-hidden="true" /> DP Cost
          </dt>
          <dd>{dpCost}</dd>
        </div>

        <div className="range">
          <dt>Range</dt>
          <dd>
            <OperatorRange rangeObject={rangeObject} />
          </dd>
        </div>
      </dl>
    </section>
  );
};
export default OperatorStats;

const styles = (theme: Theme) => css`
  dl {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 180fr repeat(4, 140fr) 240fr;
    grid-auto-flow: column;
    grid-gap: ${theme.spacing(0.25)};
    margin: ${theme.spacing(3, 0, 0)};

    .damage-type {
      border-top-left-radius: ${theme.spacing(0.5)};

      dd {
        font-size: ${theme.typography.body.size};
        font-weight: normal;
      }

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

      dd {
        font-size: 18px;
        font-weight: normal;
      }
    }

    .health {
      svg path {
        fill: ${theme.palette.lime};
      }
    }

    .attack-power {
      svg path {
        fill: ${theme.palette.red};
      }
    }

    .defense {
      svg path {
        fill: ${theme.palette.orange};
      }
    }

    .attack-interval {
      svg path {
        fill: ${theme.palette.yellow};
      }
    }

    .arts-resistance {
      svg path {
        fill: ${theme.palette.blue};
      }
    }

    .block {
      svg path {
        fill: ${theme.palette.softBlue};
      }
    }

    .redeploy-time {
      svg path {
        fill: ${theme.palette.pink};
      }
    }

    .dp-cost {
      svg path {
        fill: ${theme.palette.white};
      }
    }

    .range {
      grid-row-start: span 2;
      position: relative;
      border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};

      dd {
        position: absolute;
        top: -5px; /* this is needed to counteract extra space made by .visually-hidden */
        left: -5px;
        margin-top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
