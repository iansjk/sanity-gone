export const operatorAvatar = (charId: string, elite?: number): string => {
  const basePath = `/images/avatars/${charId}`;
  if (charId === "char_002_amiya" && elite === 1) {
    return `${basePath}_1+.png`;
  } else if (elite === 2) {
    return `${basePath}_2.png`;
  }
  return `${basePath}.png`;
};

export const summonImage = (id: string): string => `/images/avatars/${id}.png`;

export const operatorClassIcon = (operatorClass: string): string =>
  `/images/classes/${operatorClass}.png`;

export const operatorBranchIcon = (subProfessionId: string): string =>
  `/images/branches/sub_${subProfessionId}_icon.png`;

export const skillIcon = (iconId: string | null, skillId: string): string =>
  `/images/skills/skill_icon_${iconId ?? skillId}.png`;

export const moduleImage = (moduleId: string): string =>
  `/images/modules/${moduleId}.png`;

export const moduleTypeImage = (moduleType: string): string =>
  `/images/module-types/${moduleType}.png`;
