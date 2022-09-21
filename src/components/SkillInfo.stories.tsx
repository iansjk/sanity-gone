import { Story, Meta } from "@storybook/react";
import SkillInfo, { SkillInfoProps } from "./SkillInfo";

export default {
  title: "Skills/SkillInfo",
  component: SkillInfo,
} as Meta;

const Template: Story<SkillInfoProps> = (args) => <SkillInfo {...args} />;

export const BibeakS1 = Template.bind({});
BibeakS1.args = {
  skillObject: {
    skillId: "skchr_bibeak_1",
    iconId: null,
    hidden: false,
    levels: [
      {
        name: "Plumage Pins",
        range: null,
        description:
          "The next attack deals <@ba.vup>{atk_scale:0%}</> damage, and deals <@ba.vup>{ranged@atk_scale:0%}</> Arts damage to an additional target within range.",
        skillType: 2,
        spData: {
          spType: 2,
          levelUpCost: null,
          maxChargeTime: 1,
          spCost: 5,
          initSp: 0,
          increment: 1.0,
        },
        prefabId: "skchr_bibeak_1",
        duration: 0.0,
        blackboard: [
          {
            key: "atk_scale",
            value: 1.2,
          },
          {
            key: "ranged@atk_scale",
            value: 1.2,
          },
        ],
      },
    ],
  },
};

export const MudrockS3 = Template.bind({});
MudrockS3.args = {
  skillObject: {
    skillId: "skchr_mudrok_3",
    iconId: null,
    hidden: false,
    levels: [
      {
        name: "Bloodline of Desecrated Earth",
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
        description:
          "Upon skill activation, Mudrock stops attacking and does not take damage for <@ba.vup>{sleep}</> seconds, reducing the movement speed of surrounding enemies by <@ba.vup>-{-move_speed:0%}</>; After this state ends, Mudrock stuns surrounding ground enemies for <@ba.vup>{stun}</> seconds and gains ATK <@ba.vup>+{atk:0%}</>, <@ba.vup>reduced</> attack interval, DEF <@ba.vup>+{def:0%}</>, and the ability to attack all blocked enemies",
        skillType: 1,
        spData: {
          spType: 1,
          levelUpCost: null,
          maxChargeTime: 1,
          spCost: 25,
          initSp: 15,
          increment: 1.0,
        },
        prefabId: "skchr_mudrok_3",
        duration: 30.0,
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
            value: 10.0,
          },
          {
            key: "awake",
            value: 20.0,
          },
          {
            key: "base_attack_time",
            value: -0.3,
          },
          {
            key: "stun",
            value: 5.0,
          },
        ],
      },
    ],
  },
};

export const BrocaS2 = Template.bind({});
BrocaS2.args = {
  skillObject: {
    skillId: "skchr_broca_2",
    iconId: null,
    hidden: false,
    levels: [
      {
        name: "High-Voltage Current",
        range: {
          id: "3-2",
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
            {
              row: 0,
              col: 2,
            },
            {
              row: 0,
              col: 3,
            },
          ],
        },
        description:
          "Attack Interval <@ba.vdown>increases</>, Attack Range <@ba.vup>increases</>, ATK <@ba.vup>+{atk:0%}</>, normal attacks deal <@ba.vup>Arts</> damage and slow targets for <@ba.vup>{attack@sluggish:0.0}</> seconds\n<@ba.rem>This unit is stunned for {stun} seconds after this skill ends</>",
        skillType: 1,
        spData: {
          spType: 1,
          levelUpCost: null,
          maxChargeTime: 1,
          spCost: 35,
          initSp: 20,
          increment: 1.0,
        },
        prefabId: "skchr_broca_2",
        duration: 25.0,
        blackboard: [
          {
            key: "atk",
            value: 1.9,
          },
          {
            key: "attack@sluggish",
            value: 1.0,
          },
          {
            key: "base_attack_time",
            value: 0.65,
          },
          {
            key: "stun",
            value: 5.0,
          },
        ],
      },
    ],
  },
};

export const AnselS1 = Template.bind({});
AnselS1.args = {
  skillObject: {
    skillId: "skcom_range_extend",
    iconId: null,
    hidden: false,
    levels: [
      {
        name: "Healing Range Up",
        range: null,
        description:
          "Range <@ba.vup>+{ABILITY_RANGE_FORWARD_EXTEND} tiles</>; ATK <@ba.vup>+{atk:0%}</>",
        skillType: 1,
        spData: {
          spType: 1,
          levelUpCost: null,
          maxChargeTime: 1,
          spCost: 45,
          initSp: 10,
          increment: 1,
        },
        prefabId: "skcom_range_extend",
        duration: 19.0,
        blackboard: [
          {
            key: "atk",
            value: 0.05,
          },
          {
            key: "ability_range_forward_extend",
            value: 1,
          },
        ],
      },
      {
        name: "Healing Range Up",
        range: null,
        description:
          "Range <@ba.vup>+{ABILITY_RANGE_FORWARD_EXTEND} tiles</>; ATK <@ba.vup>+{atk:0%}</>",
        skillType: 1,
        spData: {
          spType: 1,
          levelUpCost: null,
          maxChargeTime: 1,
          spCost: 35,
          initSp: 10,
          increment: 1,
        },
        prefabId: "skcom_range_extend",
        duration: 25.0,
        blackboard: [
          {
            key: "atk",
            value: 0.4,
          },
          {
            key: "ability_range_forward_extend",
            value: 2,
          },
        ],
      },
    ],
  },
  defaultRange: {
    id: "3-3",
    direction: 1,
    grids: [
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
        row: 1,
        col: 3,
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
      {
        row: -1,
        col: 3,
      },
    ],
  },
};
