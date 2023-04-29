import { ArtsResistanceIcon, DefenseIcon } from "../../icons/operatorStats";

import * as classes from "./styles.css";
import * as configClasses from "../configStyles.css";

interface Props {}

const EnemyStats: React.FC<Props> = () => {
  return (
    <section className={configClasses.configSection}>
      <h2 className={configClasses.configHeading}>Enemy Stats</h2>
      <hr className={configClasses.configHeadingSeparator} />
      <div className={configClasses.knobs}>
        <div>
          <DefenseIcon pathClassName={classes.defenseIconPath} />
          DEF
          <input type="number" aria-label="Defense" />
        </div>
        <div>
          <ArtsResistanceIcon pathClassName={classes.resIconPath} />
          RES
          <input type="number" aria-label="Resistance" />
        </div>
        <label>
          Quantity
          <input type="number" />
        </label>
      </div>
    </section>
  );
};
export default EnemyStats;
