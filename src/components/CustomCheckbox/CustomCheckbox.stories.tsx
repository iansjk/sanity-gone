import { Story, Meta } from "@storybook/react";
import CustomCheckbox, { CustomCheckboxProps } from "./CustomCheckbox";

export default {
  title: "FormElements/CustomCheckbox",
  component: CustomCheckbox,
} as Meta;

const Template: Story<CustomCheckboxProps> = (args) => (
  <CustomCheckbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Guide available",
  checked: false,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Guide available",
  checked: false,
  disabled: true,
};
