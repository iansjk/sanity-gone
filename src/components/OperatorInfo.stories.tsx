import { Meta, Story } from "@storybook/react";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

export default {
  title: "Introduction/OperatorInfo",
  component: OperatorInfo,
} as Meta;

const Template: Story<OperatorInfoProps> = (args) => <OperatorInfo {...args} />;
export const Default = Template.bind({});
Default.args = {
  operatorEntry: {
    name: "Mudrock",
    profession: "TANK",
    rarity: 5,
  },
  archetype: "Enmity",
  isLimited: false,
};
