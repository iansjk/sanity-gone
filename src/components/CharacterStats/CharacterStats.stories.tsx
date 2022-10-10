import { Meta, Story } from "@storybook/react";
import { CharacterObject } from "../../utils/types";
import CharacterStats, { CharacterStatsProps } from "./CharacterStats";
import { TalentObject } from "../TalentInfo";

export default {
  title: "Introduction/CharacterStats",
  component: CharacterStats,
} as Meta;

const Template: Story<CharacterStatsProps> = (args) => (
  <CharacterStats {...args} />
);
export const Mudrock = Template.bind({});
Mudrock.args = {
  characterObject: {
    name: "Mudrock",
    description: "<@ba.kw>Cannot</> be healed by allies",
    canUseGeneralPotentialItem: true,
    potentialItemId: "p_char_311_mudrok",
    nationId: "rhodes",
    groupId: null,
    teamId: null,
    displayNumber: "R159",
    tokenKey: null,
    appellation: " ",
    position: "MELEE",
    tagList: ["Survival", "Defense", "DPS"],
    itemUsage:
      "Mudrock, Sarkaz mercenary, old friend of the fertile soil and stone.",
    itemDesc:
      "Many people are astonished by her true appearance, and we're all no different.",
    itemObtainApproach: "Recruitment & Headhunting",
    isNotObtainable: false,
    isSpChar: false,
    maxPotentialLevel: 5,
    rarity: 5,
    profession: "TANK",
    trait: null,
    phases: [
      {
        characterPrefabKey: "char_311_mudrok",
        rangeId: "1-1",
        maxLevel: 50,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 1677,
              atk: 370,
              def: 229,
              magicResistance: 10,
              cost: 32,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.6,
              respawnTime: 70,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
          {
            level: 50,
            data: {
              maxHp: 2207,
              atk: 515,
              def: 347,
              magicResistance: 10,
              cost: 32,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.6,
              respawnTime: 70,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
        ],
        evolveCost: null,
        range: {
          id: "1-1",
          direction: 1,
          grids: [
            {
              row: 0,
              col: 0,
            },
            {
              row: 0,
              col: 1,
            },
          ],
        },
      },
      {
        characterPrefabKey: "char_311_mudrok",
        rangeId: "1-1",
        maxLevel: 80,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 2207,
              atk: 515,
              def: 347,
              magicResistance: 10,
              cost: 34,
              blockCnt: 3,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.6,
              respawnTime: 70,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
          {
            level: 80,
            data: {
              maxHp: 2867,
              atk: 687,
              def: 463,
              magicResistance: 10,
              cost: 34,
              blockCnt: 3,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.6,
              respawnTime: 70,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
        ],
        evolveCost: [
          {
            id: "3231",
            count: 5,
            type: "MATERIAL",
          },
          {
            id: "30012",
            count: 12,
            type: "MATERIAL",
          },
          {
            id: "30052",
            count: 4,
            type: "MATERIAL",
          },
        ],
        range: {
          id: "1-1",
          direction: 1,
          grids: [
            {
              row: 0,
              col: 0,
            },
            {
              row: 0,
              col: 1,
            },
          ],
        },
      },
      {
        characterPrefabKey: "char_311_mudrok",
        rangeId: "1-1",
        maxLevel: 90,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 2867,
              atk: 687,
              def: 463,
              magicResistance: 10,
              cost: 36,
              blockCnt: 3,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.6,
              respawnTime: 70,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
          {
            level: 90,
            data: {
              maxHp: 3928,
              atk: 882,
              def: 602,
              magicResistance: 10,
              cost: 36,
              blockCnt: 3,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.6,
              respawnTime: 70,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
        ],
        evolveCost: [
          {
            id: "3233",
            count: 4,
            type: "MATERIAL",
          },
          {
            id: "30145",
            count: 4,
            type: "MATERIAL",
          },
          {
            id: "31024",
            count: 5,
            type: "MATERIAL",
          },
        ],
        range: {
          id: "1-1",
          direction: 1,
          grids: [
            {
              row: 0,
              col: 0,
            },
            {
              row: 0,
              col: 1,
            },
          ],
        },
      },
    ],
    skills: [
      {
        skillId: "skcom_def_up[3]",
        overridePrefabKey: "skchr_mudrok_1",
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 28800,
            levelUpCost: [
              {
                id: "3303",
                count: 8,
                type: "MATERIAL",
              },
              {
                id: "30084",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30063",
                count: 4,
                type: "MATERIAL",
              },
            ],
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 57600,
            levelUpCost: [
              {
                id: "3303",
                count: 12,
                type: "MATERIAL",
              },
              {
                id: "30014",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30094",
                count: 9,
                type: "MATERIAL",
              },
            ],
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 86400,
            levelUpCost: [
              {
                id: "3303",
                count: 15,
                type: "MATERIAL",
              },
              {
                id: "30125",
                count: 6,
                type: "MATERIAL",
              },
              {
                id: "31034",
                count: 4,
                type: "MATERIAL",
              },
            ],
          },
        ],
        unlockCond: {
          phase: 0,
          level: 1,
        },
      },
      {
        skillId: "skchr_mudrok_2",
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 28800,
            levelUpCost: [
              {
                id: "3303",
                count: 8,
                type: "MATERIAL",
              },
              {
                id: "31034",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "31013",
                count: 3,
                type: "MATERIAL",
              },
            ],
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 57600,
            levelUpCost: [
              {
                id: "3303",
                count: 12,
                type: "MATERIAL",
              },
              {
                id: "31014",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30014",
                count: 10,
                type: "MATERIAL",
              },
            ],
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 86400,
            levelUpCost: [
              {
                id: "3303",
                count: 15,
                type: "MATERIAL",
              },
              {
                id: "30115",
                count: 6,
                type: "MATERIAL",
              },
              {
                id: "31024",
                count: 6,
                type: "MATERIAL",
              },
            ],
          },
        ],
        unlockCond: {
          phase: 1,
          level: 1,
        },
      },
      {
        skillId: "skchr_mudrok_3",
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 28800,
            levelUpCost: [
              {
                id: "3303",
                count: 8,
                type: "MATERIAL",
              },
              {
                id: "30104",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30083",
                count: 5,
                type: "MATERIAL",
              },
            ],
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 57600,
            levelUpCost: [
              {
                id: "3303",
                count: 12,
                type: "MATERIAL",
              },
              {
                id: "30044",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "31024",
                count: 7,
                type: "MATERIAL",
              },
            ],
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 86400,
            levelUpCost: [
              {
                id: "3303",
                count: 15,
                type: "MATERIAL",
              },
              {
                id: "30135",
                count: 6,
                type: "MATERIAL",
              },
              {
                id: "31014",
                count: 6,
                type: "MATERIAL",
              },
            ],
          },
        ],
        unlockCond: {
          phase: 2,
          level: 1,
        },
      },
    ],
    talents: [
      {
        candidates: [
          {
            unlockCondition: {
              phase: 0,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "1",
            name: "Ward of the Fertile Soil",
            description:
              "Every 9 seconds, gains 1 <$ba.shield>Shield</> (Can have up to 2 stacks, with 1 stack granted immediately when deployed). When a Shield is broken, restores 15% of Max HP",
            rangeId: null,
            blackboard: [
              {
                key: "interval",
                value: 9,
              },
              {
                key: "times",
                value: 1,
              },
              {
                key: "max_times",
                value: 2,
              },
              {
                key: "hp_ratio",
                value: 0.15,
              },
            ],
            range: null,
          },
          {
            unlockCondition: {
              phase: 0,
              level: 1,
            },
            requiredPotentialRank: 4,
            prefabKey: "1",
            name: "Ward of the Fertile Soil",
            description:
              "Every 9 seconds, gains 1 <$ba.shield>Shield</> (Can have up to 2 stacks, with 1 stack granted immediately when deployed). When a Shield is broken, restores 17% <@ba.talpu>(+2%)</> of Max HP",
            rangeId: null,
            blackboard: [
              {
                key: "interval",
                value: 9,
              },
              {
                key: "times",
                value: 1,
              },
              {
                key: "max_times",
                value: 2,
              },
              {
                key: "hp_ratio",
                value: 0.17,
              },
            ],
            range: null,
          },
          {
            unlockCondition: {
              phase: 1,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "1",
            name: "Ward of the Fertile Soil",
            description:
              "Every 9 seconds, gains 1 <$ba.shield>Shield</> (Can have up to 2 stacks, with 1 stack granted immediately when deployed). When a Shield is broken, restores 20% of Max HP",
            rangeId: null,
            blackboard: [
              {
                key: "interval",
                value: 9,
              },
              {
                key: "times",
                value: 1,
              },
              {
                key: "max_times",
                value: 2,
              },
              {
                key: "hp_ratio",
                value: 0.2,
              },
            ],
            range: null,
          },
          {
            unlockCondition: {
              phase: 1,
              level: 1,
            },
            requiredPotentialRank: 4,
            prefabKey: "1",
            name: "Ward of the Fertile Soil",
            description:
              "Every 9 seconds, gains 1 <$ba.shield>Shield</> (Can have up to 2 stacks, with 1 stack granted immediately when deployed). When a Shield is broken, restores 22% <@ba.talpu>(+2%)</> of Max HP",
            rangeId: null,
            blackboard: [
              {
                key: "interval",
                value: 9,
              },
              {
                key: "times",
                value: 1,
              },
              {
                key: "max_times",
                value: 2,
              },
              {
                key: "hp_ratio",
                value: 0.22,
              },
            ],
            range: null,
          },
          {
            unlockCondition: {
              phase: 2,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "1",
            name: "Ward of the Fertile Soil",
            description:
              "Every 9 seconds, gains 1 <$ba.shield>Shield</> (Can have up to 3 stacks, with 1 stack granted immediately when deployed). When a Shield is broken, restores 20% of Max HP",
            rangeId: null,
            blackboard: [
              {
                key: "interval",
                value: 9,
              },
              {
                key: "times",
                value: 1,
              },
              {
                key: "max_times",
                value: 3,
              },
              {
                key: "hp_ratio",
                value: 0.2,
              },
            ],
            range: null,
          },
          {
            unlockCondition: {
              phase: 2,
              level: 1,
            },
            requiredPotentialRank: 4,
            prefabKey: "1",
            name: "Ward of the Fertile Soil",
            description:
              "Every 9 seconds, gains 1 <$ba.shield>Shield</> (Can have up to 3 stacks, with 1 stack granted immediately when deployed). When a Shield is broken, restores 22% <@ba.talpu>(+2%)</> of Max HP",
            rangeId: null,
            blackboard: [
              {
                key: "interval",
                value: 9,
              },
              {
                key: "times",
                value: 1,
              },
              {
                key: "max_times",
                value: 3,
              },
              {
                key: "hp_ratio",
                value: 0.22,
              },
            ],
            range: null,
          },
        ],
      },
      {
        candidates: [
          {
            unlockCondition: {
              phase: 2,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "2",
            name: "Unshakable Solidarity",
            description: "Takes 30% less damage from Sarkaz enemies",
            rangeId: null,
            blackboard: [
              {
                key: "damage_resistance",
                value: 0.3,
              },
            ],
            range: null,
          },
        ],
      },
    ] as unknown as TalentObject[],
    potentialRanks: [
      {
        type: 0,
        description: "DP Cost -1",
        buff: {
          attributes: {
            abnormalFlags: null,
            abnormalImmunes: null,
            abnormalAntis: null,
            abnormalCombos: null,
            abnormalComboImmunes: null,
            attributeModifiers: [
              {
                attributeType: 4,
                formulaItem: 0,
                value: -1,
                loadFromBlackboard: false,
                fetchBaseValueFromSourceEntity: false,
              },
            ],
          },
        },
        equivalentCost: null,
      },
      {
        type: 0,
        description: "Redeployment Time -4 sec",
        buff: {
          attributes: {
            abnormalFlags: null,
            abnormalImmunes: null,
            abnormalAntis: null,
            abnormalCombos: null,
            abnormalComboImmunes: null,
            attributeModifiers: [
              {
                attributeType: 21,
                formulaItem: 0,
                value: -4,
                loadFromBlackboard: false,
                fetchBaseValueFromSourceEntity: false,
              },
            ],
          },
        },
        equivalentCost: null,
      },
      {
        type: 0,
        description: "DEF +29",
        buff: {
          attributes: {
            abnormalFlags: null,
            abnormalImmunes: null,
            abnormalAntis: null,
            abnormalCombos: null,
            abnormalComboImmunes: null,
            attributeModifiers: [
              {
                attributeType: 2,
                formulaItem: 0,
                value: 29,
                loadFromBlackboard: false,
                fetchBaseValueFromSourceEntity: false,
              },
            ],
          },
        },
        equivalentCost: null,
      },
      {
        type: 1,
        description: "Improves First Talent",
        buff: null,
        equivalentCost: null,
      },
      {
        type: 0,
        description: "DP Cost -1",
        buff: {
          attributes: {
            abnormalFlags: null,
            abnormalImmunes: null,
            abnormalAntis: null,
            abnormalCombos: null,
            abnormalComboImmunes: null,
            attributeModifiers: [
              {
                attributeType: 4,
                formulaItem: 0,
                value: -1,
                loadFromBlackboard: false,
                fetchBaseValueFromSourceEntity: false,
              },
            ],
          },
        },
        equivalentCost: null,
      },
    ],
    favorKeyFrames: [
      {
        level: 0,
        data: {
          maxHp: 0,
          atk: 0,
          def: 0,
          magicResistance: 0,
          cost: 0,
          blockCnt: 0,
          moveSpeed: 0,
          attackSpeed: 0,
          baseAttackTime: 0,
          respawnTime: 0,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 0,
          maxDeployCount: 0,
          maxDeckStackCnt: 0,
          tauntLevel: 0,
          massLevel: 0,
          baseForceLevel: 0,
          stunImmune: false,
          silenceImmune: false,
          sleepImmune: false,
        },
      },
      {
        level: 50,
        data: {
          maxHp: 500,
          atk: 0,
          def: 60,
          magicResistance: 0,
          cost: 0,
          blockCnt: 0,
          moveSpeed: 0,
          attackSpeed: 0,
          baseAttackTime: 0,
          respawnTime: 0,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 0,
          maxDeployCount: 0,
          maxDeckStackCnt: 0,
          tauntLevel: 0,
          massLevel: 0,
          baseForceLevel: 0,
          stunImmune: false,
          silenceImmune: false,
          sleepImmune: false,
        },
      },
    ],
    allSkillLvlup: [
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: [
          {
            id: "3301",
            count: 5,
            type: "MATERIAL",
          },
        ],
      },
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: [
          {
            id: "3301",
            count: 5,
            type: "MATERIAL",
          },
          {
            id: "30021",
            count: 5,
            type: "MATERIAL",
          },
          {
            id: "30051",
            count: 4,
            type: "MATERIAL",
          },
        ],
      },
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: [
          {
            id: "3302",
            count: 8,
            type: "MATERIAL",
          },
          {
            id: "30032",
            count: 5,
            type: "MATERIAL",
          },
        ],
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: [
          {
            id: "3302",
            count: 8,
            type: "MATERIAL",
          },
          {
            id: "30042",
            count: 4,
            type: "MATERIAL",
          },
          {
            id: "30022",
            count: 3,
            type: "MATERIAL",
          },
        ],
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: [
          {
            id: "3302",
            count: 8,
            type: "MATERIAL",
          },
          {
            id: "30053",
            count: 6,
            type: "MATERIAL",
          },
        ],
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: [
          {
            id: "3303",
            count: 8,
            type: "MATERIAL",
          },
          {
            id: "30063",
            count: 3,
            type: "MATERIAL",
          },
          {
            id: "31013",
            count: 4,
            type: "MATERIAL",
          },
        ],
      },
    ],
    charId: "char_311_mudrok",
    skillData: [
      {
        skillId: "skcom_def_up[3]",
        iconId: null,
        hidden: false,
        levels: [
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 45,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.3,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 45,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.35,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 45,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.4,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 40,
              initSp: 5,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.45,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 40,
              initSp: 5,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 40,
              initSp: 5,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.55,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 35,
              initSp: 10,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.6,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 34,
              initSp: 10,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.75,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 33,
              initSp: 10,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 0.9,
              },
            ],
            range: null,
          },
          {
            name: "DEF Up γ",
            rangeId: null,
            description: "DEF <@ba.vup>+{def:0%}</>",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 30,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skcom_def_up",
            duration: 40,
            blackboard: [
              {
                key: "def",
                value: 1,
              },
            ],
            range: null,
          },
        ],
      },
      {
        skillId: "skchr_mudrok_2",
        iconId: null,
        hidden: false,
        levels: [
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 6,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 1.7,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.4,
              },
              {
                key: "hp_ratio",
                value: 0.04,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 6,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 1.75,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.4,
              },
              {
                key: "hp_ratio",
                value: 0.04,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 6,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 1.8,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.4,
              },
              {
                key: "hp_ratio",
                value: 0.04,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 5,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 1.9,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.5,
              },
              {
                key: "hp_ratio",
                value: 0.04,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 5,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 1.95,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.5,
              },
              {
                key: "hp_ratio",
                value: 0.04,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 5,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 2,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.5,
              },
              {
                key: "hp_ratio",
                value: 0.04,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 5,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 2.1,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.6,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 4,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 2.3,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 0.8,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 4,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 2.5,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 1,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
          {
            name: "Crag Splitter",
            rangeId: "x-4",
            description:
              "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit's Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to <$ba.stun>Stun</> them for <@ba.vup>{stun}</> seconds",
            skillType: 2,
            spData: {
              spType: 4,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 4,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_mudrok_2",
            duration: 0,
            blackboard: [
              {
                key: "atk_scale",
                value: 2.7,
              },
              {
                key: "buff_prob",
                value: 0.3,
              },
              {
                key: "stun",
                value: 1.2,
              },
              {
                key: "hp_ratio",
                value: 0.06,
              },
            ],
            range: {
              id: "x-4",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
              ],
            },
          },
        ],
      },
      {
        skillId: "skchr_mudrok_3",
        iconId: null,
        hidden: false,
        levels: [
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 35,
              initSp: 10,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 0.7,
              },
              {
                key: "def",
                value: 0.3,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 34,
              initSp: 10,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 0.75,
              },
              {
                key: "def",
                value: 0.3,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 33,
              initSp: 10,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 0.8,
              },
              {
                key: "def",
                value: 0.3,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 32,
              initSp: 11,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 0.85,
              },
              {
                key: "def",
                value: 0.4,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 31,
              initSp: 11,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 0.9,
              },
              {
                key: "def",
                value: 0.4,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 30,
              initSp: 11,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 0.95,
              },
              {
                key: "def",
                value: 0.4,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 29,
              initSp: 12,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 1,
              },
              {
                key: "def",
                value: 0.5,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 3.5,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 28,
              initSp: 13,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 1.1,
              },
              {
                key: "def",
                value: 0.6,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 4,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 27,
              initSp: 14,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 1.2,
              },
              {
                key: "def",
                value: 0.7,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 4.5,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
          {
            name: "Bloodline of Desecrated Earth",
            rangeId: "x-1",
            description:
              "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, and reduces the Movement Speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock <$ba.stun>Stuns</> surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains <@ba.vup>reduced</> Attack Interval, ATK <@ba.vup>+{atk:0%}</>, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 25,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_mudrok_3",
            duration: 30,
            blackboard: [
              {
                key: "atk",
                value: 1.4,
              },
              {
                key: "def",
                value: 0.8,
              },
              {
                key: "move_speed",
                value: -0.6,
              },
              {
                key: "sleep",
                value: 10,
              },
              {
                key: "awake",
                value: 20,
              },
              {
                key: "base_attack_time",
                value: -0.3,
              },
              {
                key: "stun",
                value: 5,
              },
            ],
            range: {
              id: "x-1",
              direction: 1,
              grids: [
                {
                  row: 2,
                  col: 0,
                },
                {
                  row: 1,
                  col: -1,
                },
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 1,
                  col: 1,
                },
                {
                  row: 0,
                  col: -2,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: 0,
                  col: 2,
                },
                {
                  row: -1,
                  col: -1,
                },
                {
                  row: -1,
                  col: 0,
                },
                {
                  row: -1,
                  col: 1,
                },
                {
                  row: -2,
                  col: 0,
                },
              ],
            },
          },
        ],
      },
    ],
    cnName: "泥岩",
    subProfessionId: "unyield",
    isCnOnly: false,
    fileIndex: 183,
  } as unknown as CharacterObject,
};

export const Freeling = Template.bind({});
Freeling.args = {
  characterObject: {
    name: "'Freeling'",
    description: "Deals <@ba.kw>Arts damage</>",
    canUseGeneralPotentialItem: true,
    potentialItemId: "",
    nationId: null,
    groupId: null,
    teamId: null,
    displayNumber: null,
    tokenKey: null,
    appellation: " ",
    position: "MELEE",
    tagList: null,
    itemUsage: null,
    itemDesc: null,
    itemObtainApproach: null,
    isNotObtainable: false,
    isSpChar: false,
    maxPotentialLevel: 0,
    rarity: 5,
    profession: "TOKEN",
    trait: null,
    phases: [
      {
        characterPrefabKey: "token_10015_dusk_drgn",
        rangeId: "x-5",
        maxLevel: 50,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 1997,
              atk: 398,
              def: 302,
              magicResistance: 50,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.9,
              respawnTime: 10,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
          {
            level: 50,
            data: {
              maxHp: 1997,
              atk: 398,
              def: 302,
              magicResistance: 50,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.9,
              respawnTime: 10,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
        ],
        evolveCost: null,
        range: {
          id: "x-5",
          direction: 1,
          grids: [
            {
              row: 1,
              col: 0,
            },
            {
              row: 0,
              col: -1,
            },
            {
              row: 0,
              col: 0,
            },
            {
              row: 0,
              col: 1,
            },
            {
              row: -1,
              col: 0,
            },
          ],
        },
      },
      {
        characterPrefabKey: "token_10015_dusk_drgn",
        rangeId: "x-5",
        maxLevel: 80,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 1997,
              atk: 398,
              def: 302,
              magicResistance: 50,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.9,
              respawnTime: 10,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
          {
            level: 80,
            data: {
              maxHp: 1997,
              atk: 398,
              def: 302,
              magicResistance: 50,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.9,
              respawnTime: 10,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
        ],
        evolveCost: null,
        range: {
          id: "x-5",
          direction: 1,
          grids: [
            {
              row: 1,
              col: 0,
            },
            {
              row: 0,
              col: -1,
            },
            {
              row: 0,
              col: 0,
            },
            {
              row: 0,
              col: 1,
            },
            {
              row: -1,
              col: 0,
            },
          ],
        },
      },
      {
        characterPrefabKey: "token_10015_dusk_drgn",
        rangeId: "x-5",
        maxLevel: 90,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 1997,
              atk: 398,
              def: 302,
              magicResistance: 50,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.9,
              respawnTime: 10,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
          {
            level: 90,
            data: {
              maxHp: 1997,
              atk: 398,
              def: 302,
              magicResistance: 50,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1.9,
              respawnTime: 10,
              hpRecoveryPerSec: 0,
              spRecoveryPerSec: 1,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
            },
          },
        ],
        evolveCost: null,
        range: {
          id: "x-5",
          direction: 1,
          grids: [
            {
              row: 1,
              col: 0,
            },
            {
              row: 0,
              col: -1,
            },
            {
              row: 0,
              col: 0,
            },
            {
              row: 0,
              col: 1,
            },
            {
              row: -1,
              col: 0,
            },
          ],
        },
      },
    ],
    skills: [
      {
        skillId: null,
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
        ],
        unlockCond: {
          phase: 0,
          level: 1,
        },
      },
      {
        skillId: null,
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
        ],
        unlockCond: {
          phase: 1,
          level: 1,
        },
      },
      {
        skillId: null,
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
        ],
        unlockCond: {
          phase: 2,
          level: 1,
        },
      },
    ],
    talents: [
      {
        candidates: [
          {
            unlockCondition: {
              phase: 2,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "1",
            name: null,
            description: "-",
            rangeId: "x-5",
            blackboard: [
              {
                key: "duration",
                value: 25,
              },
              {
                key: "atk",
                value: 0.02,
              },
              {
                key: "max_stack_cnt",
                value: 15,
              },
            ],
            range: {
              id: "x-5",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: 0,
                },
              ],
            },
          },
          {
            unlockCondition: {
              phase: 2,
              level: 1,
            },
            requiredPotentialRank: 4,
            prefabKey: "1",
            name: null,
            description: "-",
            rangeId: "x-5",
            blackboard: [
              {
                key: "duration",
                value: 25,
              },
              {
                key: "atk",
                value: 0.02,
              },
              {
                key: "max_stack_cnt",
                value: 18,
              },
            ],
            range: {
              id: "x-5",
              direction: 1,
              grids: [
                {
                  row: 1,
                  col: 0,
                },
                {
                  row: 0,
                  col: -1,
                },
                {
                  row: 0,
                  col: 0,
                },
                {
                  row: 0,
                  col: 1,
                },
                {
                  row: -1,
                  col: 0,
                },
              ],
            },
          },
        ],
      },
    ] as unknown as TalentObject[],
    potentialRanks: [],
    favorKeyFrames: [
      {
        level: 50,
        data: {
          maxHp: 0,
          atk: 0,
          def: 0,
          magicResistance: 0,
          cost: 0,
          blockCnt: 0,
          moveSpeed: 0,
          attackSpeed: 0,
          baseAttackTime: 0,
          respawnTime: 0,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 0,
          maxDeployCount: 0,
          maxDeckStackCnt: 0,
          tauntLevel: 0,
          massLevel: 0,
          baseForceLevel: 0,
          stunImmune: false,
          silenceImmune: false,
          sleepImmune: false,
        },
      },
    ],
    allSkillLvlup: [
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: null,
      },
    ],
    charId: "token_10015_dusk_drgn",
    skillData: [],
    cnName: '"小自在"',
    subProfessionId: "notchar1",
    isCnOnly: false,
    fileIndex: 209,
    operatorName: "Dusk",
  } as unknown as CharacterObject,
};

export const BlazingSun = Template.bind({});
BlazingSun.args = {
  characterObject: {
    charId: "token_10019_nearl2_sword",
    cnName: "“耀阳”",
    skillData: [],
    name: "'Blazing Sun'",
    description: "Blocks 2 enemies",
    canUseGeneralPotentialItem: true,
    potentialItemId: "",
    nationId: null,
    groupId: null,
    teamId: null,
    displayNumber: null,
    tokenKey: null,
    appellation: " ",
    position: "MELEE",
    tagList: null,
    itemUsage: null,
    itemDesc: null,
    itemObtainApproach: null,
    isNotObtainable: false,
    isSpChar: false,
    maxPotentialLevel: 0,
    rarity: 5,
    profession: "TOKEN",
    subProfessionId: "notchar1",
    trait: null,
    phases: [
      {
        characterPrefabKey: "token_10019_nearl2_sword",
        range: {
          id: "0-1",
          direction: 1,
          grids: [
            {
              row: 0,
              col: 0,
            },
          ],
        },
        maxLevel: 50,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 6000,
              atk: 10,
              def: 422,
              magicResistance: 20.0,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.0,
              respawnTime: 0,
              hpRecoveryPerSec: 0.0,
              spRecoveryPerSec: 1.0,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
              frozenImmune: false,
            },
          },
          {
            level: 50,
            data: {
              maxHp: 6000,
              atk: 10,
              def: 422,
              magicResistance: 20.0,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.0,
              respawnTime: 0,
              hpRecoveryPerSec: 0.0,
              spRecoveryPerSec: 1.0,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
              frozenImmune: false,
            },
          },
        ],
        evolveCost: null,
      },
      {
        characterPrefabKey: "token_10019_nearl2_sword",
        range: {
          id: "0-1",
          direction: 1,
          grids: [
            {
              row: 0,
              col: 0,
            },
          ],
        },
        maxLevel: 80,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 6000,
              atk: 10,
              def: 422,
              magicResistance: 20.0,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.0,
              respawnTime: 0,
              hpRecoveryPerSec: 0.0,
              spRecoveryPerSec: 1.0,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
              frozenImmune: false,
            },
          },
          {
            level: 80,
            data: {
              maxHp: 6000,
              atk: 10,
              def: 480,
              magicResistance: 20.0,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.0,
              respawnTime: 0,
              hpRecoveryPerSec: 0.0,
              spRecoveryPerSec: 1.0,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
              frozenImmune: false,
            },
          },
        ],
        evolveCost: null,
      },
      {
        characterPrefabKey: "token_10019_nearl2_sword",
        range: {
          id: "0-1",
          direction: 1,
          grids: [
            {
              row: 0,
              col: 0,
            },
          ],
        },
        maxLevel: 90,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 6000,
              atk: 10,
              def: 540,
              magicResistance: 20.0,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.0,
              respawnTime: 0,
              hpRecoveryPerSec: 0.0,
              spRecoveryPerSec: 1.0,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
              frozenImmune: false,
            },
          },
          {
            level: 90,
            data: {
              maxHp: 6000,
              atk: 10,
              def: 600,
              magicResistance: 20.0,
              cost: 0,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.0,
              respawnTime: 0,
              hpRecoveryPerSec: 0.0,
              spRecoveryPerSec: 1.0,
              maxDeployCount: 1,
              maxDeckStackCnt: 0,
              tauntLevel: 0,
              massLevel: 0,
              baseForceLevel: 0,
              stunImmune: false,
              silenceImmune: false,
              sleepImmune: false,
              frozenImmune: false,
            },
          },
        ],
        evolveCost: null,
      },
    ],
    skills: [
      {
        skillId: null,
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
        ],
        unlockCond: {
          phase: 0,
          level: 1,
        },
      },
      {
        skillId: null,
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
        ],
        unlockCond: {
          phase: 1,
          level: 1,
        },
      },
      {
        skillId: "sktok_nearl2_3",
        overridePrefabKey: null,
        overrideTokenKey: null,
        levelUpCostCond: [
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
          {
            unlockCond: {
              phase: 2,
              level: 1,
            },
            lvlUpTime: 0,
            levelUpCost: null,
          },
        ],
        unlockCond: {
          phase: 2,
          level: 1,
        },
      },
    ],
    talents: [
      {
        candidates: [
          {
            unlockCondition: {
              phase: 2,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "1",
            name: "",
            description: "-",
            range: null,
            blackboard: [],
          },
        ],
      },
    ],
    potentialRanks: [],
    favorKeyFrames: [
      {
        level: 0,
        data: {
          maxHp: 0,
          atk: 0,
          def: 0,
          magicResistance: 0.0,
          cost: 0,
          blockCnt: 0,
          moveSpeed: 0.0,
          attackSpeed: 0.0,
          baseAttackTime: 0.0,
          respawnTime: 0,
          hpRecoveryPerSec: 0.0,
          spRecoveryPerSec: 0.0,
          maxDeployCount: 0,
          maxDeckStackCnt: 0,
          tauntLevel: 0,
          massLevel: 0,
          baseForceLevel: 0,
          stunImmune: false,
          silenceImmune: false,
          sleepImmune: false,
          frozenImmune: false,
        },
      },
      {
        level: 50,
        data: {
          maxHp: 0,
          atk: 0,
          def: 0,
          magicResistance: 0.0,
          cost: 0,
          blockCnt: 0,
          moveSpeed: 0.0,
          attackSpeed: 0.0,
          baseAttackTime: 0.0,
          respawnTime: 0,
          hpRecoveryPerSec: 0.0,
          spRecoveryPerSec: 0.0,
          maxDeployCount: 0,
          maxDeckStackCnt: 0,
          tauntLevel: 0,
          massLevel: 0,
          baseForceLevel: 0,
          stunImmune: false,
          silenceImmune: false,
          sleepImmune: false,
          frozenImmune: false,
        },
      },
    ],
    allSkillLvlup: [
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 0,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: null,
      },
      {
        unlockCond: {
          phase: 1,
          level: 1,
        },
        lvlUpCost: null,
      },
    ],
  },
};
