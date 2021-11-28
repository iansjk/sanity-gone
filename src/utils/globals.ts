import defaultSlugify from "@sindresorhus/slugify";
import {
  CharacterObject,
  CharacterStatValues,
  PotentialStatChange,
} from "./types";

export function slugify(toSlug: string): string {
  return defaultSlugify(toSlug);
}

export function toTitleCase(string: string): string {
  return [...string.toLowerCase()]
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
}

const professionLookup: Record<string, string> = {
  Vanguard: "PIONEER",
  Guard: "WARRIOR",
  Specialist: "SPECIAL",
  Defender: "TANK",
  Supporter: "SUPPORT",
  Sniper: "SNIPER",
  Medic: "MEDIC",
  Caster: "CASTER",
};
const reverseProfessionLookup = Object.fromEntries(
  Object.entries(professionLookup).map(([k, v]) => [v, k])
);

export const classToProfession = (className: string): string =>
  professionLookup[className];

export const professionToClass = (profession: string): string =>
  reverseProfessionLookup[profession];

const subProfessionLookup: Record<string, string> = {
  pioneer: "Pioneer",
  charger: "Charger",
  tactician: "Tactician",
  bearer: "Standard Bearer",
  centurion: "Assault",
  fighter: "Brawler",
  artsfghter: "Spellblade",
  instructor: "Instructor",
  lord: "Warlord",
  sword: "Swordmaster",
  musha: "Musha",
  fearless: "Dreadnought",
  reaper: "Reaper",
  librator: "Liberator",
  protector: "Ironguard",
  guardian: "Guardian",
  unyield: "Unyielding",
  artsprotector: "Arts Ironguard",
  duelist: "Champion",
  fastshot: "Marksman",
  closerange: "Heavy",
  aoesniper: "Cannoneer",
  longrange: "Deadeye",
  reaperrange: "Spreadshot",
  siegesniper: "Siege",
  bombarder: "Bombardier",
  corecaster: "Core",
  splashcaster: "Dispersion",
  funnel: "Magitech",
  phalanx: "Formation",
  mystic: "Mystic",
  chain: "Chain",
  blastcaster: "Blast",
  physician: "Healer",
  ringhealer: "Mass Healer",
  healer: "Mender",
  slower: "Inhibitor",
  underminer: "Witherer",
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
  craftsman: "Artificer",
  wandermedic: "Wandering",
  fortress: "Fortress",
};
const reverseSubProfessionLookup = Object.fromEntries(
  Object.entries(subProfessionLookup).map(([k, v]) => [v, k])
);
export const subProfessionIdToSubclass = (subProfessionId: string): string =>
  subProfessionLookup[subProfessionId];
export const subclassToSubProfessionId = (subclass: string): string =>
  reverseSubProfessionLookup[subclass];

const selfClosingTagRegex = /<(?<tagName>[A-Za-z]+) \/>/g;
export const replaceSelfClosingHtmlTags = (htmlString: string): string =>
  htmlString.replace(
    selfClosingTagRegex,
    (_, tagName: string) => `<${tagName}></${tagName}>`
  );

export const highestCharacterStats = (
  characterObject: CharacterObject
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
    baseAttackTime,
  } = activeKeyFrame.data;
  const secondsPerAttack = calculateSecondsPerAttack(baseAttackTime, 100);
  return {
    health,
    attackPower,
    defense,
    artsResistance,
    dpCost,
    blockCount,
    redeployTimeInSeconds,
    secondsPerAttack,
    rangeObject,
  };
};

export const getStatsAtLevel = (
  characterObject: CharacterObject,
  values: {
    eliteLevel: number;
    level: number;
    trust: boolean;
    pots: boolean;
  }
): CharacterStatValues => {
  const { eliteLevel, level, trust, pots } = values;

  const { phases } = characterObject;
  const activePhase = phases[eliteLevel];
  const maxLevel = activePhase.maxLevel;

  const { range: rangeObject } = activePhase;

  const startingKeyFrame = activePhase.attributesKeyFrames[0];
  const finalKeyFrame =
    activePhase.attributesKeyFrames[activePhase.attributesKeyFrames.length - 1];

  const {
    maxHp,
    atk,
    def,
    magicResistance: res,
    cost: dp,
    blockCnt: blockCount,
    respawnTime: redeploy,
    baseAttackTime,
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
  } = trust
    ? getMaxTrustStatIncrease(characterObject)
    : {
        maxHp: 0,
        atk: 0,
        def: 0,
        magicResistance: 0,
      }; // pass 0 to everything if trust is off to avoid weird errors with summons

  const {
    health: potHealth,
    attackPower: potAttack,
    defense: potDefense,
    attackSpeed: potASPD,
    dpCost: potDp,
    redeployTimeInSeconds: potRedeploy,
  } = pots
    ? getMaxPotStatIncrease(characterObject)
    : {
        health: 0,
        attackPower: 0,
        defense: 0,
        attackSpeed: 0,
        dpCost: 0,
        redeployTimeInSeconds: 0,
      };

  // apply trust-based and potential-based transforms
  const health =
    linearInterpolate(level, maxLevel, maxHp, finalMaxHp) +
    (trust ? trustHp : 0) +
    potHealth;
  const attackPower =
    linearInterpolate(level, maxLevel, atk, finalMaxAtk) +
    (trust ? trustAtk : 0) +
    potAttack;
  const defense =
    linearInterpolate(level, maxLevel, def, finalMaxDef) +
    (trust ? trustDef : 0) +
    potDefense;
  const artsResistance =
    linearInterpolate(level, maxLevel, res, finalMaxRes) +
    (trust ? trustRes : 0);
  const redeployTimeInSeconds = redeploy + potRedeploy;
  const dpCost = dp + potDp;

  // ASPD...
  const secondsPerAttack = calculateSecondsPerAttack(
    baseAttackTime,
    100 + potASPD
  );

  return {
    health,
    attackPower,
    defense,
    artsResistance,
    dpCost,
    blockCount,
    redeployTimeInSeconds,
    secondsPerAttack,
    rangeObject,
  };
};

const linearInterpolate = (
  level: number,
  maxLevel: number,
  baseValue: number,
  maxValue: number
): number => {
  return Math.round(
    baseValue + ((level - 1) * (maxValue - baseValue)) / (maxLevel - 1)
  );
};

export const calculateSecondsPerAttack = (
  baseAttackTime: number,
  aspd: number
): number => {
  return Math.round((baseAttackTime * 30) / (aspd / 100.0)) / 30;
};

// Returns an array of CharacterStatValues changes at each potential level,
// with Pot2 at index 0 and Pot6 at index 4.
export const getPotStatIncreases = (
  characterObject: CharacterObject
): PotentialStatChange[] => {
  const { potentialRanks } = characterObject;

  const statChanges: PotentialStatChange[] = [];

  potentialRanks.forEach((pot) => {
    if (pot.buff == null) {
      let desc = pot.description;
      if (desc.startsWith("Improves ")) {
        desc = desc.replace("Improves ", "") + " Enhancement";
      } else if (desc === "天赋效果增强") {
        desc = "Talent Enhancement";
      } else if (desc === "第一天赋效果增强") {
        desc = "First Talent Enhancement";
      } else if (desc === "第二天赋效果增强") {
        desc = "Second Talent Enhancement";
      }
      statChanges.push({
        health: 0,
        attackPower: 0,
        defense: 0,
        dpCost: 0,
        attackSpeed: 0,
        redeployTimeInSeconds: 0,
        description: desc,
      });
      return;
    }
    const curStats: PotentialStatChange = {
      health: 0,
      attackPower: 0,
      defense: 0,
      dpCost: 0,
      attackSpeed: 0,
      redeployTimeInSeconds: 0,
      description: null,
    };
    const attribType = pot.buff.attributes.attributeModifiers[0].attributeType;
    const attribChange = pot.buff.attributes.attributeModifiers[0].value;

    switch (attribType) {
      case 0:
        curStats.health += attribChange;
        break;
      case 1:
        curStats.attackPower += attribChange;
        break;
      case 2:
        curStats.defense += attribChange;
        break;
      case 4:
        curStats.dpCost += attribChange;
        break;
      case 7:
        curStats.attackSpeed += attribChange;
        break;
      case 21:
        curStats.redeployTimeInSeconds += attribChange;
        break;
      default:
        console.warn("Unrecognized attribute in potentials");
        break;
    }
    statChanges.push(curStats);
  });

  return statChanges;
};

export const getMaxPotStatIncrease = (
  characterObject: CharacterObject
): PotentialStatChange => {
  return getPotStatIncreases(characterObject).reduce(
    (vals: PotentialStatChange, previous: PotentialStatChange) => {
      return {
        health: vals.health + previous.health,
        attackPower: vals.attackPower + previous.attackPower,
        defense: vals.defense + previous.defense,
        dpCost: vals.dpCost + previous.dpCost,
        attackSpeed: vals.attackSpeed + previous.attackSpeed,
        redeployTimeInSeconds:
          vals.redeployTimeInSeconds + previous.redeployTimeInSeconds,
        description: null,
      };
    },
    {
      health: 0,
      attackPower: 0,
      defense: 0,
      dpCost: 0,
      attackSpeed: 0,
      redeployTimeInSeconds: 0,
      description: null,
    }
  );
};

export const getMaxTrustStatIncrease = (
  characterObject: CharacterObject
): {
  maxHp: number;
  atk: number;
  def: number;
  magicResistance: number;
} => {
  return characterObject.favorKeyFrames[
    characterObject.favorKeyFrames.length - 1
  ].data;
};
