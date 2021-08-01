import { Story, Meta } from "@storybook/react";
import { TalentInfo, TalentInfoProps } from "./TalentInfo";

export default {
  title: "Talents/TalentInfo",
  component: TalentInfo,
} as Meta;

const Template: Story<TalentInfoProps> = (args) => <TalentInfo {...args} />;

export const MudrockTalent1 = Template.bind({});
MudrockTalent1.args = {
  talentObject: {
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
};

export const Dobermann = Template.bind({});
Dobermann.args = {
  talentObject: {
    candidates: [
      {
        unlockCondition: {
          phase: 1,
          level: 1,
        },
        requiredPotentialRank: 0,
        prefabKey: "1",
        name: "Starter Instructor",
        description: "All three-star Operators' ATK +5%",
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
        blackboard: [
          {
            key: "atk",
            value: 0.05,
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
        name: "Starter Instructor",
        description: "All three-star Operators' ATK +6% <@ba.talpu>(+1%)</>",
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
        blackboard: [
          {
            key: "atk",
            value: 0.06,
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
        name: "Starter Instructor",
        description: "All three-star Operators' ATK +10%",
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
        blackboard: [
          {
            key: "atk",
            value: 0.1,
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
        name: "Starter Instructor",
        description: "All three-star Operators' ATK +11% <@ba.talpu>(+1%)</>",
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
        blackboard: [
          {
            key: "atk",
            value: 0.11,
          },
        ],
      },
    ],
  },
};
