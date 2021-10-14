import { Story, Meta } from "@storybook/react";
import StrengthsWeaknesses, {
  StrengthsWeaknessesProps,
} from "./StrengthsWeaknesses";

export default {
  title: "Introduction/StrengthsWeaknesses",
  component: StrengthsWeaknesses,
} as Meta;

export const Default: Story<StrengthsWeaknessesProps> = (args) => (
  <StrengthsWeaknesses {...args} />
);
Default.args = {
  strengths: [
    "Overall great and consistent crowd control capability",
    "Can have great damage output when properly used",
    "Global map presence is great for optimizing her ranged skills",
  ],
  weaknesses: [
    "Summoner playstyle is not beginner-friendly",
    "Needs investment if using her as a damage dealer",
  ],
};
