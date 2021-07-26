/** @jsxImportSource @emotion/react */
import { ClassNames, css, Theme } from "@emotion/react";
import { slugify } from "../utils/globals";
import { skillIcon } from "../utils/images";
import {
  InitialSPIcon,
  SkillDurationIcon,
  SPCostIcon,
} from "./icons/skillInfo";
import OperatorRange, { RangeObject } from "./OperatorRange";

enum SkillType {
  "Passive" = 0,
  "Manual Trigger",
  "Auto Trigger",
}

enum SkillSpType {
  "SP/Sec" = 1,
  "Offensive Recovery",
  "UNUSED",
  "Defensive Recovery",
}

export interface SkillLevelObject {
  name: string;
  description: string;
  // SkillLevelObject only has rangeId (of type string) in the game data,
  // but we expect it to be denormalized into a RangeObject before being passed to <SkillInfo />
  range: RangeObject;
  skillType: SkillType;
  spData: {
    spType: SkillSpType;
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
  usageImageUrl?: string;
}

const SkillInfo: React.VFC<SkillInfoProps> = ({
  skillObject,
  usageImageUrl,
}) => {
  const { skillId, iconId, levels } = skillObject;
  const { name, description, spData, range, duration, skillType } = levels[
    levels.length - 1
  ];
  const { initSp, spCost, spType } = spData;
  return (
    <div css={styles}>
      <div className="skill-name-and-type">
        <img className="skill-icon" src={skillIcon(iconId, skillId)} alt="" />
        <span className="skill-name">{name}</span>
        <ClassNames>
          {({ cx }) => (
            <span className="skill-and-sp-type">
              <span className={cx("sp-type", slugify(SkillSpType[spType]))}>
                {SkillSpType[spType]}
              </span>
              <span aria-hidden="true"> · </span>
              <span className={cx("skill-type", slugify(SkillType[skillType]))}>
                {SkillType[skillType]}
              </span>
            </span>
          )}
        </ClassNames>
      </div>
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
        {usageImageUrl && <img src={usageImageUrl} alt="Skill usage example" />}
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
  grid-gap: ${theme.spacing(0.25)};

  & > * {
    background-color: ${theme.palette.midBackground};
  }

  .skill-name-and-type {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: max-content max-content;
    grid-column-gap: ${theme.spacing(2)};
    align-items: center;
    padding: ${theme.spacing(2)};

    .skill-name {
      font-weight: ${theme.typography.highlight.weight};
    }

    .skill-icon {
      grid-row-start: span 2;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      border: ${theme.spacing(0.25)} solid ${theme.palette.white};
      border-radius: ${theme.spacing(0.5)};
    }

    .skill-and-sp-type {
      display: block;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;

      .sp-type.spsec {
        color: ${theme.palette.lime};
      }

      .sp-type.offensive-recovery {
        color: ${theme.palette.red};
      }

      .sp-type.defensive-recovery {
        color: ${theme.palette.yellow};
      }

      .skill-type {
        color: ${theme.palette.gray};
      }
    }
  }

  .sp-and-duration {
    grid-row-start: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${theme.spacing(0.25)};
    margin: 0;

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
    color: ${theme.palette.gray};
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
  }

  .image-and-range {
    grid-row-start: span 3;
    display: flex;
    flex-direction: column;
  }
`;
