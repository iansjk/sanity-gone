import { useState } from "react";
import { css, ClassNames } from "@emotion/react";
import { Theme } from "@mui/material";

import {
  descriptionToHtml,
  InterpolatedValue,
} from "../utils/description-parser";
import {
  EliteZeroIcon,
  EliteOneIcon,
  EliteTwoIcon,
} from "./icons/operatorStats";
import { RangeObject } from "../utils/types";
import CharacterRange from "./CharacterRange";
import RibbonButton from "./RibbonButton";
import RibbonButtonGroup from "./RibbonButtonGroup";
import PotentialsDropdown from "./PotentialsDropdown";

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
  defaultRanges?: RangeObject[];
};

export const TalentInfo: React.VFC<TalentInfoProps> = (props) => {
  const { talentObject, className, defaultRanges, ...rest } = props;

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
  const extendRange = activePhase?.blackboard.find(kv => kv.key === "ability_range_forward_extend")?.value;

  return activePhase ? (
    <ClassNames>
      {({ cx }) => (
        <section
          className={cx(className, !activePhase.range && !extendRange && "no-range")}
          css={styles}
          {...rest}
        >
          <div className="talent-header">
            <RibbonButtonGroup className="elite-buttons">
              {elitesList.map((elite) => (
                <RibbonButton
                  key={`Elite ${elite}`}
                  className={eliteLevel === elite ? "active" : "inactive"}
                  onClick={() => {
                    updateActivePhase(elite, potential);
                  }}
                  aria-label={`Elite ${elite}`}
                >
                  {elite === 0 && <EliteZeroIcon className="elite-zero" />}
                  {elite === 1 && <EliteOneIcon />}
                  {elite === 2 && <EliteTwoIcon />}
                </RibbonButton>
              ))}
            </RibbonButtonGroup>
            <PotentialsDropdown
              currentPotential={potential}
              potentialsToShow={potentialsMap[eliteLevel]}
              handlePotentialChange={(pot) =>
                updateActivePhase(eliteLevel, pot)
              }
            />
          </div>
          <h3 className="talent-name">{activePhase.name}</h3>
          <p
            className="talent-description"
            dangerouslySetInnerHTML={{
              __html: descriptionToHtml(
                activePhase.description,
                activePhase.blackboard
              ),
            }}
          />
          {(activePhase.range || (defaultRanges && defaultRanges[eliteLevel] && extendRange)) && (
            <div className="range">
              <CharacterRange
                rangeObject={activePhase.range ?? { ...defaultRanges![eliteLevel] }}
                forwardExtend={extendRange}
              />
            </div>
          )}
        </section>
      )}
    </ClassNames>
  ) : null;
};
export default TalentInfo;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-rows: repeat(3, max-content);
  grid-template-columns: 672fr 244fr;
  gap: ${theme.spacing(0.25)};
  margin-top: ${theme.spacing(3)};

  ${theme.breakpoints.down("mobile")} {
    margin-top: ${theme.spacing(2)};
  }

  & > * {
    background-color: ${theme.palette.midtoneDarker.main};
  }

  &.no-range {
    grid-template-columns: 1fr;

    .talent-name {
      border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
      grid-column-start: 1;
      grid-column: span 2;
    }

    .talent-description {
      border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
      grid-column-start: 1;
      grid-column: span 2;
    }
  }

  .talent-header {
    height: ${theme.spacing(8)};
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-column: span 2;
    margin-bottom: ${theme.spacing(-0.25)};
    border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};
    background: ${theme.palette.midtone.main};
    border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};

    ${theme.breakpoints.down("mobile")} {
      padding-right: ${theme.spacing(2)};
    }

    .elite-buttons {
      margin-right: ${theme.spacing(3)};

      ${theme.breakpoints.down("mobile")} {
        margin-right: 0;
        flex-grow: 1;

        button {
          // change this line to 1.5 when we shrink buttons
          padding: ${theme.spacing(0, 1.5)};
          border-radius: 0;
        }
      }

      button {
        height: ${theme.spacing(8)};

        ${theme.breakpoints.down("mobile")} {
          border-radius: 0;
          &:first-of-type {
            border-top-left-radius: ${theme.spacing(0.5)};
          }
        }

        path {
          fill: ${theme.palette.midtoneBrighterer.main};
        }

        &.active {
          path {
            fill: ${theme.palette.white.main};
          }
        }

        .elite-zero path {
          fill: transparent;
          stroke: ${theme.palette.midtoneBrighterer.main};
        }

        &.active {
          .elite-zero path {
            fill: transparent;
            stroke: ${theme.palette.white.main};
          }
        }
      }
    }
  }

  .talent-name {
    font-size: ${theme.typography.skillTalentHeading.fontSize}px;
    line-height: ${theme.typography.skillTalentHeading.lineHeight};
    font-weight: ${theme.typography.skillTalentHeading.fontWeight};
    padding: ${theme.spacing(2)};
    margin: 0;
    border-top-left-radius: ${theme.spacing(0.5)};
  }

  .talent-description {
    margin: 0;
    padding: ${theme.spacing(2)};
    border-bottom-left-radius: ${theme.spacing(0.5)};
  }

  .range {
    grid-column: 2;
    grid-row: 2 / span 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
  }
`;
