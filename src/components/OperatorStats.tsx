/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
      <div className="stat-cell">
        <dt>Damage Type</dt>
        <dd>{damageType}</dd>
      </div>

      <div className="stat-cell">
        <dt>Position</dt>
        <dd>{position}</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <HealthIcon aria-hidden="true" /> Health
        </dt>
        <dd>{health}</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <AttackPowerIcon aria-hidden="true" /> Attack Power
        </dt>
        <dd>{attackPower}</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <DefenseIcon aria-hidden="true" /> Defense
        </dt>
        <dd>{defense}</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <AttackSpeedIcon aria-hidden="true" /> Attack Interval
        </dt>
        <dd>{attacksPerSecond} sec</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <ArtsResistanceIcon aria-hidden="true" /> Arts Resistance
        </dt>
        <dd>{artsResistance}%</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <BlockIcon aria-hidden="true" /> Block
        </dt>
        <dd>{blockCount}</dd>
      </div>

      <div className="stat-cell">
        <dt>
          <RedeployTimeIcon aria-hidden="true" /> Redeploy Time
        </dt>
        <dd>{redeployTimeInSeconds} sec</dd>
      </div>

      <div className="stat-cell">
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

  .range {
    grid-row-start: span 2;
  }
`;
