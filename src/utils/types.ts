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

interface CharacterPhaseObject {
  characterPrefabKey: string;
  // character_table.json's "phases" objects have rangeIds,
  // but we expect this to be denormalized first
  range: RangeObject;
  maxLevel: number;
  attributesKeyFrames: AttributeKeyFrame[];

  [otherProperties: string]: unknown;
}

// from character_table.json
export interface CharacterObject {
  charId: string;
  name: string;
  cnName: string;
  profession: string;
  subProfessionId: string;
  position: string;
  description: string | null;
  phases: CharacterPhaseObject[];
  rarity: number; // 0-indexed, so a 1* op has value 0
  favorKeyFrames: FavorKeyFrame[] | null;
  potentialRanks: PotentialRanks[];

  [otherProperties: string]: unknown;
}

export interface CharacterStatValues {
  health: number;
  attackPower: number;
  defense: number;
  artsResistance: number;
  dpCost: number;
  blockCount: number;
  redeployTimeInSeconds: number;
  secondsPerAttack: number;
  rangeObject: RangeObject;
}

// trust bonuses... agh
// should only ever be HP, ATK, or DEF (RES is included for posterity)
export interface FavorKeyFrame {
  level: number;
  data: {
    maxHp: number;
    atk: number;
    def: number;
    magicResistance: number;
    [otherProperties: string]: unknown;
  };
}

// potential bonuses
// kill me now
export interface PotentialRanks {
  buff: {
    attributes: {
      attributeModifiers: {
        attributeType: number;
        value: number;
      }[];
    };
  } | null;
  type: number;
  description: string;
}

export interface PotentialStatChange {
  health: number;
  attackPower: number;
  defense: number;
  artsResistance: number;
  dpCost: number;
  attackSpeed: number;
  redeployTimeInSeconds: number;
  description: string | null;
}
