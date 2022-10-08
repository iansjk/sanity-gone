import { Story, Meta } from "@storybook/react";
import MobileMenu, { MobileMenuProps } from "./MobileMenu";

export default {
  title: "MobileMenu",
  component: MobileMenu,
} as Meta;

export const Default: Story<MobileMenuProps> = (args) => (
  <MobileMenu {...args} />
);
Default.args = {};
