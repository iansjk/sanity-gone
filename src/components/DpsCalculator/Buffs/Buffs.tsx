import { useStore } from "@nanostores/react";
import { buffsStore } from "../store";
import { AttackPowerIcon, AttackSpeedIcon } from "../../icons/operatorStats";
import { SPCostIcon } from "../../icons/skillInfo";

import * as classes from "./styles.css";
import * as configClasses from "../configStyles.css";

const Buffs: React.FC = () => {
  const buffs = useStore(buffsStore);

  return (
    <section className={configClasses.configSection}>
      <h2 className={configClasses.configHeading}>Buffs</h2>
      <hr className={configClasses.configHeadingSeparator} />
      <div className={configClasses.knobs}>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          Flat ATK+
          <input
            type="number"
            aria-label="Flat attack increase"
            value={buffs.flatAtkUp}
          />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          ATK%+
          <input
            type="number"
            aria-label="Percentage attack increase"
            value={buffs.atkPercentUp}
          />
        </label>
        <label>
          <AttackSpeedIcon pathClassName={classes.attackSpeedIconPath} />
          ASPD+
          <input
            type="number"
            aria-label="Attack speed increase"
            value={buffs.aspdUp}
          />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          Original ATK+
          <input
            type="number"
            aria-label="Original attack increase"
            value={buffs.originalAtkUp}
          />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          DMG Multiplier
          <input
            type="number"
            aria-label="Damage multiplier"
            value={buffs.dmgMultiplier}
          />
        </label>
        <label>
          <SPCostIcon pathClassName={classes.spIconPath} />
          SP Recovery+
          <input
            type="number"
            aria-label="SP recovery increase"
            value={buffs.spRecoveryUp}
          />
        </label>
      </div>
    </section>
  );
};
export default Buffs;
