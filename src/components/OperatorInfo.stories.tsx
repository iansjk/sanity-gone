import { Meta, Story } from "@storybook/react";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

export default {
  title: "Introduction/OperatorInfo",
  component: OperatorInfo,
} as Meta;

const Template: Story<OperatorInfoProps> = (args) => <OperatorInfo {...args} />;
export const Mudrock = Template.bind({});
Mudrock.args = {
  isLimited: false,
  operatorObject: {
    name: "Mudrock",
    cnName: "泥岩",
    rarity: 5,
    description: "<@ba.kw>Cannot</> be healed by allies",
    position: "MELEE",
    profession: "TANK",
    subProfessionId: "unyield",
    phases: [
      {
        characterPrefabKey: "char_311_mudrok",
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
        maxLevel: 50,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 1677,
              atk: 370,
              def: 229,
              magicResistance: 10.0,
              cost: 32,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.6,
              respawnTime: 70,
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
            },
          },
          {
            level: 50,
            data: {
              maxHp: 2207,
              atk: 515,
              def: 347,
              magicResistance: 10.0,
              cost: 32,
              blockCnt: 2,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.6,
              respawnTime: 70,
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
            },
          },
        ],
      },
      {
        characterPrefabKey: "char_311_mudrok",
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
        maxLevel: 80,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 2207,
              atk: 515,
              def: 347,
              magicResistance: 10.0,
              cost: 34,
              blockCnt: 3,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.6,
              respawnTime: 70,
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
            },
          },
          {
            level: 80,
            data: {
              maxHp: 2867,
              atk: 687,
              def: 463,
              magicResistance: 10.0,
              cost: 34,
              blockCnt: 3,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.6,
              respawnTime: 70,
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
            },
          },
        ],
      },
      {
        characterPrefabKey: "char_311_mudrok",
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
        maxLevel: 90,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 2867,
              atk: 687,
              def: 463,
              magicResistance: 10.0,
              cost: 36,
              blockCnt: 3,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.6,
              respawnTime: 70,
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
            },
          },
          {
            level: 90,
            data: {
              maxHp: 3928,
              atk: 882,
              def: 602,
              magicResistance: 10.0,
              cost: 36,
              blockCnt: 3,
              moveSpeed: 1.0,
              attackSpeed: 100.0,
              baseAttackTime: 1.6,
              respawnTime: 70,
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
            },
          },
        ],
      },
    ],
  },
};

export const Skalter = Template.bind({});
Skalter.args = {
  isLimited: true,
  operatorObject: {
    name: "Skadi the Corrupting Heart",
    description:
      "不攻击，持续恢复范围内所有友军<@ba.kw>生命</>（每秒恢复相当于自身攻击力10%的生命），自身不受<$ba.inspire>鼓舞</>影响",
    canUseGeneralPotentialItem: true,
    potentialItemId: "p_char_1012_skadi2",
    nationId: "egir",
    groupId: null,
    teamId: null,
    displayNumber: "CR01",
    tokenKey: "token_10017_skadi2_dedant",
    appellation: "Skadi the Corrupting Heart",
    position: "RANGED",
    tagList: ["支援", "生存", "输出"],
    itemUsage: "浊心斯卡蒂，一位让你熟悉又陌生的访客。",
    itemDesc: "你愿意接纳它吗？",
    itemObtainApproach: "招募寻访",
    isNotObtainable: false,
    isSpChar: true,
    maxPotentialLevel: 5,
    rarity: 5,
    profession: "SUPPORT",
    subProfessionId: "bard",
    trait: {
      candidates: [
        {
          unlockCondition: {
            phase: 0,
            level: 1,
          },
          requiredPotentialRank: 0,
          blackboard: [
            {
              key: "attack@atk_to_hp_recovery_ratio",
              value: 0.1,
            },
          ],
          overrideDescripton:
            "不攻击，持续恢复范围内所有友军<@ba.kw>生命</>（每秒相当于自身攻击力<@ba.kw>{attack@atk_to_hp_recovery_ratio:0%}</>的生命），自身不受<$ba.inspire>鼓舞</>影响",
          prefabKey: "-1",
          rangeId: null,
        },
      ],
    },
    phases: [
      {
        characterPrefabKey: "char_1012_skadi2",
        rangeId: "x-4",
        maxLevel: 50,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 613,
              atk: 145,
              def: 93,
              magicResistance: 0,
              cost: 6,
              blockCnt: 1,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1,
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
              maxHp: 877,
              atk: 228,
              def: 139,
              magicResistance: 0,
              cost: 6,
              blockCnt: 1,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1,
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
        characterPrefabKey: "char_1012_skadi2",
        rangeId: "x-1",
        maxLevel: 80,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 877,
              atk: 228,
              def: 139,
              magicResistance: 0,
              cost: 8,
              blockCnt: 1,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1,
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
              maxHp: 1202,
              atk: 305,
              def: 186,
              magicResistance: 0,
              cost: 8,
              blockCnt: 1,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1,
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
            id: "3271",
            count: 5,
            type: "MATERIAL",
          },
          {
            id: "30032",
            count: 8,
            type: "MATERIAL",
          },
          {
            id: "30062",
            count: 3,
            type: "MATERIAL",
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
        characterPrefabKey: "char_1012_skadi2",
        rangeId: "x-1",
        maxLevel: 90,
        attributesKeyFrames: [
          {
            level: 1,
            data: {
              maxHp: 1202,
              atk: 305,
              def: 186,
              magicResistance: 0,
              cost: 8,
              blockCnt: 1,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1,
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
              maxHp: 1603,
              atk: 368,
              def: 233,
              magicResistance: 0,
              cost: 8,
              blockCnt: 1,
              moveSpeed: 1,
              attackSpeed: 100,
              baseAttackTime: 1,
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
            id: "3273",
            count: 4,
            type: "MATERIAL",
          },
          {
            id: "30115",
            count: 4,
            type: "MATERIAL",
          },
          {
            id: "30094",
            count: 5,
            type: "MATERIAL",
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
    skills: [
      {
        skillId: "skchr_skadi2_1",
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
                id: "30115",
                count: 6,
                type: "MATERIAL",
              },
              {
                id: "31014",
                count: 7,
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
        skillId: "skchr_skadi2_2",
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
                id: "30094",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30073",
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
            lvlUpTime: 57600,
            levelUpCost: [
              {
                id: "3303",
                count: 12,
                type: "MATERIAL",
              },
              {
                id: "31024",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30104",
                count: 8,
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
          phase: 1,
          level: 1,
        },
      },
      {
        skillId: "skchr_skadi2_3",
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
                id: "30014",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "30093",
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
            lvlUpTime: 57600,
            levelUpCost: [
              {
                id: "3303",
                count: 12,
                type: "MATERIAL",
              },
              {
                id: "30054",
                count: 4,
                type: "MATERIAL",
              },
              {
                id: "31014",
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
              phase: 1,
              level: 1,
            },
            requiredPotentialRank: 0,
            prefabKey: "1",
            name: "Ancient Kin",
            description:
              "Can summon a Seaborn that lasts for 15 seconds. The Seaborn's Attack Range is treated as an extension of Skadi's Attack Range",
            rangeId: null,
            blackboard: [
              {
                key: "cnt",
                value: 1,
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
            name: "Ancient Kin",
            description:
              "Can summon a Seaborn that lasts for 25 seconds. The Seaborn's Attack Range is treated as an extension of Skadi's Attack Range",
            rangeId: null,
            blackboard: [
              {
                key: "cnt",
                value: 1,
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
            name: "Predatory Habits",
            description:
              "If there are allies within Skadi or the Seaborn's Attack Range, self ATK +6%;</br></br>If the allies are [Abyssal Hunters] operators, self ATK +15% instead",
            rangeId: null,
            blackboard: [
              {
                key: "skadi2_t_2[atk][1].atk",
                value: 0.06,
              },
              {
                key: "skadi2_t_2[atk][2].atk",
                value: 0.15,
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
            prefabKey: "2",
            name: "Predatory Habits",
            description:
              "If there are allies within Skadi or the Seaborn's Attack Range, self ATK +9% (+3%);</br></br>If the allies are [Abyssal Hunters] operators, self ATK +18% (+3%) instead",
            rangeId: null,
            blackboard: [
              {
                key: "skadi2_t_2[atk][1].atk",
                value: 0.09,
              },
              {
                key: "skadi2_t_2[atk][2].atk",
                value: 0.18,
              },
            ],
            range: null,
          },
        ],
      },
    ],
    potentialRanks: [
      {
        type: 0,
        description: "部署费用-1",
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
        description: "再部署时间-6秒",
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
                value: -6,
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
        description: "攻击力+27",
        buff: {
          attributes: {
            abnormalFlags: null,
            abnormalImmunes: null,
            abnormalAntis: null,
            abnormalCombos: null,
            abnormalComboImmunes: null,
            attributeModifiers: [
              {
                attributeType: 1,
                formulaItem: 0,
                value: 27,
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
        description: "第二天赋效果增强",
        buff: null,
        equivalentCost: null,
      },
      {
        type: 0,
        description: "部署费用-1",
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
          maxHp: 0,
          atk: 50,
          def: 30,
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
            id: "30041",
            count: 5,
            type: "MATERIAL",
          },
          {
            id: "30021",
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
            id: "30052",
            count: 4,
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
            id: "30062",
            count: 3,
            type: "MATERIAL",
          },
          {
            id: "30032",
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
            id: "31013",
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
            id: "3303",
            count: 8,
            type: "MATERIAL",
          },
          {
            id: "31023",
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
    ],
    charId: "char_1012_skadi2",
    skillData: [
      {
        skillId: "skchr_skadi2_1",
        iconId: null,
        hidden: false,
        levels: [
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 60,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 0.8,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.4,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 59,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 0.9,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.4,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 58,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.4,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 57,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.1,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.5,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 56,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.2,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.5,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 55,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.3,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.5,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 54,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.4,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.6,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 53,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.5,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.7,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 52,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.6,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.7,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
          {
            name: "Chant of Returning by Varied Paths",
            rangeId: null,
            description:
              "Immediately recover all HP and gain Max HP <@ba.vup>+{max_hp:0%}</>. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. <@ba.vup>{damage_resistance:0%}</> of damage taken by all allies within Attack Range is transferred to Skadi (strongest effect takes precedence)",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 50,
              initSp: 30,
              increment: 1,
            },
            prefabId: "skchr_skadi2_1",
            duration: 30,
            blackboard: [
              {
                key: "max_hp",
                value: 1.7,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.8,
              },
              {
                key: "damage_resistance",
                value: 0.5,
              },
            ],
            range: null,
          },
        ],
      },
      {
        skillId: "skchr_skadi2_2",
        iconId: null,
        hidden: false,
        levels: [
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 68,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.15,
              },
              {
                key: "def",
                value: 0.15,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.15,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 68,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.2,
              },
              {
                key: "def",
                value: 0.2,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.15,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 68,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.25,
              },
              {
                key: "def",
                value: 0.25,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.15,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 66,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.3,
              },
              {
                key: "def",
                value: 0.3,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.16,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 66,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.35,
              },
              {
                key: "def",
                value: 0.35,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.16,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 66,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.4,
              },
              {
                key: "def",
                value: 0.4,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.16,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 64,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.45,
              },
              {
                key: "def",
                value: 0.45,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.17,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 61,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.5,
              },
              {
                key: "def",
                value: 0.5,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.18,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 59,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.55,
              },
              {
                key: "def",
                value: 0.55,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.19,
              },
            ],
            range: null,
          },
          {
            name: "Wish of Burial Beyond the Light",
            rangeId: null,
            description:
              "Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK and DEF to all allies within Attack Range. Increase Trait effect to <@ba.vup>{attack@atk_to_hp_recovery_ratio:0%}</>. </br></br><@ba.rem>Infinite duration</>",
            skillType: 2,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 56,
              initSp: 0,
              increment: 1,
            },
            prefabId: "skchr_skadi2_2",
            duration: -1,
            blackboard: [
              {
                key: "atk",
                value: 0.6,
              },
              {
                key: "def",
                value: 0.6,
              },
              {
                key: "attack@atk_to_hp_recovery_ratio",
                value: 0.2,
              },
            ],
            range: null,
          },
        ],
      },
      {
        skillId: "skchr_skadi2_3",
        iconId: null,
        hidden: false,
        levels: [
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 40,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.25,
              },
              {
                key: "atk",
                value: 0.5,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 40,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.3,
              },
              {
                key: "atk",
                value: 0.55,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 40,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.35,
              },
              {
                key: "atk",
                value: 0.6,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 39,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.4,
              },
              {
                key: "atk",
                value: 0.65,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 39,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.45,
              },
              {
                key: "atk",
                value: 0.7,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 39,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.5,
              },
              {
                key: "atk",
                value: 0.75,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 38,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.55,
              },
              {
                key: "atk",
                value: 0.8,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 37,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.6,
              },
              {
                key: "atk",
                value: 0.9,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 36,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.65,
              },
              {
                key: "atk",
                value: 1,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
          {
            name: "“The Tide Surges, The Tide Recedes”",
            rangeId: null,
            description:
              "Trait changes to losing <@ba.vdown>{hp_ratio:0%}</> self HP every second. Deal <@ba.vup>{atk_scale:0%}</> <@ba.vup>True damage</> to all enemies within Attack Range every second (damage from self and Seaborn stacks). Grant <$ba.inspire>Inspire</> effect equal to <@ba.vup>{atk:0%}</> of Skadi's ATK to all allies within Attack Range",
            skillType: 1,
            spData: {
              spType: 1,
              levelUpCost: null,
              maxChargeTime: 1,
              spCost: 35,
              initSp: 15,
              increment: 1,
            },
            prefabId: "skchr_skadi2_3",
            duration: 20,
            blackboard: [
              {
                key: "atk_scale",
                value: 0.7,
              },
              {
                key: "atk",
                value: 1.1,
              },
              {
                key: "hp_ratio",
                value: 0.05,
              },
            ],
            range: null,
          },
        ],
      },
    ],
    cnName: "浊心斯卡蒂",
    isCnOnly: true,
    fileIndex: 227,
  },
};
