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
      <dt>Damage Type</dt>
      <dd>{damageType}</dd>

      <dt>Position</dt>
      <dd>{position}</dd>

      <dt>
        <HealthIcon aria-hidden="true" /> Health
      </dt>
      <dd>{health}</dd>

      <dt>
        <AttackPowerIcon aria-hidden="true" /> Attack Power
      </dt>
      <dd>{attackPower}</dd>

      <dt>
        <DefenseIcon aria-hidden="true" /> Defense
      </dt>
      <dd>{defense}</dd>

      <dt>
        <AttackSpeedIcon aria-hidden="true" /> Attack Interval
      </dt>
      <dd>{attacksPerSecond} sec</dd>

      <dt>
        <ArtsResistanceIcon aria-hidden="true" /> Arts Resistance
      </dt>
      <dd>{artsResistance}%</dd>

      <dt>
        <BlockIcon aria-hidden="true" /> Block
      </dt>
      <dd>{blockCount}</dd>

      <dt>
        <RedeployTimeIcon aria-hidden="true" /> Redeploy Time
      </dt>
      <dd>{redeployTimeInSeconds} sec</dd>

      <dt>
        <DPCostIcon aria-hidden="true" /> DP Cost
      </dt>
      <dd>{dpCost}</dd>

      <dt>Range</dt>
      <dd>{range}</dd>
    </dl>
  );
};
export default OperatorStats;

const styles = css``;
