import { slugify } from "./globals";

export const operatorImage = (name: string, elite?: number): string =>
  `/images/operators/${slugify(name)}${
    typeof elite !== "undefined" && (elite > 1 || name === "Amiya")
      ? `-elite-${elite}`
      : ""
  }.png`;

export const summonImage = (id: string): string => `/images/summons/${id}.png`;

export const operatorPortrait = (name: string, elite?: number): string =>
  `/images/portraits/${slugify(name)}${
    typeof elite !== "undefined" && (elite > 1 || name === "Amiya")
      ? `-elite-${elite}`
      : ""
  }.png`;

export const operatorClassIcon = (operatorClass: string): string =>
  `/images/classes/${operatorClass}.png`;

export const operatorSubclassIcon = (subProfessionId: string): string =>
  `/images/subclasses/${subProfessionId}.png`;

export const skillIcon = (iconId: string | null, skillId: string): string =>
  `/images/skills/${iconId ?? skillId}.png`;

export const moduleImage = (moduleId: string): string =>
  `/images/equip/${moduleId}.png`;

export const sgMemberAvatar = (memberName: string, size: number): string =>
  `/images/member-avatars/${slugify(memberName)}`;

export const sgPageBanner = (pageName: string): string =>
  `/images/page-banners/${pageName}.jpg`;
