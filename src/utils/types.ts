export interface AttributeKeyFrame {
  level: number;
  data: {
    maxHp: number;
    atk: number;
    def: number;
    baseAttackTime: number;
    magicResistance: number;
    cost: number;
    blockCnt: number;
    respawnTime: number;
    [otherProperties: string]: unknown;
  };
}

export interface RangeObject {
  id: string;
  direction: number;
  grids: {
    row: number;
    col: number;
  }[];
}

interface OperatorPhaseObject {
  characterPrefabKey: string;
  // character_table.json's "phases" objects have rangeIds,
  // but we expect this to be denormalized first
  range: RangeObject;
  maxLevel: number;
  attributesKeyFrames: AttributeKeyFrame[];
}

// from character_table.json
export interface CharacterObject {
  name: string;
  cnName: string;
  profession: string;
  subProfessionId: string;
  position: "MELEE" | "RANGED";
  description: string;
  phases: OperatorPhaseObject[];
  rarity: number; // 0-indexed, so a 1* op has value 0
}

export interface CharacterStatValues {
  health: number,
  attackPower: number,
  defense: number,
  artsResistance: number,
  dpCost: number,
  blockCount: number,
  redeployTimeInSeconds: number,
  attacksPerSecond: number,
  rangeObject: RangeObject
}
