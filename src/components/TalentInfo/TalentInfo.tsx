import { useState } from "react";
import cx from "clsx";
import * as classes from "./styles.css";

import {
  descriptionToHtml,
  InterpolatedValue,
} from "../../utils/description-parser";
import {
  EliteZeroIcon,
  EliteOneIcon,
  EliteTwoIcon,
} from "../icons/operatorStats";
import { RangeObject } from "../../utils/types";
import CharacterRange from "../CharacterRange";
import RibbonButton from "../RibbonButton";
import RibbonButtonGroup from "../RibbonButtonGroup";
import PotentialsDropdown from "../PotentialsDropdown";

/** TalentPhaseObject refers to a given talent at a specific potential level */
interface TalentPhaseObject {
  unlockCondition: {
    phase: number;
    level: number;
  };
  requiredPotentialRank: number;
  prefabKey: unknown; // unused
  name: string;
  description: string;
  // this object only has rangeId,
  // but we'll expect that the range has been denormalized ahead of time
  range: RangeObject | null;
  // this is the same format of interpolation object as is used in SkillInfo
  blackboard: InterpolatedValue[];
}

export interface TalentObject {
  candidates: TalentPhaseObject[];
}

export type TalentInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  talentObject: TalentObject;
};

export const TalentInfo: React.VFC<TalentInfoProps> = (props) => {
  const { talentObject, className, ...rest } = props;

  const elitesList = [
    ...new Set(
      talentObject.candidates.map(
        (talentPhase) => talentPhase.unlockCondition.phase
      )
    ),
  ].sort(); //remove duplicates by spreading a set
  const highestElite = Math.max(...elitesList);

  const potentialsMap: { [eliteLevel: number]: number[] } = {};
  talentObject.candidates.forEach((talentPhase) => {
    const { phase: eliteLevel } = talentPhase.unlockCondition;
    const { requiredPotentialRank: potential } = talentPhase;
    potentialsMap[eliteLevel] = [
      ...(potentialsMap[eliteLevel] ?? []),
      potential,
    ];
  });

  const getTalentPhase = (
    eliteLevel: number,
    potential: number
  ): TalentPhaseObject | null => {
    return (
      talentObject.candidates.find(
        (talentPhase) =>
          talentPhase.requiredPotentialRank === potential &&
          talentPhase.unlockCondition.phase === eliteLevel
      ) ?? null
    );
  };

  // potentials is zero-indexed for some inane reason,
  // even though they're not zero-indexed in game
  const [eliteLevel, setEliteLevel] = useState(highestElite);
  const [potential, setPotential] = useState(potentialsMap[highestElite][0]);

  const [activePhase, setActivePhase] = useState(
    getTalentPhase(eliteLevel, potential)
  );

  const updateActivePhase = (eliteLevel: number, potential: number) => {
    let newActivePhase = getTalentPhase(eliteLevel, potential);
    if (!newActivePhase) {
      newActivePhase = getTalentPhase(eliteLevel, 0);
      setPotential(0);
    } else {
      setPotential(potential);
    }
    setEliteLevel(eliteLevel);
    setActivePhase(newActivePhase);
  };

  return activePhase ? (
    <section
      className={cx(
        className,
        activePhase.range ? classes.root : classes.rootNoRange
      )}
      {...rest}
    >
      <div className={classes.talentHeader}>
        <RibbonButtonGroup className={classes.eliteButtonGroup}>
          {elitesList.map((elite) => {
            const isActive = eliteLevel === elite;
            return (
              <RibbonButton
                key={`Elite ${elite}`}
                active={isActive}
                onClick={() => {
                  updateActivePhase(elite, potential);
                }}
                aria-label={`Elite ${elite}`}
              >
                {elite === 0 && <EliteZeroIcon active={isActive} />}
                {elite === 1 && <EliteOneIcon active={isActive} />}
                {elite === 2 && <EliteTwoIcon active={isActive} />}
              </RibbonButton>
            );
          })}
        </RibbonButtonGroup>
        <PotentialsDropdown
          currentPotential={potential}
          potentialsToShow={potentialsMap[eliteLevel]}
          onChange={(pot) => updateActivePhase(eliteLevel, pot)}
        />
      </div>
      <h3 className={classes.talentName}>{activePhase.name}</h3>
      <p
        className={classes.talentDescription}
        dangerouslySetInnerHTML={{
          __html: descriptionToHtml(
            activePhase.description,
            activePhase.blackboard
          ),
        }}
      />
      {activePhase.range && (
        <div className={classes.range}>
          <CharacterRange rangeObject={activePhase.range} />
        </div>
      )}
    </section>
  ) : null;
};
export default TalentInfo;
