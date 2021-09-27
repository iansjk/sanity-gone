import { css } from "@emotion/react";
import { highestOperatorStats } from "../utils/globals";
import { OperatorObject } from "../utils/types";

export interface SummonStatsProps {
  summonObject: OperatorObject;
}

const SummonStats: React.VFC<SummonStatsProps> = ({ summonObject }) => {
  const {
    artsResistance,
    attackPower,
    attacksPerSecond,
    blockCount,
    defense,
    dpCost,
    health,
    rangeObject,
    redeployTimeInSeconds,
  } = highestOperatorStats(summonObject);

  return <></>;
};
export default SummonStats;

const styles = css``;
