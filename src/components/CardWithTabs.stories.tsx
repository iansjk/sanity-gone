import { Meta, Story } from "@storybook/react";
import React from "react";
import CardPanel from "./CardPanel";
import CardWithTabs, { CardWithTabsProps } from "./CardWithTabs";

export default {
  title: "Cards/CardWithTabs",
  component: CardWithTabs,
  subcomponents: { CardPanel },
} as Meta;

export const Default: Story<CardWithTabsProps> = (args) => (
  <CardWithTabs {...args}>
    <CardPanel>
      Doggo ipsum such treat doggo wow such tempt noodle horse, boofers. waggy
      wags. Shooberino heckin good boys borkf very jealous pupper, noodle horse
      heckin good boys. Bork very hand that feed shibe borkf, doge. Long water
      shoob doggo porgo doge borkf, wow very biscit fluffer. Wow very biscit
      fluffer shibe sub woofer, fat boi wow such tempt.
    </CardPanel>
    <CardPanel>
      Very jealous pupper heck shoob woofer long water shoob heckin angery
      woofer long woofer, lotsa pats extremely cuuuuuute long doggo he made many
      woofs. Heckin angery woofer doing me a frighten smol, doggorino. puggorino
      much ruin diet. He made many woofs waggy wags long bois smol borking doggo
      with a long snoot for pats, smol.
    </CardPanel>
    <CardPanel>
      Borking doggo aqua doggo porgo big ol vvv, aqua doggo doge long doggo.
      Shibe snoot boof porgo sub woofer, blop heck very taste wow maximum
      borkdrive super chub, he made many woofs blop smol. vvv pupperino wow very
      biscit. Heck wow very biscit what a nice floof, much ruin diet.
    </CardPanel>
  </CardWithTabs>
);

Default.args = {
  header: "Skills",
  subheader: "",
  buttonPrefix: "S",
};
