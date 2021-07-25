/** @jsxImportSource @emotion/react */
import { ClassNames, css } from "@emotion/react";
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
export interface OperatorStatsProps {
  damageType: "Physical" | "Magical";
  position: "Melee" | "Ranged" | "Melee or Ranged";
  health: number;
  attackPower: number;
  defense: number;
  attacksPerSecond: number;
  artsResistance: number;
  blockCount: number;
  redeployTimeInSeconds: number;
  dpCost: number;
  range: string;
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
    range,
  } = props;
  return (
    <dl css={styles}>
      <div className="stat-cell damage-type">
        <dt>Damage Type</dt>
        <ClassNames>
          {({ cx }) => (
            <dd
              className={cx(
                damageType === "Physical" && "physical",
                damageType === "Magical" && "magical"
              )}
            >
              {damageType}
            </dd>
          )}
        </ClassNames>
      </div>

      <div className="stat-cell position">
        <dt>Position</dt>
        <dd>{position}</dd>
      </div>

      <div className="stat-cell health">
        <dt>
          <HealthIcon aria-hidden="true" /> Health
        </dt>
        <dd>{health}</dd>
      </div>

      <div className="stat-cell attack-power">
        <dt>
          <AttackPowerIcon aria-hidden="true" /> Attack Power
        </dt>
        <dd>{attackPower}</dd>
      </div>

      <div className="stat-cell defense">
        <dt>
          <DefenseIcon aria-hidden="true" /> Defense
        </dt>
        <dd>{defense}</dd>
      </div>

      <div className="stat-cell attack-interval">
        <dt>
          <AttackSpeedIcon aria-hidden="true" /> Attack Interval
        </dt>
        <dd>{attacksPerSecond} sec</dd>
      </div>

      <div className="stat-cell arts-resistance">
        <dt>
          <ArtsResistanceIcon aria-hidden="true" /> Arts Resistance
        </dt>
        <dd>{artsResistance}%</dd>
      </div>

      <div className="stat-cell block">
        <dt>
          <BlockIcon aria-hidden="true" /> Block
        </dt>
        <dd>{blockCount}</dd>
      </div>

      <div className="stat-cell redeploy-time">
        <dt>
          <RedeployTimeIcon aria-hidden="true" /> Redeploy Time
        </dt>
        <dd>{redeployTimeInSeconds} sec</dd>
      </div>

      <div className="stat-cell dp-cost">
        <dt>
          <DPCostIcon aria-hidden="true" /> DP Cost
        </dt>
        <dd>{dpCost}</dd>
      </div>

      <div className="stat-cell range">
        <dt>Range</dt>
        <dd>{range}</dd>
      </div>
    </dl>
  );
};
export default OperatorStats;

const styles = css`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 180fr repeat(4, 140fr) 240fr;
  grid-auto-flow: column;
  grid-gap: 2px;

  .range {
    grid-row-start: span 2;
  }

  .stat-cell {
    padding: 16px;
    background-color: #1d1b2c;

    dt {
      font-size: 14px;
      color: #998dba;
    }

    dd {
      margin: 9px 0 0;
      line-height: 31px;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .damage-type {
    dd {
      font-size: 18px;
      font-weight: normal;
    }

    .physical {
      color: #fb4040;
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
      fill: #a7e855;
    }
  }

  .attack-power {
    svg path {
      fill: #fb4040;
    }
  }

  .defense {
    svg path {
      fill: #fa773f;
    }
  }

  .attack-interval {
    svg path {
      fill: #ffcf53;
    }
  }

  .arts-resistance {
    svg path {
      fill: #49b3ff;
    }
  }

  .block {
    svg path {
      fill: #7f7dea;
    }
  }

  .redeploy-time {
    svg path {
      fill: #e85593;
    }
  }

  .dp-cost {
    svg path {
      fill: #c6c6c6;
    }
  }
`;
