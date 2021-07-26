import { Meta, Story } from "@storybook/react";
import Introduction, { IntroductionProps } from "./Introduction";
import OperatorStats, { OperatorStatsProps } from "./OperatorStats";

export default {
  title: "Introduction",
  component: Introduction,
} as Meta;

const Template: Story<
  IntroductionProps & { operatorStats: OperatorStatsProps }
> = (args) => (
  <Introduction {...args}>
    <p>
      Mudrock is a powerful <b>self-sustaining defender</b> packing both
      offensive and defensive power. She has a high upfront DP cost, but makes
      up for it with high overall stats and a kit that helps her take pressure
      and sustain herself. Most notably, she has high Max HP and ATK stats
      compared to the rest of the defender class, HP being especially important
      since all of her self-heals scale off of max HP.
    </p>
    <OperatorStats {...args.operatorStats} />
    <p>
      Her kit is adaptable to fit different situations. Whether it be a constant
      onslaught of enemies or spaced out hard-hitters, you can bring a different
      skill to deal with them without much need of outside help. Mudrock can be
      effectively used both as a major damage dealer or tank, being a powerhouse
      in a lot of difficult content to date, and when used properly can be
      nigh-invulnerable against some of the toughest enemies.
    </p>
    <p>
      Her <b>archetype trait</b> is that she{" "}
      <em>cannot be directly healed by others</em>. This does not mean that she
      cannot be healed at all however, as “regeneration” type heals will still
      work just fine; same as any other operator with a similar trait.
    </p>
  </Introduction>
);

export const Default = Template.bind({});
Default.args = {
  operatorEntry: {
    name: "泥岩",
    appellation: "Mudrock",
    profession: "TANK",
    rarity: 5,
  },
  authorDiscordTag: "nikoleye#5580",
  operatorStats: {
    damageType: "Physical",
    position: "Melee",
    health: 4428,
    attackPower: 882,
    defense: 602,
    attacksPerSecond: 1.6,
    artsResistance: 10,
    blockCount: 3,
    redeployTimeInSeconds: 70,
    dpCost: 36,
    rangeObject: {
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
};
