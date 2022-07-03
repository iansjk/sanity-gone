import { Module, ModuleObject } from "./types";
import cnBattleEquipTable from "./ArknightsGameData/zh_CN/gamedata/excel/battle_equip_table.json";
import cnUniequipTable from "./ArknightsGameData/zh_CN/gamedata/excel/uniequip_table.json";
import enBattleEquipTable from "./ArknightsGameData/en_US/gamedata/excel/battle_equip_table.json";
import { descriptionToHtml } from "../src/utils/description-parser";
import fs from "fs";
import path from "path";

const dataDir = path.join(__dirname, "../data");

// Translations for modules that are not yet in EN.
// Format: Module ID -> Module Effect Translation
const MODULE_TRANSLATIONS: Record<string, string> = {
  // uniequip_002_skadi: "Becomes lore-accurate",
  uniequip_002_zumama: "When not blocking enemies, +.2 SP/s",
};

void (() => {
  console.log("Updating modules...");
  const denormalizedModules: Record<string, Module> = {};
  Object.entries(cnBattleEquipTable).forEach(([moduleId, moduleObject]) => {
    const operatorName: string =
      cnUniequipTable.equipDict[
        moduleId as keyof typeof cnUniequipTable.equipDict
      ].charId;
    const modObject: ModuleObject =
      moduleId in enBattleEquipTable
        ? (enBattleEquipTable[
            moduleId as keyof typeof enBattleEquipTable
          ] as unknown as ModuleObject)
        : (moduleObject as unknown as ModuleObject);

    let moduleEffect = "";

    for (let i = 0; i < modObject.phases[0].parts.length; i++) {
      if (modObject.phases[0].parts[i].overrideTraitDataBundle.candidates) {
        const curCandidates =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          modObject.phases[0].parts[i].overrideTraitDataBundle.candidates!;
        for (let j = 0; j < curCandidates.length; j++) {
          const description =
            MODULE_TRANSLATIONS[moduleId] ??
            curCandidates[j].overrideDescription ??
            curCandidates[j].additionalDescription;
          if (!description) {
            continue;
          }
          moduleEffect +=
            descriptionToHtml(description, curCandidates[j].blackboard) + "\n";
        }
      }
    }
    moduleEffect = moduleEffect.trim();

    const hasTranslation: boolean =
      !!MODULE_TRANSLATIONS[moduleId] || moduleId in enBattleEquipTable;
    denormalizedModules[operatorName] = {
      hasTranslation,
      moduleId,
      moduleEffect,
      moduleObject: modObject,
    };
  });
  fs.writeFileSync(
    path.join(dataDir, "modules.json"),
    JSON.stringify(denormalizedModules, null, 2)
  );
})();
