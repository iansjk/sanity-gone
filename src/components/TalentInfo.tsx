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
  PotentialOneIcon,
  PotentialTwoIcon,
  PotentialThreeIcon,
  PotentialFourIcon,
  PotentialFiveIcon,
  PotentialSixIcon,
} from "./icons/operatorStats";
import { RangeObject } from "../utils/types";
import CharacterRange from "./CharacterRange";
import RibbonButton from "./RibbonButton";
import RibbonButtonGroup from "./RibbonButtonGroup";

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
  ): TalentPhaseObject => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return talentObject.candidates.find(
      (talentPhase) =>
        talentPhase.requiredPotentialRank === potential &&
        talentPhase.unlockCondition.phase === eliteLevel
    )!;
  };

  // potentials is zero-indexed for some inane reason,
  // even though they're not zero-indexed in game
  const [eliteLevel, setEliteLevel] = useState(highestElite);
  const [potentials, setPotentials] = useState(
    potentialsMap[highestElite][potentialsMap[highestElite].length - 1]
  );

  const [activePhase, setActivePhase] = useState(
    getTalentPhase(eliteLevel, potentials)
  );

  const updateActivePhase = (eliteLevel: number, potentials: number) =>
    setActivePhase(getTalentPhase(eliteLevel, potentials));

  return (
    <ClassNames>
      {({ cx }) => (
        <section
          className={cx(className, !activePhase.range && "no-range")}
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
                    setEliteLevel(elite);
                    updateActivePhase(elite, potentials);
                  }}
                  aria-label={`Elite ${elite}`}
                >
                  {elite === 0 && <EliteZeroIcon className="elite-zero" />}
                  {elite === 1 && <EliteOneIcon />}
                  {elite === 2 && <EliteTwoIcon />}
                </RibbonButton>
              ))}
            </RibbonButtonGroup>
            <div className="divider" />
            <RibbonButtonGroup className="potential-buttons">
              {potentialsMap[eliteLevel].map((pot) => (
                <RibbonButton
                  key={`Potential ${pot}`}
                  className={potentials === pot ? "active" : "inactive"}
                  onClick={() => {
                    setPotentials(pot);
                    updateActivePhase(eliteLevel, pot);
                  }}
                  aria-label={`Potential ${pot}`}
                >
                  {pot === 0 && <PotentialOneIcon />}
                  {pot === 1 && <PotentialTwoIcon />}
                  {pot === 2 && <PotentialThreeIcon />}
                  {pot === 3 && <PotentialFourIcon />}
                  {pot === 4 && <PotentialFiveIcon />}
                  {pot === 5 && <PotentialSixIcon />}
                </RibbonButton>
              ))}
            </RibbonButtonGroup>
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
          {activePhase.range && (
            <div className="range">
              <CharacterRange rangeObject={activePhase.range} />
            </div>
          )}
        </section>
      )}
    </ClassNames>
  );
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
    grid-column: span 2;
    margin-bottom: ${theme.spacing(-0.25)};
    border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};
    background: ${theme.palette.midtone.main};
    border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};

    button {
      ${theme.breakpoints.down("mobile")} {
        // change this line to 1.5 when we shrink buttons
        padding: ${theme.spacing(0, 2)};
        border-radius: 0;
      }
    }

    .elite-buttons {
      button {
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

    .divider {
      margin: ${theme.spacing(2, 3)};
      border-right: 1px solid ${theme.palette.midtoneBrighter.main};

      ${theme.breakpoints.down("mobile")} {
        flex: 1 1 0;
        margin: 0;
        border: none;
      }
    }

    .potential-buttons {
      button {
        border-radius: 0;

        ${theme.breakpoints.down("mobile")} {
          :last-of-type {
            border-top-right-radius: ${theme.spacing(0.5)};
          }
        }

        svg {
          width: 28px;
          height: 26.66px;
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
