/** @jsxImportSource @emotion/react */
import { ClassNames, css, Theme } from "@emotion/react";
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

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 180fr repeat(4, 140fr) 240fr;
  grid-auto-flow: column;
  grid-gap: ${theme.spacing(0.25)};

  .range {
    grid-row-start: span 2;
  }

  .stat-cell {
    padding: ${theme.spacing(2)};
    background-color: ${theme.palette.midBackground};

    dt {
      font-size: 14px;
      color: ${theme.palette.gray};
    }

    dd {
      margin: ${theme.spacing(1)} 0 0;
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
      color: ${theme.palette.red};
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
    }
    fill: ${theme.palette.pink};
  }

  .dp-cost {
    svg path {
      fill: ${theme.palette.gray};
    }
  }
`;
