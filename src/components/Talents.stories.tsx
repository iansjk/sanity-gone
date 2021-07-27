import { Story, Meta } from "@storybook/react";
import Talents, { TalentsProps } from "./Talents";

export default {
  title: "Talents",
  component: Talents,
} as Meta;

const Template: Story<TalentsProps> = (args) => <Talents {...args} />;

export const Default = Template.bind({});
Default.args = {
  analyses: [
    `
      <p>Her first talent, <b>Boon of Earth</b>, is a core part of her kit, being one of the most important ones to play around in some content.</p>
      <p>Mudrock gains one layer of her shield every 9 seconds, up to 3 layers at E2, and she always gains one layer upon deployment. Said shield will block one instance of damage dealt to Mudrock, using up a layer and healing her for 20% (+2% from P5) of her Max HP. This heal is her main form of sustain, and also helps her take pressure from slow hard-hitting enemies with the regenerating layers blocking damage. The shield has a different effect based on how many layers she currently has, as seen below:</p>
    `,
    `
      <p>Her second talent, <b>Brotherhood</b>, is a very powerful talent when it takes effect. It’s pretty simple, it reduces all incoming damage from Sarkaz enemies by 30%, it doesn’t need much explanation. It’s very effective when fighting against Sarkaz enemies (which are thankfully not too uncommon), doesn’t matter outside of that.</p>
    `,
  ],
};
