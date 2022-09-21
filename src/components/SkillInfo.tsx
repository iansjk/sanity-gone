import { useState } from "react";
import { ClassNames, css } from "@emotion/react";
import { Theme } from "@mui/material";

import {
  descriptionToHtml,
  InterpolatedValue,
} from "../utils/description-parser";
import { skillIcon } from "../utils/images";
import {
  InitialSPIcon,
  SkillDurationIcon,
  SPCostIcon,
} from "./icons/skillInfo";
import CharacterRange from "./CharacterRange";
import { RangeObject } from "../utils/types";
import SliderWithInput from "./SliderWithInput";
import StarIcon from "./icons/StarIcon";
import Image from "next/image";

enum SkillType {
  "Passive" = 0,
  "Manual Trigger",
  "Auto Trigger",
}

enum SkillSpType {
  "Per Second Recovery" = 1,
  "Offensive Recovery",
  "UNUSED",
  "Defensive Recovery",
}

export interface SkillLevelObject {
  name: string;
  description: string;
  // SkillLevelObject only has rangeId (of type string) in the game data,
  // but we expect it to be denormalized into a RangeObject before being passed to <SkillInfo />
  range: RangeObject | null;
  skillType: SkillType;
  spData: {
    spType: SkillSpType;
    spCost: number;
    initSp: number;
    levelUpCost: unknown; // unused
    maxChargeTime: unknown; // unused
    increment: unknown; // unused
  };
  duration: number;
  // "blackboard" is used for interpolating formatted numeric values into the description,
  // e.g. "gains ATK <@ba.vup>+{atk:0%}</>, <@ba.vup>reduced</> attack interval, DEF <@ba.vup>+{def:0%}</>, ..."
  // references blackboard.atk, blackboard.def and is formatted to
  // "gains ATK +140%, reduced attack interval, DEF +80%, ..." with blue text for the interpolated values
  blackboard: InterpolatedValue[];
  prefabId: unknown; // unused
}

export interface SkillObject {
  skillId: string;
  iconId: string | null;
  levels: SkillLevelObject[];
  [otherProperties: string]: unknown;
}

export interface SkillInfoProps {
  skillObject: SkillObject;
  isRecommended: boolean;
  defaultRange?: RangeObject;
}

const SkillInfo: React.VFC<
  SkillInfoProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { skillObject, className, isRecommended, defaultRange, ...rest } =
    props;
  const { skillId, iconId, levels } = skillObject;
  const { name, spData, skillType } = levels[levels.length - 1];
  const { spType } = spData;

  const maxLevel = levels.length;

  const display = (skillLvl: number) => {
    if (skillLvl >= 8) {
      return `M${skillLvl - 7}`;
    }
    return skillLvl;
  };

  const [skillLevel, setSkillLevel] = useState(maxLevel);
  const extendRange = levels[skillLevel - 1].blackboard.find(
    (kv) => kv.key === "ability_range_forward_extend"
  )?.value;

  return (
    <ClassNames>
      {({ cx }) => (
        <section
          css={styles}
          className={cx(
            className,
            !levels[skillLevel - 1].range && !extendRange && "no-range"
          )}
          {...rest}
        >
          <div className="skill-header">
            {isRecommended && (
              <span className="recommended-skill">
                <StarIcon aria-hidden="true" /> Recommended Skill
              </span>
            )}
            <div className="spacer" />
            <SliderWithInput
              label="Rank"
              identifier={`skill-rank-${skillId}`}
              inputProps={{
                value: display(skillLevel),
                onKeyPress: (e) => {
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                },
                onChange: (e) => {
                  if (e.target.value === "") {
                    setSkillLevel(1);
                  } else if (!/^(M?\d|\d+)$/.test(e.target.value)) {
                    return; //format isn't being followed, don't set the value
                  } else if (Number(e.target.value) > maxLevel) {
                    setSkillLevel(Number(`${e.target.value}`.slice(0, 1)));
                  } else {
                    setSkillLevel(Math.min(Number(e.target.value), maxLevel));
                  }
                },
                inputProps: {
                  onFocus: (e) => e.target.select(),
                },
              }}
              sliderProps={{
                value: skillLevel,
                // @ts-expect-error MUI typing tells me to do this
                onChange: (e: Event) => setSkillLevel(Number(e.target.value)),
                min: 1,
                max: maxLevel,
              }}
            />
          </div>
          <div className="skill-name-and-type">
            <div className="skill-icon">
              <Image
                src={skillIcon(iconId, skillId)}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <h3 className="skill-name">{name}</h3>
            <span className="skill-and-sp-type">
              {SkillType[levels[skillLevel - 1].skillType] !== "Passive" && (
                <span>
                  <span className={cx("sp-type", `sp-type-${spType}`)}>
                    {SkillSpType[levels[skillLevel - 1].spData.spType]}
                  </span>
                  <span aria-hidden="true"> · </span>
                </span>
              )}
              <span className={cx("skill-type", `skill-type-${skillType}`)}>
                {SkillType[levels[skillLevel - 1].skillType]}
              </span>
            </span>
          </div>
          <dl className="sp-and-duration">
            <div className="initial-sp">
              <dt>
                <InitialSPIcon /> Initial SP
              </dt>
              <dd>{levels[skillLevel - 1].spData.initSp}</dd>
            </div>

            <div className="sp-cost">
              <dt>
                <SPCostIcon /> SP Cost
              </dt>
              <dd>{levels[skillLevel - 1].spData.spCost}</dd>
            </div>

            <div className="duration">
              <dt>
                <SkillDurationIcon /> Duration
              </dt>
              <dd>
                {levels[skillLevel - 1].duration !== -1
                  ? `${levels[skillLevel - 1].duration} sec`
                  : "Infinite"}
              </dd>
            </div>
          </dl>
          <p
            className="skill-description"
            dangerouslySetInnerHTML={{
              __html: descriptionToHtml(
                levels[skillLevel - 1].description,
                levels[skillLevel - 1].blackboard
              ),
            }}
          />
          {(levels[skillLevel - 1].range || (defaultRange && extendRange)) && (
            <div className="range">
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <CharacterRange
                rangeObject={levels[skillLevel - 1].range ?? defaultRange!}
                forwardExtend={extendRange}
              />
            </div>
          )}
        </section>
      )}
    </ClassNames>
  );
};
export default SkillInfo;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, max-content) 1fr;
  gap: ${theme.spacing(0.25)};
  margin-top: ${theme.spacing(3)};

  ${theme.breakpoints.down("mobile")} {
    margin-top: ${theme.spacing(2)};
  }

  &.no-range {
    grid-template-columns: 1fr;

    .skill-name-and-type,
    .sp-and-duration {
      grid-column: span 2;
    }
  }

  ${theme.breakpoints.down("mobile")} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, max-content);
  }

  & > * {
    background-color: ${theme.palette.midtoneDarker.main};
  }

  .skill-header {
    grid-row-start: 1;
    grid-column: span 2;
    margin-bottom: ${theme.spacing(-0.25)};
    border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};

    background: ${theme.palette.midtone.main};
    border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
    display: flex;
    flex-direction: row;
    width: 100%;

    ${theme.breakpoints.down("mobile")} {
      flex-direction: column;
      margin-right: ${theme.spacing(2)};
    }

    .recommended-skill {
      display: inline-flex;
      color: ${theme.palette.yellow.main};
      font-size: ${theme.typography.skillTalentHeading.fontSize}px;
      font-weight: ${theme.typography.skillTalentHeading.fontWeight};
      line-height: ${theme.typography.skillTalentHeading.lineHeight};
      align-items: center;
      white-space: nowrap;
      margin-left: ${theme.spacing(3)};

      ${theme.breakpoints.down("mobile")} {
        margin-left: ${theme.spacing(2)};
        height: ${theme.spacing(8)};
      }

      svg path {
        fill: ${theme.palette.yellow.main};
      }

      svg {
        margin-right: ${theme.spacing(1)};
      }
    }

    .spacer {
      flex: 1 1 0;
    }

    .slider-container {
      margin-right: ${theme.spacing(2)};
      height: ${theme.spacing(8)};

      ${theme.breakpoints.down("mobile")} {
        position: relative;
        margin-right: 0;
        padding-left: ${theme.spacing(2)};
        border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
      }
    }
  }

  .skill-name-and-type {
    grid-row-start: 2;
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(2, max-content);
    column-gap: ${theme.spacing(2)};
    align-items: center;
    padding: ${theme.spacing(2)};

    ${theme.breakpoints.down("mobile")} {
      grid-column-start: span 2;
    }

    .skill-name {
      font-size: ${theme.typography.skillTalentHeading.fontSize}px;
      line-height: ${theme.typography.skillTalentHeading.lineHeight};
      font-weight: ${theme.typography.skillTalentHeading.fontWeight};
      margin: 0;
    }

    .skill-icon {
      grid-row-start: span 2;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      border: ${theme.spacing(0.25)} solid ${theme.palette.white.main};
      border-radius: ${theme.spacing(0.5)};
    }

    .skill-and-sp-type {
      display: block;
      font-size: ${theme.typography.body2.fontSize}px;
      line-height: ${theme.typography.body2.lineHeight};

      ${theme.breakpoints.down("mobile")} {
        font-size: ${theme.typography.body3.fontSize}px;
        line-height: ${theme.typography.body3.lineHeight};
      }

      .sp-type-1 {
        color: ${theme.palette.lime.main};
      }

      .sp-type-2 {
        color: ${theme.palette.orange.main};
      }

      .sp-type-4 {
        color: ${theme.palette.yellow.main};
      }

      .skill-type {
        color: ${theme.palette.gray.main};
      }
    }
  }

  .sp-and-duration {
    background-color: inherit;
    grid-row-start: 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing(0.25)};
    margin: 0;

    ${theme.breakpoints.down("mobile")} {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
    }

    .initial-sp {
      svg path {
        fill: ${theme.palette.white.main};
      }
    }

    .sp-cost {
      svg path {
        fill: ${theme.palette.lime.main};
      }
    }

    .duration {
      svg path {
        fill: ${theme.palette.pink.main};
      }

      // there is a weird 1px gap to the right of this div on desktop. TODO: Fix it.
    }
  }

  .skill-description {
    grid-row-start: 4;
    grid-column-start: span 2;
    padding: ${theme.spacing(2)};
    margin: 0;
    border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};

    .value-up {
      color: ${theme.palette.blue.main};
    }

    .value-down {
      color: ${theme.palette.orange.main};
    }

    .reminder-text {
      color: ${theme.palette.yellow.main};
    }

    .skill-tooltip {
      // maybe change this in future to be Underline when we implement tooltips
      // text-decoration: underline;
    }
  }

  .range {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row-start: span 2;

    ${theme.breakpoints.down("mobile")} {
      grid-row: 3;
      grid-column: 2;
    }
  }
`;
