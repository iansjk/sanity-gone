import { Meta, Story } from "@storybook/react";
import Introduction, { IntroductionProps } from "./Introduction";

export default {
  title: "Introduction",
  component: Introduction,
} as Meta;

const Template: Story<IntroductionProps> = (args) => <Introduction {...args} />;
export const Default = Template.bind({});
Default.args = {
  operatorEntry: {
    name: "泥岩",
    appellation: "Mudrock",
    profession: "TANK",
    rarity: 5,
  },
  authorDiscordTag: "nikoleye#5580",
};
