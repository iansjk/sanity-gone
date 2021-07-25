/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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

      <dt>Health</dt>
      <dd>{health}</dd>

      <dt>Attack Power</dt>
      <dd>{attackPower}</dd>

      <dt>Defense</dt>
      <dd>{defense}</dd>

      <dt>Attacks Interval</dt>
      <dd>{attacksPerSecond} sec</dd>

      <dt>Arts Resistance</dt>
      <dd>{artsResistance}%</dd>

      <dt>Block</dt>
      <dd>{blockCount}</dd>

      <dt>Redeploy Time</dt>
      <dd>{redeployTimeInSeconds} sec</dd>

      <dt>DP Cost</dt>
      <dd>{dpCost}</dd>

      <dt>Range</dt>
      <dd>{range}</dd>
    </dl>
  );
};
export default OperatorStats;

const styles = css``;
