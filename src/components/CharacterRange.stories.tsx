import { Meta, Story } from "@storybook/react";
import CharacterRange, { CharacterRangeProps } from "./CharacterRange";

export default {
  title: "Introduction/CharacterRange",
  component: CharacterRange,
} as Meta;

const Template: Story<CharacterRangeProps> = (args) => (
  <CharacterRange {...args} />
);
export const Cuora = Template.bind({});
Cuora.args = {
  rangeObject: {
    id: "0-1",
    direction: 1,
    grids: [
      {
        row: 0,
        col: 0,
      },
    ],
  },
};
export const Mudrock = Template.bind({});
Mudrock.args = {
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
};
export const IfritE2 = Template.bind({});
IfritE2.args = {
  rangeObject: {
    id: "5-1",
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
      {
        row: 0,
        col: 4,
      },
      {
        row: 0,
        col: 5,
      },
    ],
  },
};

export const EyjaS3 = Template.bind({});
EyjaS3.args = {
  rangeObject: {
    id: "x-3",
    direction: 1,
    grids: [
      {
        row: 3,
        col: 0,
      },
      {
        row: 2,
        col: -1,
      },
      {
        row: 2,
        col: 0,
      },
      {
        row: 2,
        col: 1,
      },
      {
        row: 1,
        col: -2,
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
        row: 1,
        col: 2,
      },
      {
        row: 0,
        col: -3,
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
        row: 0,
        col: 3,
      },
      {
        row: -1,
        col: -2,
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
        row: -1,
        col: 2,
      },
      {
        row: -2,
        col: -1,
      },
      {
        row: -2,
        col: 0,
      },
      {
        row: -2,
        col: 1,
      },
      {
        row: -3,
        col: 0,
      },
    ],
  },
};
