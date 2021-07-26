import { Story, Meta } from "@storybook/react";
import SkillInfo, { SkillInfoProps, SkillLevelObject } from "./SkillInfo";

export default {
  title: "Skills/SkillInfo",
  component: SkillInfo,
} as Meta;

const Template: Story<SkillInfoProps> = (args) => <SkillInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  showcaseVideoUrl:
    "https://cdn.discordapp.com/attachments/648597683031900200/814340479247974430/cursed_right_side.mp4",
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
      } as SkillLevelObject,
    ],
  },
} as SkillInfoProps;
