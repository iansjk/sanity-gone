import { Story, Meta } from "@storybook/react";
import Synergies, { SynergiesProps } from "./Synergies";
import { SynergyQuality } from "./SynergyOperator";

export default {
  title: "Synergies",
  component: Synergies,
} as Meta;

export const Default: Story<SynergiesProps> = (args) => <Synergies {...args} />;
Default.args = {
  synergyOperators: [
    {
      name: "Blemishine",
      rarity: 6,
      quality: SynergyQuality["Excellent Synergy"],
      analysis: `
        <p>
          The synergy with her talent is an obvious one, since Mudrock’s S2 is Defensive Recovery, Blemishine’s first talents will work on it allowing Mudrock to recover 1 SP whenever attacking an enemy, making the skill very spammable and consistent by not relying on enemies to actually hit you. On top of that, Blemishine’s S2 is not actually a direct heal; it’s a regeneration type heal, meaning that Blemi can actually heal Mudrock (and other similar operators) with it. This can easily make a huge difference if your Mudrock is struggling to sustain herself. This makes the two a great defender duo to bring pretty much anywhere.
        </p>
      `,
    },
    {
      name: "Angelina",
      rarity: 6,
      quality: SynergyQuality["Good Synergy"],
      analysis: `
        <p>
          Her benefits to Mudrock are entirely passive, and Angelina is great for general use anyway so it makes it super easy to have them together. Angelina passively provides global HP regen and an ASPD buff, since the regen is obviously not a direct heal, it works perfectly fine on Mudrock. The ASPD is also always good since Mudrock is also a damage dealer. The passive ASPD also helps if you’re bringing Blemishine too, since faster attacks means faster charging for Mudrock S2 while Blemi is deployed. Team building matters, folks! As a bonus, Angelina’s crowd control capabilities can help with stalling during Mudrock’s S3 startup, since her fast skill rotations means Angelina can always be ready to be used together with Mudrock’s S3.
        </p>
      `,
    },
    {
      name: "Elysium",
      rarity: 5,
      quality: SynergyQuality["Decent Synergy"],
      analysis: `
        <p>
          I’m lumping them together because they both do the same thing to synergize with Mudrock. What they do is provide reliable crowd control with quick rotations that can work in conjunction with Mudrock’s S3. Their crowd control can allow Mudrock to stall major dangerous enemies (such as golems) for a long while they cannot move far enough past her for them to not get blocked once she’s back up. As a bonus, Elysium’s S2 lasts long enough so that Mudrock can get a couple of hits on them while their armor is debuffed. Enemies that you typically need to use this on tend to be beefier, heavier enemies, where Rosa’s talent can take effect allowing Rosa herself to deal good damage. Other operators may be able to help in the same way, but these two plus Angelina are the most reliable to use alongside all of Mudrock’s S3 uses throughout a mission.
        </p>
      `,
    },
  ],
};
