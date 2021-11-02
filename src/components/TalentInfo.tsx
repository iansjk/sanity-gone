import { css, ClassNames } from "@emotion/react";
import { Theme } from "@mui/material";

import {
  descriptionToHtml,
  InterpolatedValue,
} from "../utils/description-parser";
import { RangeObject } from "../utils/types";
import CharacterRange from "./CharacterRange";

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

  const highestElite = Math.max(
    ...talentObject.candidates.map(
      (talentPhase) => talentPhase.unlockCondition.phase
    )
  );
  const highestEliteTalentPhases = talentObject.candidates.filter(
    (talentPhase) => talentPhase.unlockCondition.phase === highestElite
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const activePhase = highestEliteTalentPhases.find(
    (talentPhase) => talentPhase.requiredPotentialRank === 0
  )!;

  return (
    <ClassNames>
      {({ cx }) => (
        <section
          className={cx(className, !activePhase.range && "no-range")}
          css={styles}
          {...rest}
        >
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
  grid-template-rows: repeat(2, max-content);
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
    }

    .talent-description {
      border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
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
    grid-column-start: 1;
    margin: 0;
    padding: ${theme.spacing(2)};
    border-bottom-left-radius: ${theme.spacing(0.5)};
  }

  .range {
    grid-row-start: 1;
    grid-row-end: span 2;
    grid-column-start: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
  }
`;
