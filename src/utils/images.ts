import defaultSlugify from "slugify";

const slugify = (text: string): string => defaultSlugify(text, { lower: true, replacement: "-", remove: /-/g });
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/samidare/image/upload/v1/arknights';

export const operatorImage = (name: string, elite?: number) => `${CLOUDINARY_BASE_URL}/operators/${slugify(name)}${elite > 1 || name === 'Amiya' ? elite : ''}`;

export const operatorClassIcon = (operatorClass: string) => `${CLOUDINARY_BASE_URL}/classes/${operatorClass}`;
