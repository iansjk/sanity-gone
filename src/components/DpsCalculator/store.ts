import { atom, computed, action } from "nanostores";

type OperatorOptions = any; // TODO

interface OperatorColumn {
  operatorId: string;
  stats: {
    elite: number;
    level: number;
    trust: number;
    potential: number;
    skillNumber: number;
    skillLevel: number;
    moduleType: string;
    moduleLevel: number;
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
    })) as any as CalculationResult[]
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

export const isCompareEnabledStore = atom(true);

export const toggleCompareEnabled = action(
  isCompareEnabledStore,
  "toggleCompareEnabled",
  (store) => {
    store.set(!store.get());
  }
);
