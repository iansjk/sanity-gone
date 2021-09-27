import defaultSlugify from "slugify";
import { OperatorObject, OperatorStatValues } from "./types";

export const slugify = (text: string): string =>
  defaultSlugify(text, { lower: true, replacement: "-", remove: /[-/]/g });

export function toTitleCase(string: string): string {
  return [...string.toLowerCase()]
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
}

export function professionToClass(profession: string): string {
  switch (profession) {
    case "PIONEER":
      return "Vanguard";
    case "WARRIOR":
      return "Guard";
    case "SPECIAL":
      return "Specialist";
    case "TANK":
      return "Defender";
    case "SUPPORT":
      return "Supporter";
    default:
      return toTitleCase(profession);
  }
}

const selfClosingTagRegex = /<(?<tagName>[A-Za-z]+) \/>/g;
export const replaceSelfClosingHtmlTags = (htmlString: string): string =>
  htmlString.replace(
    selfClosingTagRegex,
    (_, tagName: string) => `<${tagName}></${tagName}>`
  );

export const highestOperatorStats = (operatorObject: OperatorObject): OperatorStatValues => {
  const { phases } = operatorObject;
  const activePhase = phases[phases.length - 1];
  const { range: rangeObject } = activePhase;
  const activeKeyFrame =
    activePhase.attributesKeyFrames[activePhase.attributesKeyFrames.length - 1];
  const {
    maxHp: health,
    atk: attackPower,
    def: defense,
    magicResistance: artsResistance,
    cost: dpCost,
    blockCnt: blockCount,
    respawnTime: redeployTimeInSeconds,
    baseAttackTime: attacksPerSecond,
  } = activeKeyFrame.data;
  return {
    health,
    attackPower,
    defense,
    artsResistance,
    dpCost,
    blockCount,
    redeployTimeInSeconds,
    attacksPerSecond,
    rangeObject
  }
}
