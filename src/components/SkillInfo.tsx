/** @jsxImportSource @emotion/react */
import { ClassNames, css, Theme } from "@emotion/react";
import React from "react";
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
  "SP/second" = 1,
  "Offensive Recovery",
  "UNUSED",
  "Defensive Recovery",
}

export interface InterpolatedValue {
  key: string;
  value: number;
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

const descriptionTagRegex = /<(?<tagName>[^>]+)>(?<tagContent>[^<]+)<\/>/;
const descriptionInterpolationRegex = /-?{-?(?<interpolationKey>[^}:]+)(?::(?<formatString>[^}]+))?}/;
/**
 * converts game-internal skill description representations into an html-formatted description.
 * there are three tag types that are all closed with "</>":
 * - <@ba.vup>: value up, for increases
 * - <@ba.vdown>: value down, for decreases
 * - <@ba.rem>: reminder, for reminder text
 * in addition, the "blackboard" property contains values that can be interpolated into the
 * skill description using curly braces (like {this}). the {curly brace syntax} also accepts a format string,
 * e.g. {foo:0%} will interpolate the numeric value "foo" in "blackboard" and display it as a percentage.
 */
const descriptionToHtml = (
  description: string,
  interpolation: InterpolatedValue[]
): string => {
  let htmlDescription = description.slice();
  let match: RegExpMatchArray | null = null;
  do {
    match = htmlDescription.match(descriptionTagRegex);
    if (match?.groups) {
      let className = "";
      switch (match.groups.tagName) {
        case "@ba.vup":
          className = "value-up";
          break;
        case "@ba.vdown":
          className = "value-down";
          break;
        case "@ba.rem":
          className = "reminder-text";
          break;
        default:
          throw new Error(`Unrecognized tag name: ${match.groups.tagType}`);
      }
      htmlDescription = htmlDescription.replace(
        descriptionTagRegex,
        `<span class="${className}">${match.groups.tagContent}</span>`
      );
    }
  } while (match);

  do {
    match = htmlDescription.match(descriptionInterpolationRegex);
    if (match?.groups) {
      const key = match.groups.interpolationKey;
      let value = interpolation.find((value) => value.key === key)?.value;
      if (!value) {
        throw new Error(`Couldn't find matching interpolation key: ${key}`);
      }
      let interpolated = "";
      const { formatString } = match.groups;
      if (typeof formatString === "undefined") {
        interpolated = `${value}`;
      } else if (formatString === "0%") {
        // convert to percentage and suffix with "%"
        interpolated = `${value * 100}%`;
      } else if (formatString === "0.0") {
        // return as-is to one-decimal place
        interpolated = `${value.toFixed(1)}`;
      } else {
        console.warn(
          `Unrecognized format string: ${match.groups.formatString}`
        );
      }
      htmlDescription = htmlDescription.replace(
        descriptionInterpolationRegex,
        interpolated
      );
    }
  } while (match);

  return htmlDescription;
};

export interface SkillObject {
  skillId: string;
  iconId: string | null;
  levels: SkillLevelObject[];
  hidden: unknown; // unused
}

export interface SkillInfoProps {
  skillObject: SkillObject;
}

const SkillInfo: React.VFC<
  SkillInfoProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { skillObject, className, ...rest } = props;
  const { skillId, iconId, levels } = skillObject;
  const {
    name,
    description,
    spData,
    range,
    duration,
    skillType,
    blackboard,
  } = levels[levels.length - 1];
  const { initSp, spCost, spType } = spData;
  return (
    <ClassNames>
      {({ cx }) => (
        <div
          css={styles}
          className={cx(className, !range && "no-range")}
          {...rest}
        >
          <div className="skill-name-and-type">
            <img
              className="skill-icon"
              src={skillIcon(iconId, skillId)}
              alt=""
            />
            <span className="skill-name">{name}</span>
            <span className="skill-and-sp-type">
              <span className={cx("sp-type", `sp-type-${spType}`)}>
                {SkillSpType[spType]}
              </span>
              <span aria-hidden="true"> · </span>
              <span className={cx("skill-type", `skill-type-${skillType}`)}>
                {SkillType[skillType]}
              </span>
            </span>
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
          <p
            className="skill-description"
            dangerouslySetInnerHTML={{
              __html: descriptionToHtml(description, blackboard),
            }}
          />
          {range && (
            <div className="range">
              <OperatorRange rangeObject={range} />
            </div>
          )}
        </div>
      )}
    </ClassNames>
  );
};
export default SkillInfo;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: max-content max-content 1fr;
  grid-gap: ${theme.spacing(0.25)};

  &.no-range {
    grid-template-columns: 1fr;
  }

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
      font-size: ${theme.typography.subtitle.size}px;

      .sp-type-1 {
        color: ${theme.palette.lime};
      }

      .sp-type-2 {
        color: ${theme.palette.orange};
      }

      .sp-type-4 {
        color: ${theme.palette.yellow};
      }

      .skill-type {
        color: ${theme.palette.gray};
      }
    }
  }

  .sp-and-duration {
    background-color: inherit;
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
    grid-column-start: span 2;
    color: ${theme.palette.gray};
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
    margin: 0;

    .value-up {
      color: ${theme.palette.blue};
    }

    .value-down {
      color: ${theme.palette.orange};
    }

    .reminder-text {
      color: ${theme.palette.yellow};
    }
  }

  .range {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row-start: span 2;
  }
`;
