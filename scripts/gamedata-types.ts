export interface Character {
  name: string;
  description: string;
  appellation: string;
  profession: string;
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
  tokenKey: string | null;
  skills: {
    skillId: string | null;
    rangeId: string | null;
    overrideTokenKey: string | null;
  }[];
}

export interface SkillAtLevel {
  name: string;
  description: string;
  rangeId: string | null;
}
