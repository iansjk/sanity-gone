import { Story, Meta } from "@storybook/react";
import Synergy, {
  SynergyOperatorProps,
  SynergyQuality,
} from "./SynergyOperator";

export default {
  title: "Synergies/SynergyOperator",
  component: Synergy,
} as Meta;

const Template: Story<SynergyOperatorProps> = (args) => <Synergy {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Angelina",
  rarity: 6,
  quality: SynergyQuality["Good Synergy"],
  analysis: `
    <p>Her benefits to Mudrock are entirely passive, and Angelina is great for general use anyway so it makes it super easy to have them together. Angelina passively provides global HP regen and an ASPD buff, since the regen is obviously not a direct heal, it works perfectly fine on Mudrock. The ASPD is also always good since Mudrock is also a damage dealer. The passive ASPD also helps if you’re bringing Blemishine too, since faster attacks means faster charging for Mudrock S2 while Blemi is deployed. Team building matters, folks! As a bonus, Angelina’s crowd control capabilities can help with stalling during Mudrock’s S3 startup, since her fast skill rotations means Angelina can always be ready to be used together with Mudrock’s S3.</p>
  `,
};
