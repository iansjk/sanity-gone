import { Story, Meta } from "@storybook/react";
import StrengthsWeaknesses, {
  StrengthsWeaknessesProps,
} from "./StrengthsWeaknesses";

export default {
  title: "Introduction/StrengthsWeaknesses",
  component: StrengthsWeaknesses,
} as Meta;

const Default: Story<StrengthsWeaknessesProps> = (args) => (
  <StrengthsWeaknesses {...args} />
);
Default.args = {};
