import { Meta, Story } from "@storybook/react";
import React from "react";
import CardWithTabs, { CardWithTabsProps } from "./CardWithTabs";
import SkillInfo from "./SkillInfo";
import TalentInfo from "./TalentInfo";

export default {
  title: "Cards/CardWithTabs",
  component: CardWithTabs,
} as Meta;

const Template: Story<CardWithTabsProps> = (args) => <CardWithTabs {...args} />;

export const Skills = Template.bind({});
Skills.args = {
  header: "Skills",
  buttonLabelFn: (i) => `skill ${i + 1}`,
  panelContent: [
    [
      <p key="1">
        Her first skill is <b>Defense Strengthening Type γ</b>. It’s nothing
        except a generic DEF stat buff.
      </p>,
      <SkillInfo
        key="2"
        skillObject={{
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
        }}
      />,
      <p key="3">
        It’s not worth caring about, but if you want to use Mudrock as a normal
        defender for some reason, it does have good uptime and makes her pretty
        tanky.
      </p>,
    ],
    [
      <p key="4">
        Her second skill is <b>Rockfall Hammer</b>, and is a simple
        auto-activation skill with defensive recovery.
      </p>,
      <SkillInfo
        key="5"
        skillObject={{
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
        }}
      />,
      <p key="6">
        The skill has quite a bit to it, and the numbers and range on it are
        great, making it an easy go-to for general usage. It is most effective
        against hordes of smaller enemies that will be hitting her often. With
        this skill Mudrock can easily sustain herself while also clearing
        enemies. While not as effective against slower attacking enemies, it can
        still work as long as the pressure on Mudrock is not too much. It’s a
        simple and effective skill that turns Mudrock into a meat grinder.
      </p>,
    ],
    [
      <p key="7">
        Her third skill is <b>Bloodline of Impure Soil</b>, and it’s potentially
        her most powerful skill due to its offensive and defensive capabilities.
        That is alongside a very forgiving skill rotation that synergizes well
        with the rest of her kit.
      </p>,
      <SkillInfo
        key="8"
        skillObject={{
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
        }}
      />,
      <p key="9">
        This skill can work purely for DPS by preparing against oncoming enemies
        and dishing out damage to them before they can do much thanks to its
        high damage output against multiple targets. It can also be used
        defensively, as the 10 seconds of invulnerability guarantees that
        Mudrock will regenerate her shield at least once, and the stun will buy
        time to continue regenerating yet another layer. It can be crucial to
        allow her to survive taking large amounts of pressure as she cannot be
        normally burst healed by medics.You can easily set up to catch any
        enemies that may get past her by just placing someone behind her. It’s a
        versatile and very powerful skill with low SP cost that allows it to be
        used a lot as necessary in a multitude of ways.
      </p>,
      <p key="10">
        The first 10 seconds of the skill are one of people’s biggest worries
        with the skill when using it, as enemies can make it past her. Don’t
        think too much about it, as all you need to know is that a majority of
        enemies will not make it past her if you simply use it a little bit
        ahead of time. Detailed information regarding this can be found further
        down below, under <b>Detailed Analysis</b>.
      </p>,
    ],
  ],
};

export const Talents = Template.bind({});
Talents.args = {
  header: "Talents",
  buttonLabelFn: (i) => `talent ${i + 1}`,
  panelContent: [
    [
      <p key="1">
        Her first talent, <b>Boon of Earth</b>, is a core part of her kit, being
        one of the most important ones to play around in some content.
      </p>,
      <TalentInfo
        key="2"
        talentObject={{
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
                "Every 9 seconds, gains one shield stack (Each stack can block 1 instance of damage; Can have up to 2 stacks, with 1 stack granted immediately when deployed); When a shield is broken, restores 15% of Max HP",
              range: null,
              blackboard: [
                {
                  key: "interval",
                  value: 9.0,
                },
                {
                  key: "times",
                  value: 1.0,
                },
                {
                  key: "max_times",
                  value: 2.0,
                },
                {
                  key: "hp_ratio",
                  value: 0.15,
                },
              ],
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
                "Every 9 seconds, gains one shield stack (Each stack can block 1 instance of damage; Can have up to 2 stacks, with 1 stack granted immediately when deployed); When a shield is broken, restores 17% <@ba.talpu>(+2%)</> of Max HP",
              range: null,
              blackboard: [
                {
                  key: "interval",
                  value: 9.0,
                },
                {
                  key: "times",
                  value: 1.0,
                },
                {
                  key: "max_times",
                  value: 2.0,
                },
                {
                  key: "hp_ratio",
                  value: 0.17,
                },
              ],
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
                "Every 9 seconds, gains one shield stack (Each stack can block 1 instance of damage; Can have up to 2 stacks, with 1 stack granted immediately when deployed); When a shield is broken, restores 20% of Max HP",
              range: null,
              blackboard: [
                {
                  key: "interval",
                  value: 9.0,
                },
                {
                  key: "times",
                  value: 1.0,
                },
                {
                  key: "max_times",
                  value: 2.0,
                },
                {
                  key: "hp_ratio",
                  value: 0.2,
                },
              ],
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
                "Every 9 seconds, gains one shield stack (Each stack can block 1 instance of damage; Can have up to 2 stacks, with 1 stack granted immediately when deployed); When a shield is broken, restores 22% <@ba.talpu>(+2%)</> of Max HP",
              range: null,
              blackboard: [
                {
                  key: "interval",
                  value: 9.0,
                },
                {
                  key: "times",
                  value: 1.0,
                },
                {
                  key: "max_times",
                  value: 2.0,
                },
                {
                  key: "hp_ratio",
                  value: 0.22,
                },
              ],
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
                "Every 9 seconds, gains one shield stack (Each stack can block 1 instance of damage; Can have up to 3 stacks, with 1 stack granted immediately when deployed); When a shield is broken, restores 20% of Max HP",
              range: null,
              blackboard: [
                {
                  key: "interval",
                  value: 9.0,
                },
                {
                  key: "times",
                  value: 1.0,
                },
                {
                  key: "max_times",
                  value: 3.0,
                },
                {
                  key: "hp_ratio",
                  value: 0.2,
                },
              ],
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
                "Every 9 seconds, gains one shield stack (Each stack can block 1 instance of damage; Can have up to 3 stacks, with 1 stack granted immediately when deployed); When a shield is broken, restores 22% <@ba.talpu>(+2%)</> of Max HP",
              range: null,
              blackboard: [
                {
                  key: "interval",
                  value: 9.0,
                },
                {
                  key: "times",
                  value: 1.0,
                },
                {
                  key: "max_times",
                  value: 3.0,
                },
                {
                  key: "hp_ratio",
                  value: 0.22,
                },
              ],
            },
          ],
        }}
      />,
      <p key="3">
        Mudrock gains one layer of her shield every 9 seconds, up to 3 layers at
        E2, and she always gains one layer upon deployment. Said shield will
        block one instance of damage dealt to Mudrock, using up a layer and
        healing her for 20% (+2% from P5) of her Max HP. This heal is her main
        form of sustain, and also helps her take pressure from slow hard-hitting
        enemies with the regenerating layers blocking damage. The shield has a
        different effect based on how many layers she currently has, as seen
        below:
      </p>,
    ],
    [
      <p key="4">
        Her second talent, <b>Brotherhood</b>, is a very powerful talent when it
        takes effect.
      </p>,
      <TalentInfo
        key="5"
        talentObject={{
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
              range: null,
              blackboard: [
                {
                  key: "damage_resistance",
                  value: 0.3,
                },
              ],
            },
          ],
        }}
      />,
      <p key="6">
        It’s pretty simple, it reduces all incoming damage from Sarkaz enemies
        by 30%, it doesn’t need much explanation. It’s very effective when
        fighting against Sarkaz enemies (which are thankfully not too uncommon),
        doesn’t matter outside of that.
      </p>,
    ],
  ],
};
