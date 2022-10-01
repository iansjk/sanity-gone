import { ComponentStory, Meta } from "@storybook/react";
import OperatorList from ".";
import allOperators from "./storyAssets/allOperators.json";
import operatorsWithGuides from "./storyAssets/operatorsWithGuides.json";

export default {
  title: "OperatorList",
  component: OperatorList,
} as Meta;

const Template: ComponentStory<typeof OperatorList> = (args) => (
  <OperatorList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  operators: allOperators,
  operatorsWithGuides,
  filterSettings: {
    selectedProfession: null,
    selectedSubProfessionId: null,
    showOnlyGuideAvailable: true,
  },
};
