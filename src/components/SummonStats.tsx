import { css } from "@emotion/react";
import { highestCharacterStats } from "../utils/globals";
import { CharacterObject } from "../utils/types";

export interface SummonStatsProps {
  summonObject: CharacterObject;
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
  } = highestCharacterStats(summonObject);

  return <></>;
};
export default SummonStats;

const styles = css``;
