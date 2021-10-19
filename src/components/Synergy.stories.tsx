import { Story, Meta } from "@storybook/react";
import Synergy, { SynergyProps, SynergyQuality } from "./Synergy";

export default {
  title: "Synergies/Synergy",
  component: Synergy,
} as Meta;

const Template: Story<SynergyProps> = (args) => <Synergy {...args} />;

export const Angelina = Template.bind({});
Angelina.args = {
  name: "Angelina",
  rarity: 5,
  quality: SynergyQuality["Good Synergy"],
  profession: "SUPPORT",
  subProfessionId: "slower",
  analysis: `
    <p>Her benefits to Mudrock are entirely passive, and Angelina is great for general use anyway so it makes it super easy to have them together. Angelina passively provides global HP regen and an ASPD buff, since the regen is obviously not a direct heal, it works perfectly fine on Mudrock. The ASPD is also always good since Mudrock is also a damage dealer. The passive ASPD also helps if you’re bringing Blemishine too, since faster attacks means faster charging for Mudrock S2 while Blemi is deployed. Team building matters, folks! As a bonus, Angelina’s crowd control capabilities can help with stalling during Mudrock’s S3 startup, since her fast skill rotations means Angelina can always be ready to be used together with Mudrock’s S3.</p>
  `,
};

export const LowAtkOperators = Template.bind({});
LowAtkOperators.args = {
  name: "Low ATK Physical Operators",
  isGroup: true,
  iconUrl:
    "https://res.cloudinary.com/samidare/image/upload/v1628565419/arknights/subclasses/fastshot.png",
  analysis: `<p>The toughest thing for a lot of these operators, such as AA snipers, is how much even mid-levels of DEF can hurt their DPS. Skalter is able to provide them with a strong flat ATK buff either at short, strong bursts, or with her permanent duration buff. She massively improves their DPS and makes them much better to use in general with no downside.</p>`,
};
