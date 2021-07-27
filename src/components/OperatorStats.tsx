/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { slugify } from "../utils/globals";
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

export interface OperatorStatsProps {
  damageType: "Physical" | "Arts" | "Healing" | "True";
  position: "Melee" | "Ranged" | "Melee or Ranged";
  health: number;
  attackPower: number;
  defense: number;
  attacksPerSecond: number;
  artsResistance: number;
  blockCount: number;
  redeployTimeInSeconds: number;
  dpCost: number;
  rangeObject: RangeObject;
}

const OperatorStats: React.VFC<OperatorStatsProps> = (props) => {
  const {
    damageType,
    position,
    health,
    attackPower,
    defense,
    attacksPerSecond,
    artsResistance,
    blockCount,
    redeployTimeInSeconds,
    dpCost,
    rangeObject,
  } = props;
  return (
    <dl css={styles}>
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
  );
};
export default OperatorStats;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 180fr repeat(4, 140fr) 240fr;
  grid-auto-flow: column;
  grid-gap: ${theme.spacing(0.25)};
  margin: ${theme.spacing(3)} 0;

  .damage-type {
    dd {
      font-size: 18px;
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
`;
