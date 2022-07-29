import { Module, ModuleObject, ModulePhase } from "./types";
import cnBattleEquipTable from "./ArknightsGameData/zh_CN/gamedata/excel/battle_equip_table.json";
import cnUniequipTable from "./ArknightsGameData/zh_CN/gamedata/excel/uniequip_table.json";
import enBattleEquipTable from "./ArknightsGameData/en_US/gamedata/excel/battle_equip_table.json";
import enUniequipTable from "./ArknightsGameData/en_US/gamedata/excel/uniequip_table.json";
import moduleTranslations from "./module-tls.json";
import rangeTable from "./ArknightsGameData/zh_CN/gamedata/excel/range_table.json";
import { descriptionToHtml } from "../src/utils/description-parser";
import fs from "fs";
import path from "path";

const dataDir = path.join(__dirname, "../data");

interface ModuleTranslation {
  moduleName?: string | null; // if the moduleName is null, the module already
  // exists in EN, so the moduleName will be ignored anyway
  phases: ModuleTranslationData[];
}

// This represents one "phase" of a module at a particular operator potential,
// with translations of the trait and talent at all 3 stages of that module.
interface ModuleTranslationData {
  requiredPotentialRank: number;
  translations: {
    trait: null | string;
    talent: null | string;
  }[];
}

// Translations for modules that are not yet in EN.
const MODULE_TRANSLATIONS: Record<string, ModuleTranslation> =
  moduleTranslations;

void (() => {
  // ------------------------------------
  // |   WARNING: Ahead lies madness.   |
  // ------------------------------------

  // Due to the drastically more complicated nature of modules, this copy script
  // approach completely diverges from every other copy script, in that it
  // directly transforms the data from the original (ModuleObject) into a more
  // manageable state (DenormalizedModule / Module in ./types.ts), instead of
  // just denormalizing the data. The resultant format of the data is a
  // drastically different, much-more-condensed JSON with all the information
  // needed to display the module page.

  // The resultant modules.json is a Record<string, Module[]> mapping a
  // character name ("char_xxx_name") to that operator's modules (in order).
  console.log("Updating modules...");
  const denormalizedModules: Record<string, Module[]> = {};
  Object.entries(cnBattleEquipTable).forEach(([moduleId, moduleObject]) => {
    const operatorName: string =
      cnUniequipTable.equipDict[
        moduleId as keyof typeof cnUniequipTable.equipDict
      ].charId;

    // my sanity is rapidly deteriorating
    const morbius: ModuleObject = moduleObject as unknown as ModuleObject;

    // Put in any relevant EN data, by overwriting any CN data with EN data if
    // the corresponding EN data exists.
    if (moduleId in enBattleEquipTable) {
      for (let i = 0; i < morbius.phases.length; i++) {
        if (
          enBattleEquipTable[moduleId as keyof typeof enBattleEquipTable].phases
            .length > i
        ) {
          // @ts-expect-error oh boy typescript is having a great time
          morbius.phases[i] =
            enBattleEquipTable[
              moduleId as keyof typeof enBattleEquipTable
            ].phases[i];
        }
      }
    }

    // get icon of module's type (like EXE-Y or SUM-X)
    const moduleIcon =
      cnUniequipTable.equipDict[
        moduleId as keyof typeof cnUniequipTable.equipDict
      ].typeIcon.toLowerCase();

    // very long winded way of obtaining the module's name
    // if EN doesn't exist, check TL, if TL doesn't exist, use CN
    const moduleName =
      moduleId in enUniequipTable.equipDict
        ? enUniequipTable.equipDict[
            moduleId as keyof typeof enUniequipTable.equipDict
          ].uniEquipName
        : moduleId in MODULE_TRANSLATIONS &&
          MODULE_TRANSLATIONS[moduleId].moduleName
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          MODULE_TRANSLATIONS[moduleId].moduleName!
        : cnUniequipTable.equipDict[
            moduleId as keyof typeof cnUniequipTable.equipDict
          ].uniEquipName;

    // This will be our final module object that represents this module.
    const denormalizedModuleObject: Module = {
      moduleId,
      moduleIcon,
      moduleName,
      phases: [],
    };

    for (let i = 0; i < morbius.phases.length; i++) {
      const currentPhase = morbius.phases[i];
      const candidates: Record<string, ModulePhase> = {};

      // We loop through 0-5 to check each possible potential rank.
      // If that potential rank exists within the list of potential candidates
      // for a module, we push it to an object with the potentials as keys.
      // This is to facilitate easier editing of the current phase's data by
      // potential in the next step. Candidates will be converted into an array
      // later on, with earlier potentials coming first.
      for (let j = 0; j < 6; j++) {
        // check which requiredPotentialRanks exist
        let potentialExists = false;
        for (let k = 0; k < currentPhase.parts.length; k++) {
          if (
            currentPhase.parts[k].overrideTraitDataBundle.candidates !== null
          ) {
            for (
              let l = 0;
              l < // @ts-expect-error we already know non null
              currentPhase.parts[k].overrideTraitDataBundle.candidates.length;
              l++
            ) {
              if (
                // @ts-expect-error we already know non null
                currentPhase.parts[k].overrideTraitDataBundle.candidates[l]
                  .requiredPotentialRank === j
              ) {
                potentialExists = true;
              }
            }
          }
          if (
            currentPhase.parts[k].addOrOverrideTalentDataBundle.candidates !==
            null
          ) {
            for (
              let l = 0;
              l < // @ts-expect-error we already know non null
              currentPhase.parts[k].addOrOverrideTalentDataBundle.candidates
                .length;
              l++
            ) {
              if (
                // @ts-expect-error we already know non null
                currentPhase.parts[k].addOrOverrideTalentDataBundle.candidates[
                  l
                ].requiredPotentialRank === j
              ) {
                potentialExists = true;
              }
            }
          }
        }

        // push a new (default values) entry to the candidates object
        if (potentialExists) {
          candidates[j] = {
            attributeBlackboard: currentPhase.attributeBlackboard,
            displayRange: false,
            range: null,
            requiredPotentialRank: j,
            talentEffect: null,
            talentIndex: -1,
            traitEffect: null,
            traitEffectType: "",
          };
        }
      }

      // This is the heavy lifting. Based on the target string of this particular candidate,
      // we determine the changes that need to be made to a certain potential in candidates{}.
      for (let j = 0; j < currentPhase.parts.length; j++) {
        const curPart = currentPhase.parts[j];
        const target = curPart.target;

        // There are 2 data bundles in the candidate:
        // addOrOverrideTalentDataBundle and overrideTraitDataBundle.
        // Only one will ever be present, depending on what the target is set to.

        // TRAIT, TRAIT_DATA_ONLY, and DISPLAY mean the trait is being modified
        // (and we're using overrideTraitDataBundle).
        // in some way. DISPLAY usually means the stats aren't affected (I think).
        // We can handle them all together.
        if (
          target === "TRAIT" ||
          target === "TRAIT_DATA_ONLY" ||
          target === "DISPLAY"
        ) {
          if (curPart.overrideTraitDataBundle.candidates === null) {
            // if we ever get here, HG has messed up big time
            console.error(
              `overrideTraitDataBundle is null on ${moduleId}. This should NOT happen`
            );
            continue;
          }

          const traitCandidates = curPart.overrideTraitDataBundle.candidates;

          // sigh... we're in another candidates array
          for (let k = 0; k < traitCandidates.length; k++) {
            const curTraitCandidate = traitCandidates[k];

            // additionalDescription will supplement the trait with new text in
            // a newline, while overrideDescripton [sic] will completely overwrite
            // the trait.

            // Confoundingly, both additionalDescription and overrideDescripton
            // can be present at the same time, but it only occurs on AoE casters.
            // Why? I really don't know. Either way, if they are both present,
            // we can ignore the overrideDescription because it will say
            // "this unit deals AoE damage".
            if (curTraitCandidate.additionalDescription) {
              candidates[curTraitCandidate.requiredPotentialRank].traitEffect =
                descriptionToHtml(
                  curTraitCandidate.additionalDescription,
                  curTraitCandidate.blackboard
                );
              // this is a trait UPDATE
              candidates[
                curTraitCandidate.requiredPotentialRank
              ].traitEffectType = "update";
            } else if (curTraitCandidate.overrideDescripton) {
              candidates[curTraitCandidate.requiredPotentialRank].traitEffect =
                descriptionToHtml(
                  curTraitCandidate.overrideDescripton,
                  curTraitCandidate.blackboard
                );
              // the trait is being OVERRIDDEN
              candidates[
                curTraitCandidate.requiredPotentialRank
              ].traitEffectType = "override";
            }
          }
        } else if (target === "TALENT" || target === "TALENT_DATA_ONLY") {
          // If the target is TALENT or TALENT_DATA_ONLY, that means either
          // a talent has been changed, or this module modifies range. (I don't know
          // why that's considered a talent... but whatever.)
          // If this modifies range, the target will be TALENT.
          if (curPart.addOrOverrideTalentDataBundle.candidates === null) {
            console.error(
              `addOrOverrideTalentDataBundle is null on ${moduleId}. This should NOT happen`
            );
            continue;
          }

          const talentCandidates =
            curPart.addOrOverrideTalentDataBundle.candidates;

          // oh boy another one
          for (let k = 0; k < talentCandidates.length; k++) {
            const curTalentCandidate = talentCandidates[k];

            // If displayRangeId is true, this module modifies range,
            // meaning rangeId exists (as a string, not a RangeObject).
            // We denormalize it using the range table and then save it.
            if (curTalentCandidate.displayRangeId) {
              candidates[curTalentCandidate.requiredPotentialRank].range =
                rangeTable[
                  curTalentCandidate.rangeId as keyof typeof rangeTable
                ];
              candidates[
                curTalentCandidate.requiredPotentialRank
              ].displayRange = true;
            }
            // upgradeDescription is always a direct override of the talent
            // (it will completely replace the old text, not a newline).
            // talentIndex is a 0-indexed number that represents the talent being
            // overridden... however, it can also be -1 in the case that
            // upgradeDescription is actually a completely new talent
            // (or upgradeDescription is null...)
            if (curTalentCandidate.upgradeDescription) {
              candidates[
                curTalentCandidate.requiredPotentialRank
              ].talentEffect = descriptionToHtml(
                curTalentCandidate.upgradeDescription,
                curTalentCandidate.blackboard
              );
              candidates[curTalentCandidate.requiredPotentialRank].talentIndex =
                curTalentCandidate.talentIndex;
            }
          }
        }
      }

      // When the requiredPotentialRank (zero-indexed) is not 0, the module data
      // for some reason doesn't include the effect data from earlier phases
      // (that is obviously still in effect). This fixes any missing
      // trait/talent effects, ranges, or effect types ("UPDATE" vs "OVERRIDE").
      Object.values(candidates).forEach((candidate) => {
        if (candidate.requiredPotentialRank !== 0) {
          if (!candidate.traitEffect) {
            candidate.traitEffect = candidates[0].traitEffect;
          }
          if (!candidate.talentEffect) {
            candidate.talentEffect = candidates[0].talentEffect;
            candidate.talentIndex = candidates[0].talentIndex;
          }
          if (!candidate.traitEffectType) {
            candidate.traitEffectType = candidates[0].traitEffectType;
          }
          if (!candidate.displayRange && candidates[0].displayRange) {
            candidate.displayRange = true;
            candidate.range = candidates[0].range;
          }
        }
      });

      // Check the translations. If they exist, replace the existing effects
      // with what's specified in the translation. The rest of the data doesn't
      // need to be translated, so it's directly used (thus, translations have
      // a very different format from the module data file).
      if (moduleId in MODULE_TRANSLATIONS) {
        for (let j = 0; j < MODULE_TRANSLATIONS[moduleId].phases.length; j++) {
          if (
            candidates[
              MODULE_TRANSLATIONS[moduleId].phases[j].requiredPotentialRank
            ]
          ) {
            candidates[
              MODULE_TRANSLATIONS[moduleId].phases[j].requiredPotentialRank
            ].traitEffect =
              MODULE_TRANSLATIONS[moduleId].phases[j].translations[i].trait;
            candidates[
              MODULE_TRANSLATIONS[moduleId].phases[j].requiredPotentialRank
            ].talentEffect =
              MODULE_TRANSLATIONS[moduleId].phases[j].translations[i].talent;
          }
        }
      }

      // Transform candidates back into an array
      denormalizedModuleObject.phases.push({
        candidates: Object.values(candidates),
      });

      // Quick and dirty regular expression for any Chinese characters to log
      // any missing translations.
      if (
        (candidates[0].talentEffect &&
          /[\u4e00-\u9FFF]/g.test(candidates[0].talentEffect)) ||
        (candidates[0].traitEffect &&
          /[\u4e00-\u9FFF]/g.test(candidates[0].traitEffect))
      ) {
        console.log(
          `No module translation found for ${moduleId} phase ${i + 1}`
        );
      }
    }

    // Add the module to the object, and if that operator already has a module,
    // insert directly into that array instead of a new object.
    if (!(operatorName in denormalizedModules)) {
      denormalizedModules[operatorName] = [];
    }
    denormalizedModules[operatorName].push(denormalizedModuleObject);
  });
  fs.writeFileSync(
    path.join(dataDir, "modules.json"),
    JSON.stringify(denormalizedModules, null, 2)
  );
})();
