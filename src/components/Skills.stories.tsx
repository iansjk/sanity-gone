import { Story, Meta } from "@storybook/react";
import Skills, { SkillsProps } from "./Skills";

export default {
  title: "Skills",
  component: Skills,
} as Meta;

const Template: Story<SkillsProps> = (args) => <Skills {...args} />;

export const Default = Template.bind({});
Default.args = {
  analyses: [
    `
      <p>Her first skill is <b>Defense Strengthening Type γ</b>. It’s nothing except a generic DEF stat buff.</p>
      <SkillInfo></SkillInfo>
      <p>It’s not worth caring about, but if you want to use Mudrock as a normal defender for some reason, it does have good uptime and makes her pretty tanky.</p>
    `,
    `
      <p>Her second skill is <b>Rockfall Hammer</b>, and is a simple auto-activation skill with defensive recovery.</p>
      <SkillInfo></SkillInfo>
      <p>The skill has quite a bit to it, and the numbers and range on it are great, making it an easy go-to for general usage. It is most effective against hordes of smaller enemies that will be hitting her often. With this skill Mudrock can easily sustain herself while also clearing enemies. While not as effective against slower attacking enemies, it can still work as long as the pressure on Mudrock is not too much. It’s a simple and effective skill that turns Mudrock into a meat grinder.</p>
    `,
    `
      <p>Her third skill is <b>Bloodline of Impure Soil</b>, and it’s potentially her most powerful skill due to its offensive and defensive capabilities. That is alongside a very forgiving skill rotation that synergizes well with the rest of her kit.</p>
      <SkillInfo></SkillInfo>
      <p>This skill can work purely for DPS by preparing against oncoming enemies and dishing out damage to them before they can do much thanks to its high damage output against multiple targets. It can also be used defensively, as the 10 seconds of invulnerability guarantees that Mudrock will regenerate her shield at least once, and the stun will buy time to continue regenerating yet another layer. It can be crucial to allow her to survive taking large amounts of pressure as she cannot be normally burst healed by medics.You can easily set up to catch any enemies that may get past her by just placing someone behind her. It’s a versatile and very powerful skill with low SP cost that allows it to be used a lot as necessary in a multitude of ways.</p>
      <p>The first 10 seconds of the skill are one of people’s biggest worries with the skill when using it, as enemies can make it past her. Don’t think too much about it, as all you need to know is that a majority of enemies will not make it past her if you simply use it a little bit ahead of time. Detailed information regarding this can be found further down below, under <b>Detailed Analysis</b>.</p>
    `,
  ],
  skillObjects: [
    {
      skillId: "skcom_def_up[3]",
      iconId: null,
      hidden: false,
      levels: [
        {
          name: "DEF Up γ",
          range: null,
          description: "DEF <@ba.vup>+{def:0%}</>",
          skillType: 1,
          spData: {
            spType: 1,
            levelUpCost: null,
            maxChargeTime: 1,
            spCost: 30,
            initSp: 15,
            increment: 1.0,
          },
          prefabId: "skcom_def_up",
          duration: 40.0,
          blackboard: [
            {
              key: "def",
              value: 1.0,
            },
          ],
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
          description:
            "The next attack restores <@ba.vup>{hp_ratio:0%}</> of this unit’s Max HP and deals <@ba.vup>{atk_scale:0%}</> ATK as Physical damage to all surrounding ground enemies, with a <@ba.vup>{buff_prob:0%}</> chance to stun affected targets for <@ba.vup>{stun}</> second(s)",
          skillType: 2,
          spData: {
            spType: 4,
            levelUpCost: null,
            maxChargeTime: 1,
            spCost: 4,
            initSp: 0,
            increment: 1.0,
          },
          prefabId: "skchr_mudrok_2",
          duration: 0.0,
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
  ],
};
