import { slugify } from "./globals";

export const operatorImage = (name: string, elite?: number): string =>
  `/images/operators/${slugify(name)}${
    typeof elite !== "undefined" && (elite > 1 || name === "Amiya")
      ? `-elite-${elite}`
      : ""
  }.png`;

export const summonImage = (id: string): string => `/images/summons/${id}.png`;

export const operatorClassIcon = (operatorClass: string): string =>
  `/images/classes/${operatorClass}.png`;

export const operatorBranchIcon = (subProfessionId: string): string =>
  `/images/branches/${subProfessionId}.png`;

export const skillIcon = (iconId: string | null, skillId: string): string =>
  `/images/skills/skill_icon_${iconId ?? skillId}.png`;

export const moduleImage = (moduleId: string): string =>
  `/images/equip/${moduleId}.png`;
