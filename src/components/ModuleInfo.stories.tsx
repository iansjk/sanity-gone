import { Story, Meta } from "@storybook/react";
import ModuleInfo, { ModuleInfoProps } from "./ModuleInfo";

export default {
  title: "ModuleInfo",
  component: ModuleInfo,
} as Meta;

const Template: Story<ModuleInfoProps> = (args) => <ModuleInfo {...args} />;

export const Magallan = Template.bind({});
Magallan.args = {
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
