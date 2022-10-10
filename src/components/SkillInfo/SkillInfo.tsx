import React, { useState } from "react";
import Image from "next/image";

import {
  descriptionToHtml,
  InterpolatedValue,
} from "../../utils/description-parser";
import { skillIcon } from "../../utils/images";
import {
  InitialSPIcon,
  SkillDurationIcon,
  SPCostIcon,
} from "../icons/skillInfo";
import CharacterRange from "../CharacterRange";
import { RangeObject } from "../../utils/types";
import SliderWithInput from "../SliderWithInput";
import StarIcon from "../icons/StarIcon";

import * as classes from "./styles.css";

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

interface SkillLevelObject {
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
}

const SkillInfo: React.VFC<
  SkillInfoProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { skillObject, isRecommended, ...rest } = props;
  const { skillId, iconId, levels } = skillObject;
  const { name, spData } = levels[levels.length - 1];
  const { spType } = spData;

  const maxLevel = levels.length;

  const display = (skillLvl: number) => {
    if (skillLvl >= 8) {
      return `M${skillLvl - 7}`;
    }
    return skillLvl;
  };

  const [skillLevel, setSkillLevel] = useState(maxLevel);

  return (
    <section
      className={
        levels[skillLevel - 1].range
          ? classes.root.withRange
          : classes.root.noRange
      }
      {...rest}
    >
      <div className={classes.skillHeader}>
        {isRecommended && (
          <span className={classes.recommendedSkill}>
            <StarIcon
              aria-hidden="true"
              className={classes.recommendedSkillSvg}
              pathClassName={classes.recommendedSkillSvgPath}
            />{" "}
            Recommended Skill
          </span>
        )}
        <div className={classes.spacer} />
        <SliderWithInput
          label="Rank"
          id={`skill-rank-${skillId}`}
          value={display(skillLevel)}
          onKeyPress={(e) => {
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setSkillLevel(1);
            } else if (!/^(M?\d|\d+)$/.test(e.target.value)) {
              return; //format isn't being followed, don't set the value
            } else if (Number(e.target.value) > maxLevel) {
              setSkillLevel(Number(`${e.target.value}`.slice(0, 1)));
            } else {
              setSkillLevel(Math.min(Number(e.target.value), maxLevel));
            }
          }}
          onFocus={(e) => e.target.select()}
          sliderProps={{
            value: skillLevel,
            // @ts-expect-error MUI typing tells me to do this
            onChange: (e: Event) => setSkillLevel(Number(e.target.value)),
            min: 1,
            max: maxLevel,
          }}
        />
      </div>
      <div className={classes.skillNameAndType}>
        <div className={classes.skillIcon}>
          <Image
            src={skillIcon(iconId, skillId)}
            alt=""
            width={50}
            height={50}
          />
        </div>
        <h3 className={classes.skillName}>{name}</h3>
        <span className={classes.skillAndSpType}>
          {SkillType[levels[skillLevel - 1].skillType] !== "Passive" && (
            <span>
              <span className={classes.spType[spType as 1 | 2 | 3 | 4]}>
                {SkillSpType[levels[skillLevel - 1].spData.spType]}
              </span>
              <span aria-hidden="true"> · </span>
            </span>
          )}
          <span className={classes.skillType}>
            {SkillType[levels[skillLevel - 1].skillType]}
          </span>
        </span>
      </div>
      <dl className={classes.spAndDuration}>
        <div>
          <dt>
            <InitialSPIcon pathClassName={classes.iconPath.initialSp} /> Initial
            SP
          </dt>
          <dd>{levels[skillLevel - 1].spData.initSp}</dd>
        </div>

        <div>
          <dt>
            <SPCostIcon pathClassName={classes.iconPath.spCost} /> SP Cost
          </dt>
          <dd>{levels[skillLevel - 1].spData.spCost}</dd>
        </div>

        <div>
          <dt>
            <SkillDurationIcon pathClassName={classes.iconPath.duration} />{" "}
            Duration
          </dt>
          <dd>
            {levels[skillLevel - 1].duration !== -1
              ? `${levels[skillLevel - 1].duration} sec`
              : "Infinite"}
          </dd>
        </div>
      </dl>
      <p
        className={classes.skillDescription}
        dangerouslySetInnerHTML={{
          __html: descriptionToHtml(
            levels[skillLevel - 1].description,
            levels[skillLevel - 1].blackboard
          ),
        }}
      />
      {levels[skillLevel - 1].range && (
        <div className={classes.range}>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <CharacterRange rangeObject={levels[skillLevel - 1].range!} />
        </div>
      )}
    </section>
  );
};
export default SkillInfo;
