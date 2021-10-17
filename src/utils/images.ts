import { slugify } from "./globals";

const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/samidare/image/upload/v1/arknights";

export const operatorImage = (name: string, elite?: number): string =>
  `${CLOUDINARY_BASE_URL}/operators/${slugify(name)}${
    typeof elite !== "undefined" && (elite > 1 || name === "Amiya")
      ? `-elite-${elite}`
      : ""
  }`;

export const operatorImage = (name: string, elite?: number): string => `${CLOUDINARY_BASE_URL}/operators/${slugify(name)}${typeof elite !== "undefined" && (elite > 1 || name === 'Amiya') ? elite : ''}`;

export const summonImage = (id: string): string => `${CLOUDINARY_BASE_URL}/summons/${id}`;

export const operatorClassIcon = (operatorClass: string): string => `${CLOUDINARY_BASE_URL}/classes/${operatorClass}`;

export const operatorSubclassIcon = (subProfessionId: string): string => `${CLOUDINARY_BASE_URL}/subclasses/${subProfessionId}`;

export const skillIcon = (iconId: string | null, skillId: string): string => `${CLOUDINARY_BASE_URL}/skills/${iconId ?? skillId}`;

export const moduleImage = (moduleId: string): string => `${CLOUDINARY_BASE_URL}/equip/${moduleId}`;
