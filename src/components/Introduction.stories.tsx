import { Meta, Story } from "@storybook/react";
import Introduction, { IntroductionProps } from "./Introduction";
import CharacterStats, { CharacterStatsProps } from "./CharacterStats";

export default {
  title: "Introduction",
  component: Introduction,
} as Meta;

const Template: Story<
  IntroductionProps & { operatorStats: CharacterStatsProps }
> = (args) => <Introduction {...args} />;

const characterObject = {
  name: "Mudrock",
  cnName: "泥岩",
  rarity: 5,
  description: "<@ba.kw>Cannot</> be healed by allies",
  position: "MELEE" as const,
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
};
export const Default = Template.bind({});
Default.args = {
  isLimited: false,
  characterObject,
  analysis: [
    <p key="1">
      Mudrock is a powerful <b>self-sustaining defender</b> packing both
      offensive and defensive power. She has a high upfront DP cost, but makes
      up for it with high overall stats and a kit that helps her take pressure
      and sustain herself. Most notably, she has high Max HP and ATK stats
      compared to the rest of the defender class, HP being especially important
      since all of her self-heals scale off of max HP.
    </p>,
    <CharacterStats key="2" characterObject={characterObject} />,
    <p key="3">
      Her kit is adaptable to fit different situations. Whether it be a constant
      onslaught of enemies or spaced out hard-hitters, you can bring a different
      skill to deal with them without much need of outside help. Mudrock can be
      effectively used both as a major damage dealer or tank, being a powerhouse
      in a lot of difficult content to date, and when used properly can be
      nigh-invulnerable against some of the toughest enemies.
    </p>,
    <p key="4">
      Her <b>archetype trait</b> is that she
      <em>cannot be directly healed by others</em>. This does not mean that she
      cannot be healed at all however, as “regeneration” type heals will still
      work just fine; same as any other operator with a similar trait.
    </p>,
  ],
};
