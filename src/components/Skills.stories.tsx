import { Story, Meta } from "@storybook/react";
import Skills, { SkillsProps } from "./Skills";

export default {
  title: "Skills",
  component: Skills,
} as Meta;

const Template: Story<SkillsProps> = (args) => <Skills {...args} />;

export const Default = Template.bind({});
Default.args = {
  skill1Analysis: `
    <p>Her first skill is <b>Defense Strengthening Type γ</b>. It’s nothing except a generic DEF stat buff.</p>
    <p>It’s not worth caring about, but if you want to use Mudrock as a normal defender for some reason, it does have good uptime and makes her pretty tanky.</p>
  `,
  skill2Analysis: `
    <p>Her second skill is <b>Rockfall Hammer</b>, and is a simple auto-activation skill with defensive recovery.</p>
    <p>The skill has quite a bit to it, and the numbers and range on it are great, making it an easy go-to for general usage. It is most effective against hordes of smaller enemies that will be hitting her often. With this skill Mudrock can easily sustain herself while also clearing enemies. While not as effective against slower attacking enemies, it can still work as long as the pressure on Mudrock is not too much. It’s a simple and effective skill that turns Mudrock into a meat grinder.</p>
  `,
  skill3Analysis: `
    <p>Her third skill is <b>Bloodline of Impure Soil</b>, and it’s potentially her most powerful skill due to its offensive and defensive capabilities. That is alongside a very forgiving skill rotation that synergizes well with the rest of her kit.</p>
    <p>This skill can work purely for DPS by preparing against oncoming enemies and dishing out damage to them before they can do much thanks to its high damage output against multiple targets. It can also be used defensively, as the 10 seconds of invulnerability guarantees that Mudrock will regenerate her shield at least once, and the stun will buy time to continue regenerating yet another layer. It can be crucial to allow her to survive taking large amounts of pressure as she cannot be normally burst healed by medics.You can easily set up to catch any enemies that may get past her by just placing someone behind her. It’s a versatile and very powerful skill with low SP cost that allows it to be used a lot as necessary in a multitude of ways.</p>
    <p>The first 10 seconds of the skill are one of people’s biggest worries with the skill when using it, as enemies can make it past her. Don’t think too much about it, as all you need to know is that a majority of enemies will not make it past her if you simply use it a little bit ahead of time. Detailed information regarding this can be found further down below, under <b>Detailed Analysis</b>.</p>
  `,
};
