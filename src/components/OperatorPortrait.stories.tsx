import { Story, Meta } from "@storybook/react";
import OperatorPortrait, { OperatorPortraitProps } from "./OperatorPortrait";

export default {
  title: "OperatorPortrait",
  component: OperatorPortrait,
} as Meta;

const Template: Story<OperatorPortraitProps> = (args) => (
  <OperatorPortrait {...args} />
);

const MudrockProps = {
  name: "Mudrock",
  rarity: 6,
  isLimited: false,
  charId: "char_311_mudrok",
};
export const MudrockNormal = Template.bind({});
MudrockNormal.args = MudrockProps;
export const MudrockSmall = Template.bind({});
MudrockSmall.args = { ...MudrockProps, variant: "small" };
