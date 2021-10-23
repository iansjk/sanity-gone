import { slugify } from "./globals";

const defaultTransforms = "f_auto,q_auto";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/samidare/image/upload/${defaultTransforms}/v1`;

export const operatorImage = (name: string, elite?: number): string =>
  `${CLOUDINARY_BASE_URL}/arknights/operators/${slugify(name)}${
    typeof elite !== "undefined" && (elite > 1 || name === "Amiya")
      ? `-elite-${elite}`
      : ""
  }`;

export const summonImage = (id: string): string =>
  `${CLOUDINARY_BASE_URL}/arknights/summons/${id}`;

export const operatorPortrait = (name: string, elite?: number): string =>
  `${CLOUDINARY_BASE_URL}/arknights/portraits/${slugify(name)}${
    typeof elite !== "undefined" && (elite > 1 || name === "Amiya")
      ? `-elite-${elite}`
      : ""
  }`;

export const operatorClassIcon = (operatorClass: string): string =>
  `${CLOUDINARY_BASE_URL}/arknights/classes/${operatorClass}`;

export const operatorSubclassIcon = (subProfessionId: string): string =>
  `${CLOUDINARY_BASE_URL}/arknights/subclasses/${subProfessionId}`;

export const skillIcon = (iconId: string | null, skillId: string): string =>
  `${CLOUDINARY_BASE_URL}/arknights/skills/${iconId ?? skillId}`;

export const moduleImage = (moduleId: string): string =>
  `${CLOUDINARY_BASE_URL}/arknights/equip/${moduleId}`;

export const sgMemberAvatar = (memberName: string): string =>
  `${CLOUDINARY_BASE_URL}/sanity-gone-zero/member-avatars/${slugify(
    memberName
  )}`;

export const sgPageBanner = (pageName: string): string =>
  `${CLOUDINARY_BASE_URL}/sanity-gone-zero/page-banners/${pageName}`;
