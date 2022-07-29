import { Story, Meta } from "@storybook/react";
import Modules, { ModuleProps } from "./Modules";
import { DenormalizedModule } from "../utils/types";
import ModuleInfo from "./ModuleInfo";
import ModuleRecommendation from "./ModuleRecommendation";

export default {
  title: "Modules",
  component: Modules,
} as Meta;

export const Default: Story<ModuleProps> = (args) => <Modules {...args} />;

const modules: DenormalizedModule[] = [
  {
    moduleId: "uniequip_002_mgllan",
    moduleIcon: "sum-x",
    moduleName: "Drone Control Module.P",
    phases: [
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 100,
              },
              {
                key: "atk",
                value: 30,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect: null,
            talentIndex: -1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 130,
              },
              {
                key: "atk",
                value: 40,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 23 seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 130,
              },
              {
                key: "atk",
                value: 40,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 4,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 25 <span class="potential">(+2)</span> seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 150,
              },
              {
                key: "atk",
                value: 50,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 26 seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
          {
            attributeBlackboard: [
              {
                key: "max_hp",
                value: 150,
              },
              {
                key: "atk",
                value: 50,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 4,
            talentEffect:
              'Drones gain <span class="skill-tooltip">Invisibility</span> for 28 <span class="potential">(+2)</span> seconds after deployment (cannot be targeted by enemy ranged attacks)',
            talentIndex: 1,
            traitEffect:
              'The first summoned unit <span class="keyword">does not consume</span> deployment slots (The last summoned unit on the field does not return a deployment slot when retreated or defeated)',
            traitEffectType: "update",
          },
        ],
      },
    ],
  },
  {
    moduleId: "uniequip_003_mgllan",
    moduleIcon: "sum-y",
    moduleName: "Dragon Drones for Teaching Purposes Only",
    phases: [
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 25,
              },
              {
                key: "def",
                value: 25,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect: null,
            talentIndex: -1,
            traitEffect:
              'Maximum Summons in stock <span class="keyword">+3</span>, summon DP cost <span class="keyword">reduced</span><br><br>Skill 1: -3 DP<br>Skill 2: -3 DP<br>Skill 3: -5 DP',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 34,
              },
              {
                key: "def",
                value: 34,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              "Can use up to 5 summons (max 4 deployed at once). Summons' effect changes based upon Skill.",
            talentIndex: 0,
            traitEffect:
              'Maximum Summons in stock <span class="keyword">+3</span>, summon DP cost <span class="keyword">reduced</span><br><br>Skill 1: -3 DP<br>Skill 2: -3 DP<br>Skill 3: -5 DP',
            traitEffectType: "update",
          },
        ],
      },
      {
        candidates: [
          {
            attributeBlackboard: [
              {
                key: "atk",
                value: 40,
              },
              {
                key: "def",
                value: 40,
              },
            ],
            displayRange: false,
            range: null,
            requiredPotentialRank: 0,
            talentEffect:
              "Can use up to 5 stronger summons (max 4 deployed at once). Summons' effect changes based upon Skill.<br><br>Skill 1: +100 HP, +50 DEF<br>Skill 2: +40 ATK, +3 ASPD<br>Skill 3: +50 ATK, +3 ASPD",
            talentIndex: 0,
            traitEffect:
              'Maximum Summons in stock <span class="keyword">+3</span>, summon DP cost <span class="keyword">reduced</span><br><br>Skill 1: -3 DP<br>Skill 2: -3 DP<br>Skill 3: -5 DP',
            traitEffectType: "update",
          },
        ],
      },
    ],
  },
];

Default.args = {
  modules: modules,
  moduleAnalyses: [
    <>
      <ModuleInfo module={modules[0]} operatorName="char_248_mgllan" key={0} />
      <p>
        This module’s stage 1 grants Magallan an additional trait that’s very
        helpful when using her in a full team, but not that useful when used in
        a low op squad. Magallan can however make good use of the one additional
        deploy slot, especially when using her S1. Stage 2 upgraded talent can
        be helpful in certain situations where Magallan is exposed to taking
        damage—Invisibility can be extremely powerful in the right hands. The
        bonus stats don’t matter much as they don’t apply to her summons.
      </p>
      <ModuleRecommendation
        stage="1+"
        priority="Low"
        analysis={
          "The module’s new trait doesn’t do much for optimized low op or solo clears with Magallan, but it is a worthwhile upgrade for those wanting to use her in a full team, especially if using S1 to stall. For the upgraded talent, having the option to grant invisibility to Magallan can open up many placement options. It’s something that benefits more careful planning and specialized offensive use, but could also serve as a safety option when Magallan ends up in danger. For low op or solo clears, it is going to be more niche than her Module Y."
        }
      />
    </>,
    <>
      <ModuleInfo module={modules[1]} operatorName="char_248_mgllan" key={1} />
      <p>
        This is a more summon-focused module in comparison to her Module X,
        being well suited for low op and solo clears. The lowered cost and
        higher summon stock can still benefit a general team, as Magallan can
        make for a cheap and effective damage dealer early in a stage with her
        S3, while the higher stock makes losing summons less punishing.
        Additional upgrades focus on a higher power ceiling for her summons,
        allowing for upwards of 4 deployed at Stage 2 and improving their stats
        at stage 3, the former mattering more in specialized clears while the
        latter can still benefit a more general team.
      </p>
      <ModuleRecommendation
        stage="1+"
        priority="Low"
        analysis={
          "While this module doesn’t change Magallan’s playstyle, it’s a great upgrade for those who enjoy using her in low op or solo clears. The decreased cost and additional stored summons lend themselves well towards making Magallan’s low op playstyle easier for less experienced players. The lowered DP cost helps in stages with DP constraints, while the increased number of stored summons means players don’t have to worry as much when losing a summon to enemies instead of recycling it with her skill. Stages 2 and 3 are a good investment for those who enjoy using Magallan and wish to make her more powerful, but come at a steep cost for a playstyle that doesn’t benefit many."
        }
      />
    </>,
  ],
};
