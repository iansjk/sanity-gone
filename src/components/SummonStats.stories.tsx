import { Story, Meta } from "@storybook/react";
import SummonStats, { SummonStatsProps } from "./SummonStats";

export default {
  title: "SummonStats",
  component: SummonStats,
} as Meta;

export const Default: Story<SummonStatsProps> = (args) => (
  <SummonStats {...args} />
);
Default.args = {};
