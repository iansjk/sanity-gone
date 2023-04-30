import { useCallback } from "react";

import { useStore } from "@nanostores/react";

import { buffsStore, changeBuffs } from "../store";
import { AttackPowerIcon, AttackSpeedIcon } from "../../icons/operatorStats";
import { SPCostIcon } from "../../icons/skillInfo";
import PercentageInput from "../PercentageInput";

import * as classes from "./styles.css";
import * as configClasses from "../configStyles.css";

import type { BuffSettings } from "../store";

const Buffs: React.FC = () => {
  const buffs = useStore(buffsStore);

  const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select();
  }, []);

  const getChangeHandlerForKey = useCallback((key: keyof BuffSettings) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!Number.isNaN(value)) {
        changeBuffs(key, value);
      }
    };
  }, []);

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
            onChange={getChangeHandlerForKey("flatAtkUp")}
            onClick={handleClick}
          />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          ATK%+
          <PercentageInput
            aria-label="Percentage attack increase"
            value={buffs.atkPercentUp}
            onChange={getChangeHandlerForKey("atkPercentUp")}
            onClick={handleClick}
          />
        </label>
        <label>
          <AttackSpeedIcon pathClassName={classes.attackSpeedIconPath} />
          ASPD+
          <input
            type="number"
            aria-label="Attack speed increase"
            value={buffs.aspdUp}
            onChange={getChangeHandlerForKey("aspdUp")}
            onClick={handleClick}
          />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          Original ATK+
          <PercentageInput
            aria-label="Original attack increase"
            value={buffs.originalAtkUp}
            onChange={getChangeHandlerForKey("originalAtkUp")}
            onClick={handleClick}
          />
        </label>
        <label>
          <AttackPowerIcon pathClassName={classes.attackIconPath} />
          DMG Multiplier
          <PercentageInput
            aria-label="Damage multiplier"
            value={buffs.dmgMultiplier}
            onChange={getChangeHandlerForKey("dmgMultiplier")}
            onClick={handleClick}
          />
        </label>
        <label>
          <SPCostIcon pathClassName={classes.spIconPath} />
          SP Recovery+
          <PercentageInput
            aria-label="SP recovery increase"
            value={buffs.spRecoveryUp}
            onChange={getChangeHandlerForKey("spRecoveryUp")}
            onClick={handleClick}
          />
        </label>
      </div>
    </section>
  );
};
export default Buffs;
