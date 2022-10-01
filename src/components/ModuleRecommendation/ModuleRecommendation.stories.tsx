import { Story, Meta } from "@storybook/react";
import ModuleRecommendation, {
  ModuleRecommendationProps,
} from "./ModuleRecommendation";

export default {
  title: "ModuleRecommendation",
  component: ModuleRecommendation,
} as Meta;

const Template: Story<ModuleRecommendationProps> = (args) => (
  <ModuleRecommendation {...args} />
);

export const SuzuranM1 = Template.bind({});
SuzuranM1.args = {
  stage: "1",
  priority: "High",
  children: (
    <p>
      Suzuran is very powerful with her S3 encompassing many things, and the
      module allows you to make use of that skill more often. That alone makes
      the module a high priority for those making use of Suzuran’s S3. The
      charging time of S2 can also be decreased if she has enemies in range
      often. Additional upgrades allowing the talent to also grant ATK aren’t
      very relevant as supporters, including Suzuran herself, don’t need it to
      perform well. It improves her offense with S2, or her regen capabilities
      with S3, with only the latter having rare cases where the additional ATK
      might make a difference.
    </p>
  ),
};

export const KafkaM1 = Template.bind({});
KafkaM1.args = {
  stage: "no",
  children: (
    <p>
      The module by itself isn’t too bad to help net additional damage when
      using her for the burst—however, the main use for Kafka is still the sleep
      utility from S1. If you’re using Kafka for the instant sleep and instant
      retreat, this module does nothing and is a wasteful investment. It may
      still help in situations where you’re using Kafka for fast-redeploy Arts
      damage, but can be ignored by most players.
    </p>
  ),
};
