import { Meta, Story } from "@storybook/react";
import OperatorStats, { OperatorStatsProps } from "./OperatorStats";

export default {
  title: "Introduction/OperatorStats",
  component: OperatorStats,
} as Meta;

const Template: Story<OperatorStatsProps> = (args) => (
  <OperatorStats {...args} />
);
export const Default = Template.bind({});
Default.args = {
  damageType: "Physical",
  position: "Melee",
  health: 4428,
  attackPower: 882,
  defense: 602,
  attacksPerSecond: 1.6,
  artsResistance: 10,
  blockCount: 3,
  redeployTimeInSeconds: 70,
  dpCost: 36,
  range: "lol :StayTuned::tm:",
};
