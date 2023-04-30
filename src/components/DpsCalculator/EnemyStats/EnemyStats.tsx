import { useStore } from "@nanostores/react";

import { ArtsResistanceIcon, DefenseIcon } from "../../icons/operatorStats";
import { enemyStatsStore } from "../store";

import * as classes from "./styles.css";
import * as configClasses from "../configStyles.css";

const EnemyStats: React.FC = () => {
  const enemyStats = useStore(enemyStatsStore);

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
            aria-label="Defense"
            value={enemyStats.defense}
          />
        </div>
        <div>
          <ArtsResistanceIcon pathClassName={classes.resIconPath} />
          RES
          <input
            type="number"
            aria-label="Resistance"
            value={enemyStats.resistance}
          />
        </div>
        <label>
          Quantity
          <input type="number" value={enemyStats.quantity} />
        </label>
      </div>
    </section>
  );
};
export default EnemyStats;
