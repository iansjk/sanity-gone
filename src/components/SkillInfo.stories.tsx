import { Story, Meta } from "@storybook/react";
import SkillInfo, { SkillInfoProps } from "./SkillInfo";

export default {
  title: "Skills/SkillInfo",
  component: SkillInfo,
} as Meta;

const Template: Story<SkillInfoProps> = (args) => <SkillInfo {...args} />;

export const Default = Template.bind({});
Default.args = {};
