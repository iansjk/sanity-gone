import defaultSlugify from "slugify";
import { CharacterObject, CharacterStatValues } from "./types";
import { Character } from "../scripts/gamedata-types";


export function slugify(toSlug: string): string {
  return defaultSlugify(toSlug.replace(/[().'-]/g, ""), {
    lower: true,
    replacement: "-",
  });
}

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

const subProfessionLookup: Record<string, string> = {
  pioneer: "Pioneer",
  charger: "Spearhead",
  tactician: "Tactician",
  bearer: "Flagbearer",
  centurion: "Assault",
  fighter: "Brawler",
  artsfghter: "Spellblade",
  instructor: "Instructor",
  lord: "Warlord",
  sword: "Swordmaster",
  musha: "Musha",
  fearless: "Fearless",
  reaper: "Reaper",
  librator: "Liberator",
  protector: "Ironguard",
  guardian: "Guardian",
  unyield: "Unyielding",
  artsprotector: "Arts Ironguard",
  duelist: "Champion",
  fastshot: "Rapid Fire",
  closerange: "Heavy",
  aoesniper: "Cannoneer",
  longrange: "Marksman",
  reaperrange: "Spreadshot",
  siegesniper: "Siege",
  bombarder: "Bombardier",
  corecaster: "Core",
  splashcaster: "Dispersal",
  funnel: "Magitech",
  phalanx: "Formation",
  mystic: "Mystic",
  chain: "Chain",
  blastcaster: "Barrage",
  physician: "Healer",
  ringhealer: "Mass Healer",
  healer: "Mender",
  slower: "Inhibitor",
  underminer: "Weakener",
  bard: "Bard",
  blessing: "Protector",
  summoner: "Summoner",
  executor: "Executioner",
  pusher: "Pusher",
  stalker: "Stalker",
  hookmaster: "Grappler",
  geek: "Geek",
  merchant: "Merchant",
  traper: "Trapper",
  dollkeeper: "Puppeteer",
};
export const subProfessionToSubclass = (subProfession: string): string =>
  subProfessionLookup[subProfession];

const selfClosingTagRegex = /<(?<tagName>[A-Za-z]+) \/>/g;
export const replaceSelfClosingHtmlTags = (htmlString: string): string =>
  htmlString.replace(
    selfClosingTagRegex,
    (_, tagName: string) => `<${tagName}></${tagName}>`,
  );

export const highestCharacterStats = (
  characterObject: CharacterObject,
): CharacterStatValues => {
  const { phases } = characterObject;
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
    rangeObject,
  };
};

export const getStatsAtLevel = (
  characterObject: CharacterObject,
  eliteLevel: number,
  level: number,
  trust: boolean,
  pots: boolean
): CharacterStatValues => {
  const { phases } = characterObject;
  const activePhase = phases[eliteLevel];
  const maxLevel = activePhase.maxLevel;

  const { range: rangeObject } = activePhase;

  const startingKeyFrame = activePhase.attributesKeyFrames[0];
  const finalKeyFrame = activePhase.attributesKeyFrames[activePhase.attributesKeyFrames.length - 1];

  const {
    maxHp: maxHp,
    atk: atk,
    def: def,
    magicResistance: res,
    cost: dp,
    blockCnt: blockCount,
    respawnTime: redeploy,
    baseAttackTime: attacksPerSecond,
  } = startingKeyFrame.data;

  const {
    maxHp: finalMaxHp,
    atk: finalMaxAtk,
    def: finalMaxDef,
    magicResistance: finalMaxRes,
  } = finalKeyFrame.data;

  const {
    maxHp: trustHp,
    atk: trustAtk,
    def: trustDef,
    magicResistance: trustRes,
  } = (trust ? getMaxTrustStatIncrease(characterObject) : {
    maxHp: 0,
    atk: 0,
    def: 0,
    magicResistance: 0,
  }); // pass 0 to everything if trust is off to avoid weird errors with summons

  const {
    health: potHealth,
    attackPower: potAttack,
    defense: potDefense,
    artsResistance: potRes,
    attacksPerSecond: potAttacksPerSecond,
    dpCost: potDp,
    redeployTimeInSeconds: potRedeploy
  } = (pots ? getMaxPotStatIncrease(characterObject) : {
    health: 0,
    attackPower: 0,
    defense: 0,
    artsResistance: 0,
    attacksPerSecond: 0,
    dpCost: 0,
    redeployTimeInSeconds: 0
  });

  // apply trust-based and potential-based transforms
  const health = linearInterpolate(level, maxLevel, maxHp, finalMaxHp) + (trust ? trustHp : 0) + potHealth;
  const attackPower = linearInterpolate(level, maxLevel, atk, finalMaxAtk) + (trust ? trustAtk : 0) + potAttack;
  const defense = linearInterpolate(level, maxLevel, def, finalMaxDef) + (trust ? trustDef : 0) + potDefense;
  const artsResistance = linearInterpolate(level, maxLevel, res, finalMaxRes) + (trust ? trustRes : 0) + potRes;
  const redeployTimeInSeconds = redeploy + potRedeploy;
  const dpCost = dp + potDp;
  // put something about ASPD here once we know how to handle it

  return {
    health,
    attackPower,
    defense,
    artsResistance,
    dpCost,
    blockCount,
    redeployTimeInSeconds,
    attacksPerSecond,
    rangeObject,
  };
};

const linearInterpolate = (level: number, maxLevel: number, baseValue: number, maxValue: number): number => {
  return Math.round(baseValue + (level - 1) * (maxValue - baseValue) / (maxLevel - 1));
};

export const getMaxPotStatIncrease = (
  characterObject: CharacterObject
) => {
  const { potentialRanks } = characterObject;

  const statChanges = {
    health: 0,
    attackPower: 0,
    defense: 0,
    artsResistance: 0,
    attacksPerSecond: 0,
    dpCost: 0,
    redeployTimeInSeconds: 0
  }

  potentialRanks.forEach((pot) => {
    if(pot.buff === null) {
      return;
    }
    const attribType = pot.buff.attributes.attributeModifiers[0].attributeType;
    const attribChange = pot.buff.attributes.attributeModifiers[0].value;

    switch (attribType) {
      case 0:
        statChanges.health += attribChange;
        break;
      case 1:
        statChanges.attackPower += attribChange;
        break;
      case 2:
        statChanges.attackPower += attribChange;
        break;
      case 4:
        statChanges.dpCost += attribChange;
        break;
      case 7:
        // This is an ASPD increase
        // I have no idea how to handle this so I'll just punt
        break;
      case 21:
        statChanges.redeployTimeInSeconds += attribChange;
        break;
      default:
        console.warn("Unrecognized attribute in potentials");
        break;
    }
  })

  return statChanges;
}

export const getMaxTrustStatIncrease = (
  characterObject: CharacterObject
): {
  [p: string]: unknown,
  maxHp: number,
  atk: number,
  def: number,
  magicResistance: number
} => {
  return characterObject.favorKeyFrames[characterObject.favorKeyFrames.length - 1].data
}

export const getTrustIncreaseString = (
  characterObject: CharacterObject
): string => {
  const {
    maxHp: trustHp,
    atk: trustAtk,
    def: trustDef,
    magicResistance: trustRes,
  } = getMaxTrustStatIncrease(characterObject);

  let finalStr = "";
  if(trustHp) finalStr += `HP +${trustHp}\n`;
  if(trustAtk) finalStr += `ATK +${trustAtk}\n`;
  if(trustDef) finalStr += `DEF +${trustDef}\n`;
  if(trustRes) finalStr += `RES +${trustRes}\n`;

  return finalStr.trim();
}

export const getPotentialIncreaseString = (
  characterObject: CharacterObject
): string => {
  const {
    health: potHealth,
    attackPower: potAttack,
    defense: potDefense,
    artsResistance: potRes,
    attacksPerSecond: potAttacksPerSecond,
    dpCost: potDp,
    redeployTimeInSeconds: potRedeploy
  } = getMaxPotStatIncrease(characterObject);

  let finalStr = "";
  if(potHealth !== 0) finalStr += `HP +${potHealth}\n`;
  if(potAttack !== 0) finalStr += `ATK +${potAttack}\n`;
  if(potDefense !== 0) finalStr += `DEF +${potDefense}\n`;
  if(potRes !== 0) finalStr += `RES +${potRes}\n`;
  if(potAttacksPerSecond !== 0) finalStr += `ASPD +${potAttacksPerSecond}\n`; //might be wrong but i'll fix in future
  if(potDp) finalStr += `DP ${potDp}\n`;
  if(potRedeploy) finalStr += `Redep. ${potRedeploy}s\n`;

  return finalStr.trim();

  return finalStr.trim();
}
