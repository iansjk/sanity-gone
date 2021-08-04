import { Story, Meta } from "@storybook/react";
import Talents, { TalentsProps } from "./Talents";
import TalentInfo from "./TalentInfo";

export default {
  title: "Talents",
  component: Talents,
} as Meta;

const Template: Story<TalentsProps> = (args) => <Talents {...args} />;

export const Default = Template.bind({});
Default.args = {
  analyses: [
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
