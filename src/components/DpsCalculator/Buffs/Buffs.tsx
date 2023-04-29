import { AttackPowerIcon, AttackSpeedIcon } from "../../icons/operatorStats";
import { SPCostIcon } from "../../icons/skillInfo";

import * as classes from "./styles.css";
import * as configClasses from "../configStyles.css";

interface Props {}

const Buffs: React.FC<Props> = () => {
  return (
    <section className={configClasses.configSection}>
      <h2 className={configClasses.configHeading}>Buffs</h2>
      <hr className={configClasses.configHeadingSeparator} />
      <div className={configClasses.knobs}>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          Flat ATK+
          <input type="number" aria-label="Flat attack increase" />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          ATK%+
          <input type="number" aria-label="Percentage attack increase" />
        </label>
        <label>
          <AttackSpeedIcon pathClassName={classes.attackSpeedIconPath} />
          ASPD+
          <input type="number" aria-label="Attack speed increase" />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          Original ATK+
          <input type="number" aria-label="Original attack increase" />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          DMG Multiplier
          <input type="number" aria-label="Damage multiplier" />
        </label>
        <label>
          <SPCostIcon pathClassName={classes.spIconPath} />
          SP Recovery+
          <input type="number" aria-label="SP recovery increase" />
        </label>
      </div>
    </section>
  );
};
export default Buffs;
