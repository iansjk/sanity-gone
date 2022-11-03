import enUniequipTable from "./ArknightsGameData/en_US/gamedata/excel/uniequip_table.json";
import cnUniequipTable from "./ArknightsGameData/zh_CN/gamedata/excel/uniequip_table.json";
import enCharacterTable from "./ArknightsGameData/en_US/gamedata/excel/character_table.json";
import cnCharacterTable from "./ArknightsGameData/zh_CN/gamedata/excel/character_table.json";
import { professionToClass } from "../src/utils/globals";
import jetTraitTranslations from "./jet-tls/traits.json";
import { descriptionToHtml } from "../src/utils/description-parser";
import { fixJetSkillDescriptionTags } from "./fix-jet-skill-descs";
import fs from "fs";
import path from "path";

const dataDir = path.join(__dirname, "../data");

const EXCLUDED_BRANCHES: Set<string> = new Set([
  "notchar1",
  "notchar2",
  "none1",
  "none2",
]);

// These are translations of the branches in CN that are out, but are not yet
// added to EN.
const CN_BRANCH_TLS: Record<string, string> = {
  fortress: "Fortress",
  wandermedic: "Wandering",
  craftsman: "Artificer",
  incantationmedic: "Incantation",
  agent: "Agent",
  shotprotector: "Longstrike",
  chainhealer: "Chain",
  crusher: "Crusher",
};
// Separate EN overrides.
// Kept separate from the above overrides for the sake of clarity.
// Notably, these overrides are SUBPROFESSION IDs (to stay consistent with the above).
const BRANCH_OVERRIDES: Record<string, string> = {
  physician: "Single-target",
};

const TRAIT_OVERRIDES: Record<string, string> = {
  musha:
    "Can't be healed by other units. Recovers <@ba.kw>30/50/70</> (scales with elite promotion) self HP every time this operator attacks an enemy",
  chain:
    'Attacks deal <@ba.kw>Arts damage</> and jump between <@ba.kw>3</> (<@ba.kw>4</> at Elite 2) enemies (jump range is <@ba.kw>1.7</> tiles). Each jump deals 15% less damage and inflicts an <@ba.kw>80%</> <span class="skill-tooltip">Slow</span> for <@ba.kw>0.5</> seconds',
  phalanx:
    "Normally <@ba.kw>does not attack</>, but has <@ba.kw>+200%</> DEF and <@ba.kw>+20</> RES; When skill is active, attacks deal <@ba.kw>AoE Arts damage</>",
  geek: "Continually loses <@ba.kw>3%</> max HP per second",
  wandermedic:
    "Restores the HP of allies\nRecovers <@ba.dt.element>Elemental damage</> equal to <@ba.kw>{ep_heal_ratio:0%}</> of Attack Power</br>(Can heal <@ba.dt.element>Elemental damage</> of unhurt units)",
  slower:
    'Deals <@ba.kw>Arts damage</> and <span class="skill-tooltip">Slows</span> the target by <@ba.kw>80%</> for <@ba.kw>0.8</> seconds',
  splashcaster:
    "Deals <@ba.kw>AOE Arts damage</> with a splash radius of <@ba.kw>1.1</> tiles",
  bombarder:
    "Attacks deal <@ba.kw>two instances</> of Physical damage to <@ba.kw>ground</> enemies in a <@ba.kw>0.9</> tile area (The second instance is a shockwave that has half the normal ATK)",
  aoesniper:
    "Deals <@ba.kw>AOE Physical damage</> with a splash radius of <@ba.kw>1.0</> tiles",
  fortress:
    "Prioritize <@ba.kw>Long range splash attack</> (splash radius of <@ba.kw>1.0</> tiles) when not blocking",
  funnel:
    "Controls a <@ba.kw>Drone</> that deals <@ba.kw>Arts damage</>; When the Drone continuously attacks the same enemy, its damage will increase (from 20% up to 110% of the operator's ATK, linearly)",
  incantationmedic:
    "Attacks deal <@ba.kw>Arts damage</>. When attacking an enemy, heal a friendly operator within attack range for <@ba.kw>50%</> of the damage dealt.",
};

// the provided parameter is a SUBPROFESSION ID, not a BRANCH NAME.
const useBranchOverride = (name: string) =>
  (
    BRANCH_OVERRIDES[name] ??
    enUniequipTable.subProfDict[
      name as keyof typeof enUniequipTable.subProfDict
    ].subProfessionName
  )
    .replace(" Medic", "")
    .replace(" Caster", "");

void (() => {
  console.log("Updating branches and traits...");
  const enSubProfessions = new Set(Object.keys(enUniequipTable.subProfDict));
  const cnOnlySubProfessions = new Set(
    Object.keys(cnUniequipTable.subProfDict).filter(
      (subprof) => !enSubProfessions.has(subprof)
    )
  );
  const denormalizedBranchesAndTraits = Object.fromEntries(
    [...cnOnlySubProfessions, ...enSubProfessions]
      .filter((name) => !EXCLUDED_BRANCHES.has(name))
      .map((subprof) => {
        // Parse trait description for operator
        const firstOp =
          Object.values(enCharacterTable).find(
            (op: { subProfessionId: string; rarity: number }) =>
              op.subProfessionId === subprof && op.rarity > 1 // no robots
          ) ??
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Object.values(cnCharacterTable).find(
            (op: { subProfessionId: string; rarity: number }) =>
              op.subProfessionId === subprof && op.rarity > 1
          )!;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        let description = firstOp.description!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const trait = firstOp.trait!;
        const className = professionToClass(firstOp.profession);

        // left in console.log comments - useful for debugging bad trait descriptions
        // console.log(description);
        if (subprof in TRAIT_OVERRIDES) {
          description = TRAIT_OVERRIDES[subprof];
        } else if (description in jetTraitTranslations.full) {
          // console.log("in descs");
          description = fixJetSkillDescriptionTags(
            jetTraitTranslations.full[
              description as keyof typeof jetTraitTranslations.full
            ].en
          );
        }

        const blackboard = trait
          ? trait.candidates[trait.candidates.length - 1].blackboard
          : [];

        const isCnOnly = cnOnlySubProfessions.has(subprof);
        if (isCnOnly) {
          if (!(subprof in CN_BRANCH_TLS))
            console.warn(
              "CN only branch without translation found: " + subprof
            );
          return [
            subprof,
            {
              branchName: CN_BRANCH_TLS[subprof],
              trait: descriptionToHtml(description, blackboard),
              class: className,
            },
          ];
        }

        return [
          subprof,
          {
            branchName: useBranchOverride(subprof),
            trait: descriptionToHtml(description, blackboard),
            class: className,
          },
        ];
      })
  );

  fs.writeFileSync(
    path.join(dataDir, "branches.json"),
    JSON.stringify(denormalizedBranchesAndTraits, null, 2)
  );
})();
