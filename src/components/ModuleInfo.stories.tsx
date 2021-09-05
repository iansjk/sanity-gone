import { Story, Meta } from "@storybook/react";
import ModuleInfo, { ModuleInfoProps } from "./ModuleInfo";

export default {
  title: "ModuleInfo",
  component: ModuleInfo,
} as Meta;

const Template: Story<ModuleInfoProps> = (args) => <ModuleInfo {...args} />;

export const Magallan = Template.bind({});
Magallan.args = {
  operatorName: "Magallan",
  moduleId: "uniequip_002_mgllan",
  moduleEffect: "Last summon on the field does not take up deployment limit",
  moduleObject: {
    phases: [
      {
        equipLevel: 1,
        parts: [
          {
            resKey: "mgllan_equip_1_1_p1",
            target: "TRAIT",
            addOrOverrideTalentDataBundle: {
              candidates: null,
            },
            overrideTraitDataBundle: {
              candidates: [
                {
                  additionalDescription:
                    "首个召唤物部署时<@ba.kw>不消耗</>部署位（场上最后一个召唤物撤退或被击倒时不返还部署位）",
                  unlockCondition: {
                    phase: 2,
                    level: 60,
                  },
                  requiredPotentialRank: 0,
                  blackboard: [
                    {
                      key: "cnt",
                      value: 1.0,
                    },
                  ],
                  overrideDescripton: null,
                  prefabKey: null,
                  rangeId: null,
                },
              ],
            },
          },
        ],
        attributeBlackboard: [
          {
            key: "max_hp",
            value: 100.0,
          },
          {
            key: "atk",
            value: 30.0,
          },
        ],
        tokenAttributeBlackboard: {},
      },
    ],
  },
};
