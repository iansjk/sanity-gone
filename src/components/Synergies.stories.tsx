import { Story, Meta } from "@storybook/react";
import Synergies, { SynergiesProps } from "./Synergies";
import { SynergyQuality } from "./Synergy";

export default {
  title: "Synergies",
  component: Synergies,
} as Meta;

export const Default: Story<SynergiesProps> = (args) => <Synergies {...args} />;
Default.args = {
  synergies: [
    {
      name: "Low ATK Physical Operators",
      rarity: 5,
      isGroup: true,
      iconUrl:
        "https://res.cloudinary.com/samidare/image/upload/v1628565419/arknights/subclasses/fastshot.png",
      analysis: `
        <p>
          The synergy with her talent is an obvious one, since Mudrock’s S2 is Defensive Recovery, Blemishine’s first talents will work on it allowing Mudrock to recover 1 SP whenever attacking an enemy, making the skill very spammable and consistent by not relying on enemies to actually hit you. On top of that, Blemishine’s S2 is not actually a direct heal; it’s a regeneration type heal, meaning that Blemi can actually heal Mudrock (and other similar operators) with it. This can easily make a huge difference if your Mudrock is struggling to sustain herself. This makes the two a great defender duo to bring pretty much anywhere.
        </p>
      `,
      quality: null,
    },
    {
      name: "Aak",
      rarity: 5,
      isGroup: false,
      profession: "SPECIAL",
      subProfessionId: "geek",
      quality: SynergyQuality["Excellent Synergy"],
      analysis: `
        <p>
          The best buffer to use with Mudrock; as he can provide her defensive and offensive buffs depending on what you want. You can use S2 to increase her DEF and Max HP (which her self-heals scale off of) for better tanking and sustain, or S3 to increase her ATK and ASPD for better damage output. She has a base DEF high enough to hit the minimum damage threshold tanking his shots, and she can be buffed during S3 invulnerability phase and still get the buffs without losing anything. Aak does no harm at all for once, unbelievable right?
        </p>
      `,
    },
    {
      name: "Angelina",
      rarity: 5,
      isGroup: false,
      profession: "SUPPORT",
      subProfessionId: "slower",
      quality: SynergyQuality["Good Synergy"],
      analysis: `
        <p>
          Her benefits to Mudrock are entirely passive, and Angelina is great for general use anyway so it makes it super easy to have them together. Angelina passively provides global HP regen and an ASPD buff, since the regen is obviously not a direct heal, it works perfectly fine on Mudrock. The ASPD is also always good since Mudrock is also a damage dealer. The passive ASPD also helps if you’re bringing Blemishine too, since faster attacks means faster charging for Mudrock S2 while Blemi is deployed. Team building matters, folks! As a bonus, Angelina’s crowd control capabilities can help with stalling during Mudrock’s S3 startup, since her fast skill rotations means Angelina can always be ready to be used together with Mudrock’s S3.
        </p>
      `,
    },
    {
      name: "Whislash",
      rarity: 4,
      isGroup: false,
      profession: "Warrior",
      subProfessionId: "instructor",
      quality: SynergyQuality["Good Synergy"],
      analysis: `
        <p>
          Similar to Angelina, she provides both offensive and defensive passive benefits to Mudrock and friends at all times, and her active skills further improve it for the duration. More DEF can always help Mudrock take less pressure from most enemies in the game, and more ASPD is the same as before. With either of her skills active, the difference is quite noticeable too and works well. Whislash can easily be placed behind Mudrock too to catch enemies that are getting by, especially during Mudrock’s S3 start-up period, while also having the extra range to attack enemies blocked by Mudrock.
        </p>
      `,
    },
    {
      name: "Ch'en",
      rarity: 5,
      isGroup: false,
      profession: "WARRIOR",
      subProfessionId: "sword",
      quality: SynergyQuality["Good Synergy"],
      analysis: `
        <p>
          Another rather simple talent synergy; Ch’en’s talent helps passively charge skills with Offensive and Defensive recoveries. It’s nowhere as powerful as Blemishine’s talent, but it’s still helpful nonetheless if your objective is to help keep Mudrock spinning.
        </p>
      `,
    },
    {
      name: "Elysium",
      rarity: 4,
      isGroup: false,
      profession: "PIONEER",
      subProfessionId: "bearer",
      quality: SynergyQuality["Decent Synergy"],
      analysis: `
        <p>
          I’m lumping them together because they both do the same thing to synergize with Mudrock. What they do is provide reliable crowd control with quick rotations that can work in conjunction with Mudrock’s S3. Their crowd control can allow Mudrock to stall major dangerous enemies (such as golems) for a long while they cannot move far enough past her for them to not get blocked once she’s back up. As a bonus, Elysium’s S2 lasts long enough so that Mudrock can get a couple of hits on them while their armor is debuffed. Enemies that you typically need to use this on tend to be beefier, heavier enemies, where Rosa’s talent can take effect allowing Rosa herself to deal good damage. Other operators may be able to help in the same way, but these two plus Angelina are the most reliable to use alongside all of Mudrock’s S3 uses throughout a mission.
        </p>
      `,
    },
  ],
};
