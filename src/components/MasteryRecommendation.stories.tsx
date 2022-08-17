import { Story, Meta } from "@storybook/react";
import MasteryRecommendation, {
  MasteryRecommendationProps,
} from "./MasteryRecommendation";

export default {
  title: "Skills/MasteryRecommendation",
  component: MasteryRecommendation,
} as Meta;

const Template: Story<MasteryRecommendationProps> = (args) => (
  <MasteryRecommendation {...args} />
);

export const KaltsitS2 = Template.bind({});
KaltsitS2.args = {
  level: "3",
  priority: "Low-Medium",
  children: (
    <p>
      S2 improves on everything it does with its masteries making it quite
      noticeable and worthwhile. It can be considered low priority if you
      already have many other options for operators to effectively lanehold like
      this skill focuses on. If you’re lacking in said options, then this skill
      can be considered much more worthwhile to invest into.
    </p>
  ),
};

export const AkafuyuS2 = Template.bind({});
AkafuyuS2.args = {
  level: "no",
  children: (
    <p>
      S2 ends up being a jack of all trades and master of none with its one more
      unique aspect, the shield, having no gain from masteries. They are linear
      with little to no impact making it hard to recommend anything.
    </p>
  ),
};
