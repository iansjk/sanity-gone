import { ComponentStory, Meta } from "@storybook/react";
import OperatorList from ".";
import allOperators from "./storyAssets/allOperators.json";
import operatorsWithGuides from "./storyAssets/operatorsWithGuides.json";

export default {
  title: "OperatorList",
  component: OperatorList,
} as Meta;

const Template: ComponentStory<typeof OperatorList> = (args) => (
  <OperatorList
    {...args}
    operators={allOperators}
    operatorsWithGuides={operatorsWithGuides}
  />
);

export const Default = Template.bind({});
Default.args = {
  filterSettings: {
    selectedProfession: null,
    selectedSubProfessionId: null,
    showOnlyGuideAvailable: false,
  },
};

export const WithGuidesOnly = Template.bind({});
WithGuidesOnly.args = {
  filterSettings: {
    selectedProfession: null,
    selectedSubProfessionId: null,
    showOnlyGuideAvailable: true,
  },
};

export const GuardsOnly = Template.bind({});
GuardsOnly.args = {
  filterSettings: {
    selectedProfession: "WARRIOR",
    selectedSubProfessionId: null,
    showOnlyGuideAvailable: false,
  },
};

export const WandermedicOnly = Template.bind({});
WandermedicOnly.args = {
  filterSettings: {
    selectedProfession: null,
    selectedSubProfessionId: "wandermedic",
    showOnlyGuideAvailable: false,
  },
};

export const NoResults = Template.bind({});
NoResults.args = {
  filterSettings: {
    selectedProfession: "SPECIAL",
    selectedSubProfessionId: "geek",
    showOnlyGuideAvailable: true,
  },
};
