import { atom, computed, action } from "nanostores";

import operatorsJson from "../../../data/operators.json";
import modulesJson from "../../../data/modules.json";

const MAX_SUPPORTED_COLUMNS = 4;

type OperatorOptions = any; // TODO

interface OperatorColumn {
  operatorName: string;
  stats: {
    elite: number;
    level: number;
    trust: number;
    potential: number;
    skillIndex: number;
    skillLevel: number; // 1 - 10, where 8/9/10 are mastery levels 1/2/3
    moduleIndex: number;
    moduleLevel: number; // 1 - 3
  };
  options: OperatorOptions;
}

interface CalculationResult {
  skillCycle: {
    downtime: number;
    uptime: number;
  };
  skillAtk: number;
  skillTotalDamage: number;
  skillDps: number;
  basicAttackDps: number;
  averageDps: number;
}

export interface EnemySettings {
  defense: number;
  resistance: number;
  quantity: number;
}

export interface BuffSettings {
  flatAtkUp: number;
  atkPercentUp: number;
  aspdUp: number;
  originalAtkUp: number;
  dmgMultiplier: number;
  spRecoveryUp: number;
}

export const operatorsStore = atom<OperatorColumn[]>([]);

export const enemyStatsStore = atom<EnemySettings>({
  defense: 0,
  resistance: 0,
  quantity: 1,
});

export const buffsStore = atom<BuffSettings>({
  aspdUp: 0,
  flatAtkUp: 0,
  atkPercentUp: 0,
  originalAtkUp: 0,
  dmgMultiplier: 0,
  spRecoveryUp: 0,
});

export const calcsStore = computed(
  [operatorsStore, enemyStatsStore, buffsStore],
  (operators, enemyStats, buffsStore) =>
    operators.map((op) => ({
      // TODO
      averageDps: 0,
      basicAttackDps: 0,
      skillCycle: {
        uptime: 2,
        downtime: 10,
      },
      skillAtk: 0,
      skillTotalDamage: 0,
      skillDps: 0,
    })) as CalculationResult[]
);

export const addOperator = action(
  operatorsStore,
  "addOperator",
  (store, operatorName: string) => {
    const currentOperators = store.get();
    if (currentOperators.length >= MAX_SUPPORTED_COLUMNS) {
      console.error("Cannot add any more operator columns");
      return;
    }
    if (currentOperators.find((col) => col.operatorName === operatorName)) {
      console.error(`Operator ${operatorName} already exists`);
      return;
    }

    if (currentOperators.length < MAX_SUPPORTED_COLUMNS) {
      const operator: any = operatorName
        ? operatorsJson[operatorName as keyof typeof operatorsJson]
        : null;
      if (!operator) {
        return;
      }

      const skillLevel = operator.rarity >= 4 ? 10 : 7;

      let elite = 0;
      if (operator.rarity >= 4) {
        elite = 2;
      } else if (operator.rarity > 2) {
        elite = 1;
      }

      const level = (() => {
        if (elite === 2) {
          switch (operator.rarity) {
            case 6:
              return 90;
            case 5:
              return 80;
            case 4:
              return 70;
          }
        } else if (elite === 1) {
          switch (operator.rarity) {
            case 6:
              return 80;
            case 5:
              return 70;
            case 4:
              return 60;
            case 3:
              return 55;
          }
        }
        // elite 0
        switch (operator.rarity) {
          case 6:
          case 5:
            return 50;
          case 4:
            return 45;
          case 3:
            return 40;
        }
        return 30;
      })();

      const skillIndex = operator.skillData.length
        ? operator.skillData.length - 1
        : 0;
      const operatorModules =
        modulesJson[operator.charId as keyof typeof modulesJson] ?? [];
      const moduleIndex = operatorModules.length
        ? operatorModules.length - 1
        : 0;
      const moduleLevel = operatorModules[moduleIndex]?.phases?.length ?? 0;

      // const operatorDpsOptionsTagList = (dpsOptions.char[
      //   operatorName as keyof typeof dpsOptions.char
      // ] ?? []) as Array<keyof typeof dpsOptions.tags>;

      // operatorDpsOptions =
      //   operatorDpsOptionsTagList.reduce<OperatorDpsOptionsMap>((acc, tag) => {
      //     const option: OperatorDpsOption = {
      //       text: "",
      //       enabled: false,
      //     };

      //     if (tag.startsWith("cond")) {
      //       // these are in dps_options.cond_info but come in two formats:
      //       // - `cond`: plain condition, located at dps_options.cond_info[operatorId].
      //       // - `cond_somestring`: complex condition, located at dps_options.cond_info[`${operatorId}_somestring].
      //       let lookupKey =
      //         tag === "cond"
      //           ? operatorName
      //           : `${operatorName}${tag.replace(/^cond/, "")}`;
      //       const tagData =
      //         dpsOptions.cond_info[
      //           lookupKey as keyof typeof dpsOptions.cond_info
      //         ];
      //       if (tagData == null) {
      //         console.error(`Could not find tagData, lookupKey: ${lookupKey}`);
      //         return acc;
      //       }

      //       if (typeof tagData === "number") {
      //         // e.g. "char_4045_heidi":  2
      //         // these are 1-indexed talent numbers (yes that is entirely unintuitive)
      //         // TODO this should be improved by actually including the talent name
      //         option.text = `Talent ${tagData} active?`;
      //       } else if (typeof tagData === "string" && tagData === "trait") {
      //         // e.g. "char_476_blkngt":  "trait"
      //         // so far all of the string-type values in dps_options.cond_info are "trait"
      //         // TODO this should be improved by actually including the trait name
      //         option.text = "Trait active?";
      //       } else if (typeof tagData === "object") {
      //         // e.g. "char_322_lmlee":   { "text": "[t1]单挑", "tooltip": "周围八格内仅存在一个敌人" }
      //         // here "t1" means talent 1
      //         option.text = tagData.text;
      //         option.tooltip = tagData.tooltip;
      //       } else {
      //         console.error(
      //           `Unknown conditional tag data format, tagData: ${tagData}`
      //         );
      //         return acc;
      //       }
      //     } else {
      //       // plain old tag: check dps_options.tags
      //       const tagData =
      //         dpsOptions.tags[tag as keyof typeof dpsOptions.tags];
      //       if (!tagData) {
      //         console.error(
      //           `Could not find tag in dpsOptions.tags, tag: ${tag}`
      //         );
      //         return acc;
      //       }

      //       option.text = tagData.displaytext;
      //       option.tooltip = tagData.explain;
      //       if ("off" in tagData) {
      //         option.enabled = !tagData.off;
      //       } else {
      //         option.enabled = true;
      //       }
      //     }
      //     acc[tag] = option;
      //     return acc;
      //   }, {});
      store.set([
        ...currentOperators,
        {
          operatorName,
          options: {
            // TODO
          },
          stats: {
            elite,
            level,
            moduleLevel,
            moduleIndex,
            skillIndex,
            potential: 1,
            skillLevel,
            trust: 100,
          },
        },
      ]);
    }
  }
);

export const removeOperatorAt = action(
  operatorsStore,
  "removeOperatorAt",
  (store, index) => {
    store.set(
      store
        .get()
        .slice(0, index)
        .concat(store.get().slice(index + 1))
    );
  }
);

export const changeEnemyStats = action(
  enemyStatsStore,
  "changeEnemyStats",
  (store, key: keyof EnemySettings, value: number) => {
    store.set({ ...store.get(), [key]: value });
  }
);

export const changeBuffs = action(
  buffsStore,
  "changeBuffs",
  (store, key: keyof BuffSettings, value: number) => {
    store.set({ ...store.get(), [key]: value });
  }
);

export const canAddOperatorsStore = computed(operatorsStore, (operators) => {
  return operators.length < MAX_SUPPORTED_COLUMNS;
});

export const isCompareEnabledStore = atom(true);

export const toggleCompareEnabled = action(
  isCompareEnabledStore,
  "toggleCompareEnabled",
  (store) => {
    store.set(!store.get());
  }
);
