import { Meta, Story } from "@storybook/react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import CardWithTabs, { CardWithTabsProps } from "./CardWithTabs";
import MasteryRecommendation from "./MasteryRecommendation";
import SkillInfo from "./SkillInfo";
import TalentInfo from "./TalentInfo";

export default {
  title: "Cards/CardWithTabs",
  component: CardWithTabs,
} as Meta;

const isSkillRecommended = [false, true, true];
const skillObjects = [
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
];
const talentObjects = [
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
        range: null,
        blackboard: [
          {
            key: "damage_resistance",
            value: 0.3,
          },
        ],
      },
    ],
  },
];

const skillAnalyses = await Promise.all(
  [
    `<SkillInfo />\n\nThe skill has high uptime and consistency, while giving Mudrock an even beefier DEF stat, but it’s not worth caring about. Mudrock is already tanky enough against even some of the most dangerous enemies in the game with her raw stats and shield talent alone. Meanwhile, both her other skills provide strong offensive capabilities on top of giving more survivability and options against different enemies. This skill is generic and unremarkable in every way.\n\n<MasteryRecommendation level="no">\nFor the reasons stated above, the skill at its core is simply worse than Mudrock’s other skills. There’s no reason to really use it over the others and mastering it is nothing but a waste of resources.\n</MasteryRecommendation>`,
    `<SkillInfo />\n\nThe skill is very simple and consistent, making it an easy go-to skill for a lot of people. It also has strong synergistic potential with other operators that help serve as SP batteries. It is most effective against hordes of smaller enemies that will be hitting Mudrock often. With this skill she can easily sustain herself and clear waves of enemies. While less effective against slower attacking enemies, it can still work as long as the pressure on Mudrock is not too extreme. It’s a simple and effective skill that turns Mudrock into a meat grinder.\n\n<MasteryRecommendation level="1" priority="High">\nThe skill has a very important SP cost reduction with its first mastery. While the increased damage and stun duration are nice, the SP cost reduction is the most important. It only decreases with the first mastery, meaning this skill will be almost at its full potential at a very low cost. While the rest of the masteries are not bad, they are not going to make anywhere close to the impact of the first one and end up being a luxury.\n</MasteryRecommendation>`,
    `<SkillInfo />\n\nThis skill is very versatile, with great offensive *and* defensive capabilities. It can be used offensively to deal high multi-target damage, or defensively to give Mudrock invulnerability for 10 seconds, allowing her to regenerate at least one shield layer. The stun buys Mudrock additional time to further regenerate her shield while allowing her to safely land a few hits on the enemies. It can be crucial in ensuring her survival when under heavy pressure. This skill's versatility and ease of use makes it very powerful in the right hands.\n\nThe first 10 seconds of the skill where she cannot block enemies might seem like a big drawback at first glance. However, this is actually not much of an issue, because she also slows the enemies, making it so that most of them won't make it past her as long as the skill is activated a little bit ahead of time. Other operators can also be used in conjunction to ensure that even the fastest enemies will struggle to make it past.\n\n<MasteryRecommendation level="3" priority="High">\nThis skill is Mudrock’s most powerful, so mastering it is a no-brainer. The improved stat boosts, CD reduction, and increased stun duration are strong upgrades all around. The mastery turns this already great skill into an even better one, making it an easy recommendation for anyone.\n</MasteryRecommendation>`,
  ].map((md) => serialize(md))
);
const talentAnalyses = await Promise.all(
  [
    `<TalentInfo />\n\nOne of the most important parts of Mudrock’s kit, giving her great survivability and being her main source of self-sustain. It constantly regenerates over time, meaning she has great defensive capability against slower, hard hitting enemies. These two aspects combined make Mudrock incredibly tanky on top of her already high HP and DEF stats.\n\nIts caveat, however, is that any instance of damage taken will break the shield, even if it’s extremely low. Be careful not to have the layers be wasted by weak, fast-hitting enemies or DoT effects when you need it to block damage from a heavy hitter.`,
    `<TalentInfo />\n\nIt’s a pretty simple talent that has a strong effect when it’s active. Straight up damage reduction from any Sarkaz enemy is very noticeable, as there is no shortage of hard-hitting Sarkaz enemies to be wary of. They’re a common race you’ll fight against in both story and events, which means this talent will probably stay relevant in future content.`,
  ].map((md) => serialize(md))
);

const Template: Story<CardWithTabsProps> = (args) => <CardWithTabs {...args} />;

export const Skills = Template.bind({});
Skills.args = {
  header: "Skills",
  buttonLabelFn: (i) => `skill ${i + 1}`,
  panelContent: skillAnalyses.map((mdxSource, i) => (
    <MDXRemote
      key={i}
      {...mdxSource}
      components={{
        SkillInfo: () => (
          <SkillInfo
            isRecommended={isSkillRecommended[i]}
            skillObject={skillObjects[i]}
          />
        ),
        MasteryRecommendation,
      }}
    />
  )),
};

export const Talents = Template.bind({});
Talents.args = {
  header: "Talents",
  buttonLabelFn: (i) => `talent ${i + 1}`,
  panelContent: talentAnalyses.map((mdxSource, i) => (
    <MDXRemote
      key={i}
      {...mdxSource}
      components={{
        TalentInfo: () => <TalentInfo talentObject={talentObjects[i]} />,
      }}
    />
  )),
};
