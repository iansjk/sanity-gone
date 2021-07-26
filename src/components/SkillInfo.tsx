/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import {
  InitialSPIcon,
  SkillDurationIcon,
  SPCostIcon,
} from "./icons/skillInfo";
import OperatorRange, { RangeObject } from "./OperatorRange";

export interface SkillLevelObject {
  name: string;
  description: string;
  // SkillLevelObject only has rangeId (of type string) in the game data,
  // but we expect it to be denormalized into a RangeObject before being passed to <SkillInfo />
  range: RangeObject;
  spData: {
    spType: number;
    spCost: number;
    initSp: number;
  };
  duration: number;
  // "blackboard" is used for interpolating formatted numeric values into the description,
  // e.g. "gains ATK <@ba.vup>+{atk:0%}</>, <@ba.vup>reduced</> attack interval, DEF <@ba.vup>+{def:0%}</>, ..."
  // references blackboard.atk, blackboard.def and is formatted to
  // "gains ATK +140%, reduced attack interval, DEF +80%, ..." with blue text for the interpolated values
  blackboard: {
    key: string;
    value: number;
  }[];
}

export interface SkillInfoProps {
  skillObject: {
    skillId: string;
    iconId: string | null;
    levels: SkillLevelObject[];
  };
  skillImageUrl?: string;
}

const SkillInfo: React.VFC<SkillInfoProps> = ({
  skillObject,
  skillImageUrl,
}) => {
  const { skillId, iconId, levels } = skillObject;
  const { name, description, spData, range, duration } = levels[
    levels.length - 1
  ];
  const { initSp, spCost } = spData;
  return (
    <div css={styles}>
      <div className="skill-name-and-type">{name}</div>
      <dl className="sp-and-duration">
        <div className="initial-sp">
          <dt>
            <InitialSPIcon /> Initial SP
          </dt>
          <dd>{initSp}</dd>
        </div>

        <div className="sp-cost">
          <dt>
            <SPCostIcon /> SP Cost
          </dt>
          <dd>{spCost}</dd>
        </div>

        <div className="duration">
          <dt>
            <SkillDurationIcon /> Duration
          </dt>
          <dd>{duration} sec</dd>
        </div>
      </dl>
      <div className="skill-description">{description}</div>
      <div className="image-and-range">
        {skillImageUrl && <img src={skillImageUrl} alt="Skill usage example" />}
        <OperatorRange rangeObject={range} />
      </div>
    </div>
  );
};
export default SkillInfo;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: max-content max-content 1fr;

  .sp-and-duration {
    grid-row-start: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${theme.spacing(0.25)};

    .initial-sp {
      svg path {
        fill: ${theme.palette.white};
      }
    }

    .sp-cost {
      svg path {
        fill: ${theme.palette.lime};
      }
    }

    .duration {
      svg path {
        fill: ${theme.palette.pink};
      }
    }
  }

  .skill-description {
    grid-row-start: 3;
  }

  .image-and-range {
    grid-row-start: span 3;
    display: flex;
    flex-direction: column;
  }
`;
