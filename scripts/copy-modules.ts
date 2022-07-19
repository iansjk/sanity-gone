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
  moduleName?: string;
  phases: ModuleTranslationData[];
}
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
  console.log("Updating modules...");
  const denormalizedModules: Record<string, Module[]> = {};
  Object.entries(cnBattleEquipTable).forEach(([moduleId, moduleObject]) => {
    const operatorName: string =
      cnUniequipTable.equipDict[
        moduleId as keyof typeof cnUniequipTable.equipDict
      ].charId;

    // my sanity is rapidly deteriorating
    const morbius: ModuleObject = moduleObject as unknown as ModuleObject;

    // Put in any relevant EN data
    if (moduleId in enBattleEquipTable) {
      for (let i = 0; i < morbius.phases.length; i++) {
        if (
          enBattleEquipTable[moduleId as keyof typeof enBattleEquipTable].phases
            .length > i
        ) {
          // @ts-expect-error all good
          morbius.phases[i] =
            enBattleEquipTable[
              moduleId as keyof typeof enBattleEquipTable
            ].phases[i];
        }
      }
    }

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

    const denormalizedModuleObject: Module = {
      moduleId,
      moduleIcon,
      moduleName,
      phases: [],
    };

    for (let i = 0; i < morbius.phases.length; i++) {
      const currentPhase = morbius.phases[i];
      const candidates: Record<string, ModulePhase> = {};

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

      for (let j = 0; j < currentPhase.parts.length; j++) {
        const curPart = currentPhase.parts[j];
        const target = curPart.target;

        if (target === "TRAIT" || target === "DISPLAY") {
          if (curPart.overrideTraitDataBundle.candidates === null) {
            console.error(
              `overrideTraitDataBundle is null on ${moduleId}. This should NOT happen`
            );
            continue;
          }

          const traitCandidates = curPart.overrideTraitDataBundle.candidates;

          for (let k = 0; k < traitCandidates.length; k++) {
            const curTraitCandidate = traitCandidates[k];

            if (curTraitCandidate.additionalDescription) {
              candidates[curTraitCandidate.requiredPotentialRank].traitEffect =
                descriptionToHtml(
                  curTraitCandidate.additionalDescription,
                  curTraitCandidate.blackboard
                );
              candidates[
                curTraitCandidate.requiredPotentialRank
              ].traitEffectType = "update";
            } else if (curTraitCandidate.overrideDescripton) {
              candidates[curTraitCandidate.requiredPotentialRank].traitEffect =
                descriptionToHtml(
                  curTraitCandidate.overrideDescripton,
                  curTraitCandidate.blackboard
                );
              candidates[
                curTraitCandidate.requiredPotentialRank
              ].traitEffectType = "override";
            }
          }
        } else if (target === "TALENT" || target === "TALENT_DATA_ONLY") {
          if (curPart.addOrOverrideTalentDataBundle.candidates === null) {
            console.error(
              `addOrOverrideTalentDataBundle is null on ${moduleId}. This should NOT happen`
            );
            continue;
          }

          const talentCandidates =
            curPart.addOrOverrideTalentDataBundle.candidates;

          for (let k = 0; k < talentCandidates.length; k++) {
            const curTalentCandidate = talentCandidates[k];

            if (curTalentCandidate.displayRangeId) {
              candidates[curTalentCandidate.requiredPotentialRank].range =
                rangeTable[
                  curTalentCandidate.rangeId as keyof typeof rangeTable
                ];
              candidates[
                curTalentCandidate.requiredPotentialRank
              ].displayRange = true;
            }
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

      // fix any missing effect types
      Object.values(candidates).forEach((candidate) => {
        if (
          candidate.requiredPotentialRank !== 0 &&
          !candidate.traitEffectType
        ) {
          candidate.traitEffectType = candidates[0].traitEffectType;
        }
      });

      if (moduleId in MODULE_TRANSLATIONS) {
        // replace TLs
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
      denormalizedModuleObject.phases.push({
        candidates: Object.values(candidates),
      });

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
