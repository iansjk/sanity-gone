import { Story, Meta } from "@storybook/react";
import { serialize } from "next-mdx-remote/serialize";
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
  strengths: await serialize(
    "- Overall great and consistent crowd control capability\n- Can have great damage output when properly used\n- Global map presence is great for optimizing her ranged skills"
  ),
  weaknesses: await serialize(
    "- Summoner playstyle is not beginner-friendly\n- Needs investment if using her as a damage dealer"
  ),
};
