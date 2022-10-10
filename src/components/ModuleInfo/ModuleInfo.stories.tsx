import { Story, Meta } from "@storybook/react";
import ModuleInfo, { ModuleInfoProps } from "./ModuleInfo";

export default {
  title: "ModuleInfo",
  component: ModuleInfo,
} as Meta;

const Template: Story<ModuleInfoProps> = (args) => <ModuleInfo {...args} />;

export const MagallanModule1With2Attributes = Template.bind({});
MagallanModule1With2Attributes.args = {
  operatorName: "Magallan",
  module: {
    moduleId: "uniequip_002_mgllan",
    moduleIcon: "sum-x",
    moduleName: "Drone Control Module.P",
    phases: [
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 100,
              },
              {
                key: "atk",
                value: 30,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect: null,
            talentIndex: -1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 130,
              },
              {
                key: "atk",
                value: 40,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 23 seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 130,
              },
              {
                key: "atk",
                value: 40,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 4,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 25<span class="potential">（+2）</span> seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 150,
              },
              {
                key: "atk",
                value: 50,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 26 seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 150,
              },
              {
                key: "atk",
                value: 50,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 4,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 28<span class="potential">（+2）</span> seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
        ],
      },
    ],
  },
};

export const BlemishineModule1With3Attributes = Template.bind({});
BlemishineModule1With3Attributes.args = {
  operatorName: "Blemishine",
  module: {
    moduleId: "uniequip_002_blemsh",
    moduleIcon: "gua-y",
    moduleName: "Echo of Craftsman's Guild",
    phases: [
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 160,
              },
              {
                key: "atk",
                value: 35,
              },
              {
                key: "def",
                value: 35,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect: null,
            talentIndex: -1,
            traitEffect:
              'Damage taken is reduced by <span class="keyword">15%</span>',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 210,
              },
              {
                key: "atk",
                value: 43,
              },
              {
                key: "def",
                value: 43,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              "When deployed, allies that have a Defensive Recovery skill also gain 1 SP when attacking. When a 'Kazimierz' operator is deployed, gain 2 SP",
            talentIndex: 0,
            traitEffect:
              'Damage taken is reduced by <span class="keyword">15%</span>',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 270,
              },
              {
                key: "atk",
                value: 50,
              },
              {
                key: "def",
                value: 50,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              "When deployed, allies that have a Defensive Recovery skill also gain 1 SP when attacking. When a 'Kazimierz' operator is deployed, gain 3 SP",
            talentIndex: 0,
            traitEffect:
              'Damage taken is reduced by <span class="keyword">15%</span>',
            traitEffectType: "update",
          },
        ],
      },
    ],
  },
};

export const NightingaleModule1AtLevel1WithRangeAndNoTalent = Template.bind({});
NightingaleModule1AtLevel1WithRangeAndNoTalent.args = {
  operatorName: "Nightingale",
  module: {
    moduleId: "uniequip_002_cgbird",
    moduleIcon: "rin-x",
    moduleName: "'Closed Hope'",
    phases: [
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 40,
              },
              {
                key: "magic_resistance",
                value: 5,
              },
            ],
            displayRange: true,
            range: {
              id: "y-3",
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
                  row: 1,
                  col: 2,
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
                  row: 0,
                  col: 3,
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
                  row: -1,
                  col: 2,
                },
              ],
            },
            requiredPotentialRank: 0,
            talentEffect: null,
            talentIndex: -1,
            traitEffect: 'Attack Range <span class="keyword">expands</span>',
            traitEffectType: "update",
          },
        ],
      },
    ],
  },
};

export const NightingaleModule1WithRange = Template.bind({});
NightingaleModule1WithRange.args = {
  operatorName: "Nightingale",
  module: {
    moduleId: "uniequip_002_cgbird",
    moduleIcon: "rin-x",
    moduleName: "'Closed Hope'",
    phases: [
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 40,
              },
              {
                key: "magic_resistance",
                value: 5,
              },
            ],
            displayRange: true,
            range: {
              id: "y-3",
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
                  row: 1,
                  col: 2,
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
                  row: 0,
                  col: 3,
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
                  row: -1,
                  col: 2,
                },
              ],
            },
            requiredPotentialRank: 0,
            talentEffect: null,
            talentIndex: -1,
            traitEffect: 'Attack Range <span class="keyword">expands</span>',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 55,
              },
              {
                key: "magic_resistance",
                value: 5,
              },
            ],
            displayRange: true,
            range: {
              id: "y-3",
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
                  row: 1,
                  col: 2,
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
                  row: 0,
                  col: 3,
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
                  row: -1,
                  col: 2,
                },
              ],
            },
            requiredPotentialRank: 0,
            talentEffect:
              "攻击范围内的友方单位法术抗性+15且受到的治疗效果提升3%",
            talentIndex: 0,
            traitEffect: '攻击范围<span class="keyword">扩大</span>',
            traitEffectType: "update",
          },
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 55,
              },
              {
                key: "magic_resistance",
                value: 5,
              },
            ],
            displayRange: true,
            range: {
              id: "y-3",
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
                  row: 1,
                  col: 2,
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
                  row: 0,
                  col: 3,
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
                  row: -1,
                  col: 2,
                },
              ],
            },
            requiredPotentialRank: 4,
            talentEffect:
              '攻击范围内的友方单位法术抗性+17<span class="potential">（+2）</span>且受到的治疗效果提升3%',
            talentIndex: 0,
            traitEffect: '攻击范围<span class="keyword">扩大</span>',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 65,
              },
              {
                key: "magic_resistance",
                value: 5,
              },
            ],
            displayRange: true,
            range: {
              id: "y-3",
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
                  row: 1,
                  col: 2,
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
                  row: 0,
                  col: 3,
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
                  row: -1,
                  col: 2,
                },
              ],
            },
            requiredPotentialRank: 0,
            talentEffect:
              "攻击范围内的友方单位法术抗性+15且受到的治疗效果提升5%",
            talentIndex: 0,
            traitEffect: '攻击范围<span class="keyword">扩大</span>',
            traitEffectType: "update",
          },
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 65,
              },
              {
                key: "magic_resistance",
                value: 5,
              },
            ],
            displayRange: true,
            range: {
              id: "y-3",
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
                  row: 1,
                  col: 2,
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
                  row: 0,
                  col: 3,
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
                  row: -1,
                  col: 2,
                },
              ],
            },
            requiredPotentialRank: 4,
            talentEffect:
              '攻击范围内的友方单位法术抗性+17<span class="potential">（+2）</span>且受到的治疗效果提升5%',
            talentIndex: 0,
            traitEffect: '攻击范围<span class="keyword">扩大</span>',
            traitEffectType: "update",
          },
        ],
      },
    ],
  },
};
