import { useCallback } from "react";

import { useStore } from "@nanostores/react";

import { ArtsResistanceIcon, DefenseIcon } from "../../icons/operatorStats";
import { changeEnemyStats, enemyStatsStore } from "../store";

import * as classes from "./styles.css";
import * as configClasses from "../configStyles.css";

import type { EnemySettings } from "../store";

const EnemyStats: React.FC = () => {
  const enemyStats = useStore(enemyStatsStore);

  const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select();
  }, []);

  const getChangeHandlerForKey = useCallback((key: keyof EnemySettings) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!Number.isNaN(value)) {
        changeEnemyStats(key, value);
      }
    };
  }, []);

  return (
    <section className={configClasses.configSection}>
      <h2 className={configClasses.configHeading}>Enemy Stats</h2>
      <hr className={configClasses.configHeadingSeparator} />
      <div className={configClasses.knobs}>
        <div>
          <DefenseIcon pathClassName={classes.defenseIconPath} />
          DEF
          <input
            type="number"
            min={0}
            aria-label="Defense"
            value={enemyStats.defense}
            onChange={getChangeHandlerForKey("defense")}
            onClick={handleClick}
          />
        </div>
        <div>
          <ArtsResistanceIcon pathClassName={classes.resIconPath} />
          RES
          <input
            type="number"
            min={0}
            max={100}
            aria-label="Resistance"
            value={enemyStats.resistance}
            onChange={getChangeHandlerForKey("resistance")}
            onClick={handleClick}
          />
        </div>
        <label>
          Quantity
          <input
            type="number"
            min={1}
            value={enemyStats.quantity}
            onChange={getChangeHandlerForKey("quantity")}
            onClick={handleClick}
          />
        </label>
      </div>
    </section>
  );
};
export default EnemyStats;
