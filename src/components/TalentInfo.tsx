import { css, ClassNames, Theme } from "@emotion/react";
import {
  descriptionToHtml,
  InterpolatedValue,
} from "../utils/description-parser";
import OperatorRange, { RangeObject } from "./OperatorRange";

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
              <OperatorRange rangeObject={activePhase.range} />
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
  grid-gap: ${theme.spacing(0.25)};
  margin-top: ${theme.spacing(3)};

  & > * {
    background-color: ${theme.palette.background};
  }

  .talent-name {
    font-weight: ${theme.typography.skillTalentHeading.weight};
    padding: ${theme.spacing(2)};
    margin: 0;
  }

  .talent-description {
    grid-column-start: 1;
    margin: 0;
    padding: ${theme.spacing(2)};
  }

  &.no-range {
    grid-template-columns: 1fr;
  }

  .range {
    grid-row-start: 1;
    grid-row-end: span 2;
    grid-column-start: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
