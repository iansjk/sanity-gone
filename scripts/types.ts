import { InterpolatedValue } from "../src/utils/description-parser";

interface SharedProperties {
  name: string;
  description: string;
  appellation: string;
  profession: string;
  tokenKey: string | null;
  subProfessionId: string;
  rarity: number;
  isNotObtainable: boolean;
  trait: {
    candidates: {
      blackboard: InterpolatedValue[];
    }[];
  } | null;
}

export interface GameDataCharacter extends SharedProperties {
  phases: {
    rangeId: string | null;
    [otherProperties: string]: unknown;
  }[];
  talents:
    | {
        candidates: {
          rangeId: string | null;
          name: string;
          description: string;
        }[];
      }[]
    | null;
  skills: {
    skillId: string | null;
    rangeId: string | null;
    overrideTokenKey: string | null;
  }[];
}

export interface SkillAtLevel {
  name: string;
  description: string | null;
  rangeId: string | null;
}

interface Range {
  id: string;
  direction: number;
  grids: {
    row: number;
    col: number;
  }[];
}

export interface DenormalizedCharacter extends SharedProperties {
  charId: string;
  isCnOnly: boolean;
  phases: {
    range: Range | null;
    [otherProperties: string]: unknown;
  }[];
  talents:
    | {
        candidates: {
          range: Range | null;
          name: string;
          description: string;
        }[];
      }[]
    | null;
  fileIndex: number;
}

export interface SearchResult {
  type: string;
  name: string;
  charId?: string;
  class?: string;
  subclass?: string;
  rarity?: string;
  subProfession?: string;
}

export interface Module {
  moduleId: string;
  moduleEffect: string;
  moduleObject: ModuleObject;
  hasTranslation: boolean;
}

export interface ModuleObject {
  phases: {
    equipLevel: number;
    parts: {
      addOrOverrideTalentDataBundle: {
        candidates?: {
          blackboard: InterpolatedValue[];
        }[];
      };
      overrideTraitDataBundle: {
        candidates?: {
          blackboard: InterpolatedValue[];
          additionalDescription: string | null;
          overrideDescription: string | null;
        }[];
      };
      [otherProperties: string]: unknown;
    }[];
    attributeBlackboard: InterpolatedValue[];
    tokenAttributeBlackboard: unknown;
  }[];
}
