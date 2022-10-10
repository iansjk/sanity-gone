import React, { useState } from "react";
import cx from "clsx";

import { moduleImage, moduleTypeImage } from "../../utils/images";
import Image from "next/image";
import {
  AttackPowerIcon,
  AttackSpeedIcon,
  DefenseIcon,
  HealthIcon,
} from "../icons/operatorStats";
import { DenormalizedModule } from "../../utils/types";
import RibbonButton from "../RibbonButton";
import RibbonButtonGroup from "../RibbonButtonGroup";
import CharacterRange from "../CharacterRange";
import PotentialsDropdown from "../PotentialsDropdown";
import useMediaQuery from "../../utils/media-query";
import { breakpoints } from "../../theme-helpers";

import * as classes from "./styles.css";

export interface ModuleInfoProps {
  operatorName: string;
  module: DenormalizedModule;
}

const ModuleInfo: React.VFC<ModuleInfoProps> = (props) => {
  const { operatorName, module } = props;
  const { moduleId, moduleName, moduleIcon, phases } = module;

  const maxStage = phases.length;
  const [stage, setStageNumber] = useState(maxStage);
  const [potential, setPotential] = useState(0);

  // this is a 2D array of the potentials in use at each stage of the module
  const potentialsInUse: number[][] = [];

  // load the potentials in use
  for (let i = 0; i < phases.length; i++) {
    const curPotentialList: number[] = [];
    for (let curPot = 0; curPot <= 5; curPot++) {
      if (
        phases[i].candidates.find((obj) => obj.requiredPotentialRank === curPot)
      ) {
        curPotentialList.push(curPot);
      }
    }
    potentialsInUse.push(curPotentialList);
  }

  const setStage = (stage: number) => {
    // undefined error will occur if we try to switch to a stage which a
    // potential doesn't affect
    if (!potentialsInUse[stage - 1].includes(potential)) {
      setPotential(potentialsInUse[stage - 1][0]);
    }
    setStageNumber(stage);
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const activeCandidate = phases[stage - 1].candidates.find(
    (phase) => phase.requiredPotentialRank === potential
  )!;

  const attributes = activeCandidate.attributeBlackboard;
  const attackBonus = attributes.find((kv) => kv.key === "atk")?.value;
  const healthBonus = attributes.find((kv) => kv.key === "max_hp")?.value;
  const defenseBonus = attributes.find((kv) => kv.key === "def")?.value;
  const attackSpeedBonus = attributes.find(
    (kv) => kv.key === "attack_speed"
  )?.value;

  // HG, why did you make people have 3 module bonuses :sadge:
  const numberOfBonuses =
    (attackBonus ? 1 : 0) +
    (healthBonus ? 1 : 0) +
    (defenseBonus ? 1 : 0) +
    (attackSpeedBonus ? 1 : 0);

  const hasThreeBonuses = numberOfBonuses === 3;
  const isMobile = useMediaQuery(breakpoints.down("mobile"));

  return (
    <div>
      <div className={classes.moduleControls}>
        <RibbonButtonGroup className={classes.stageButtons}>
          {[...Array(maxStage).fill(0)].map((_, i) => (
            <RibbonButton
              key={i}
              className={classes.stageButton}
              active={stage === i + 1}
              onClick={() => setStage(i + 1)}
              aria-label={`Stage ${i + 1}`}
            >
              {i + 1}
            </RibbonButton>
          ))}
        </RibbonButtonGroup>
        <PotentialsDropdown
          onChange={(pot) => setPotential(pot)}
          potentialsToShow={potentialsInUse[stage - 1]}
          currentPotential={potential}
        />
      </div>
      <dl
        className={
          hasThreeBonuses
            ? classes.moduleAttributes.threeBonuses
            : classes.moduleAttributes.default
        }
      >
        <div className={classes.moduleImageContainer}>
          <Image
            src={moduleImage(moduleId)}
            alt={`${operatorName} module`}
            layout="fill"
          />
        </div>

        <div className={classes.moduleLabels}>
          <div className={classes.moduleIcon}>
            <Image
              src={moduleTypeImage(moduleIcon)}
              alt=""
              width={42}
              height={42}
            />
          </div>
          <h3 className={classes.moduleName}>{moduleName}</h3>
          <p className={classes.moduleType}>{moduleIcon.toUpperCase()}</p>
        </div>
        {attackBonus && (
          <div>
            <dt>
              <AttackPowerIcon
                aria-hidden="true"
                pathClassName={classes.moduleAttributeIconPath.attack}
              />{" "}
              {isMobile ? "ATK" : "Attack Power"}
            </dt>
            <dd>{attackBonus ? `+${attackBonus}` : "N/A"}</dd>
          </div>
        )}

        {healthBonus && (
          <div>
            <dt>
              <HealthIcon
                aria-hidden="true"
                pathClassName={classes.moduleAttributeIconPath.health}
              />{" "}
              {isMobile ? "HP" : "Health"}
            </dt>
            <dd>{healthBonus ? `+${healthBonus}` : "N/A"}</dd>
          </div>
        )}

        {defenseBonus && (
          <div>
            <dt>
              <DefenseIcon
                aria-hidden="true"
                pathClassName={classes.moduleAttributeIconPath.defense}
              />{" "}
              {isMobile ? "DEF" : "Defense"}
            </dt>
            <dd>+{defenseBonus}</dd>
          </div>
        )}

        {attackSpeedBonus && (
          <div>
            <dt>
              <AttackSpeedIcon
                aria-hidden="true"
                pathClassName={classes.moduleAttributeIconPath.attackSpeed}
              />{" "}
              {isMobile ? "ASPD" : "Attack Speed"}
            </dt>
            <dd>+{attackSpeedBonus}</dd>
          </div>
        )}
      </dl>
      <div
        className={cx(
          classes.moduleEffects.default,
          activeCandidate.displayRange && classes.moduleEffects.hasRange,
          !activeCandidate.talentEffect && classes.moduleEffects.noTalent
        )}
      >
        <div className={classes.traitEffect}>
          <dt className={classes.moduleEffectDt}>
            {activeCandidate.traitEffectType === "update" && (
              <span className={classes.moduleEffectAdded}>Added</span>
            )}
            {activeCandidate.traitEffectType === "override" && (
              <span className={classes.moduleEffectUpdated}>Updated</span>
            )}
            Trait
          </dt>
          <dd
            className={classes.moduleEffectDd}
            dangerouslySetInnerHTML={{
              __html: activeCandidate.traitEffect ?? "No effect",
            }}
          />
        </div>
        {activeCandidate.talentEffect && (
          <div className={classes.talentEffect}>
            <dt className={classes.moduleEffectDt}>
              {activeCandidate.talentEffect &&
                (activeCandidate.talentIndex === -1 ? ( // new talent added
                  <span className={classes.moduleEffectAdded}>ADDED</span>
                ) : (
                  // current talent updated
                  <span className={classes.moduleEffectUpdated}>UPDATED</span>
                ))}
              {
                activeCandidate.talentEffect
                  ? activeCandidate.talentIndex === -1
                    ? "New Talent" // there is a new talent
                    : `Talent ${activeCandidate.talentIndex + 1}` // this is the talent modified
                  : "Talent" /* no talent modifications */
              }
            </dt>
            <dd
              className={classes.moduleEffectDd}
              dangerouslySetInnerHTML={{
                __html: activeCandidate.talentEffect ?? "No effect",
              }}
            />
          </div>
        )}
        {activeCandidate.displayRange && (
          <div className={classes.moduleRange}>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <CharacterRange rangeObject={activeCandidate.range!} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ModuleInfo;
