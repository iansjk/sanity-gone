import React, { useState } from "react";
import { css } from "@emotion/react";
import { useMediaQuery, useTheme, Theme } from "@mui/material";
import Image from "next/image";
import cx from "clsx";

import {
  ArtsResistanceIcon,
  AttackPowerIcon,
  AttackSpeedIcon,
  BlockIcon,
  DPCostIcon,
  DefenseIcon,
  EliteZeroIcon,
  EliteOneIcon,
  EliteTwoIcon,
  HealthIcon,
  RedeployTimeIcon,
  PotentialTwoIcon,
  PotentialThreeIcon,
  PotentialFourIcon,
  PotentialFiveIcon,
  PotentialSixIcon,
} from "../icons/operatorStats";
import CharacterRange from "../CharacterRange";
import { CharacterObject } from "../../utils/types";
import {
  doStatsChange,
  getMaxTrustStatIncrease,
  getPotStatIncreases,
  getStatsAtLevel,
} from "../../utils/globals";
import { summonImage } from "../../utils/images";
import CustomCheckbox from "../CustomCheckbox";
import RibbonButton from "../RibbonButton";
import RibbonButtonGroup from "../RibbonButtonGroup";
import SliderWithInput from "../SliderWithInput";
import TraitInfo from "../TraitInfo";
import Tooltip from "../Tooltip";

import * as classes from "./styles.css";

const SUMMON_ICON_SIZE = 60;

export interface CharacterStatsProps {
  characterObject: CharacterObject;
}

const CharacterStats: React.VFC<CharacterStatsProps> = ({
  characterObject,
}) => {
  const { charId: id, name, profession } = characterObject;
  const isSummon = profession === "TOKEN";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const phases = characterObject.phases;
  const maxElite = phases.length - 1;
  const maxLevel = phases[phases.length - 1].maxLevel;

  const trustIncreases = !isSummon
    ? getMaxTrustStatIncrease(characterObject)
    : {
        maxHp: 0,
        atk: 0,
        def: 0,
        magicResistance: 0,
      };

  const [eliteLevel, setEliteLevelFunc] = useState(maxElite);
  const [opLevel, setOpLevel] = useState(maxLevel);
  const [trustBonus, setTrustBonus] = useState(!isSummon);
  const [potentialBonus, setPotentialBonus] = useState(false);

  const setEliteLevel = (level: number) => {
    setEliteLevelFunc(level);
    if (opLevel > phases[level].maxLevel) {
      setOpLevel(phases[level].maxLevel);
    }
  };

  const {
    artsResistance,
    attackPower,
    secondsPerAttack,
    blockCount,
    defense,
    dpCost,
    health,
    rangeObject,
    redeployTimeInSeconds,
  } = getStatsAtLevel(characterObject, {
    eliteLevel: eliteLevel,
    level: opLevel,
    trust: trustBonus,
    pots: potentialBonus,
  });

  // detect if the summon stats don't change with leveling
  const doSummonStatsChange = isSummon && doStatsChange(characterObject);

  return (
    <section>
      {!isSummon && (
        <TraitInfo
          subProfessionId={characterObject.subProfessionId}
          showSubclassIcon={true}
        />
      )}

      <h3 className="visually-hidden">
        {`${isSummon ? "Summon" : "Operator"} Stats`}
      </h3>
      {(!isSummon || doSummonStatsChange) && (
        <div className={classes.statsControls}>
          <div className={classes.trustAndEliteButtons}>
            <RibbonButtonGroup>
              <RibbonButton
                active={eliteLevel === 0}
                onClick={() => {
                  setEliteLevel(0);
                }}
                aria-label="Elite 0"
              >
                <EliteZeroIcon active={eliteLevel === 0} />
              </RibbonButton>
              {maxElite >= 1 && (
                <RibbonButton
                  active={eliteLevel === 1}
                  onClick={() => {
                    setEliteLevel(1);
                  }}
                  aria-label="Elite 1"
                >
                  <EliteOneIcon active={eliteLevel === 1} />
                </RibbonButton>
              )}
              {maxElite >= 2 && (
                <RibbonButton
                  active={eliteLevel === 2}
                  onClick={() => {
                    setEliteLevel(2);
                  }}
                  aria-label="Elite 2"
                >
                  <EliteTwoIcon active={eliteLevel === 2} />
                </RibbonButton>
              )}
            </RibbonButtonGroup>
            <div className={classes.mobileSpacer} />
            {!isSummon && (
              <div className={classes.checkboxContainer}>
                <div className={classes.checkbox}>
                  <Tooltip
                    interactive
                    trigger="mouseenter focusin"
                    content={
                      <ul className={classes.statsChangeList}>
                        {trustIncreases.maxHp > 0 && (
                          <li className={classes.statsChangeListItem}>
                            HP&nbsp;
                            <span className={classes.statChangeValue}>
                              +{trustIncreases.maxHp}
                            </span>
                          </li>
                        )}
                        {trustIncreases.atk > 0 && (
                          <li className={classes.statsChangeListItem}>
                            ATK&nbsp;
                            <span className={classes.statChangeValue}>
                              +{trustIncreases.atk}
                            </span>
                          </li>
                        )}
                        {trustIncreases.def > 0 && (
                          <li className={classes.statsChangeListItem}>
                            DEF&nbsp;
                            <span className={classes.statChangeValue}>
                              +{trustIncreases.def}
                            </span>
                          </li>
                        )}
                        {trustIncreases.magicResistance > 0 && (
                          <li className={classes.statsChangeListItem}>
                            RES&nbsp;
                            <span className={classes.statChangeValue}>
                              +{trustIncreases.magicResistance}
                            </span>
                          </li>
                        )}
                      </ul>
                    }
                  >
                    <CustomCheckbox
                      label="Trust"
                      checked={trustBonus}
                      onChange={(e) => {
                        setTrustBonus(e.target.checked);
                      }}
                    />
                  </Tooltip>
                </div>
                <div className={classes.checkbox}>
                  <Tooltip
                    interactive
                    trigger="mouseenter focusin"
                    content={
                      <ul className={classes.statsChangeList}>
                        {getPotStatIncreases(characterObject).map((pot, i) => {
                          return (
                            <li
                              key={`potential-${i}-stat-change`}
                              className={classes.statsChangeListItem}
                            >
                              {i === 0 && (
                                <PotentialTwoIcon
                                  className={classes.statsChangeListItemIcon}
                                />
                              )}
                              {i === 1 && (
                                <PotentialThreeIcon
                                  className={classes.statsChangeListItemIcon}
                                />
                              )}
                              {i === 2 && (
                                <PotentialFourIcon
                                  className={classes.statsChangeListItemIcon}
                                />
                              )}
                              {i === 3 && (
                                <PotentialFiveIcon
                                  className={classes.statsChangeListItemIcon}
                                />
                              )}
                              {i === 4 && (
                                <PotentialSixIcon
                                  className={classes.statsChangeListItemIcon}
                                />
                              )}
                              {pot.health > 0 && (
                                <span>
                                  HP&nbsp;
                                  <span className={classes.statChangeValue}>
                                    +{pot.health}
                                  </span>
                                </span>
                              )}
                              {pot.attackPower > 0 && (
                                <span>
                                  ATK&nbsp;
                                  <span className={classes.statChangeValue}>
                                    +{pot.attackPower}
                                  </span>
                                </span>
                              )}
                              {pot.defense > 0 && (
                                <span>
                                  DEF&nbsp;
                                  <span className={classes.statChangeValue}>
                                    +{pot.defense}
                                  </span>
                                </span>
                              )}
                              {pot.artsResistance > 0 && (
                                <span>
                                  RES&nbsp;
                                  <span className={classes.statChangeValue}>
                                    +{pot.artsResistance}%
                                  </span>
                                </span>
                              )}
                              {pot.dpCost < 0 && (
                                <span>
                                  DP Cost&nbsp;
                                  <span className={classes.statChangeValue}>
                                    {pot.dpCost}
                                  </span>
                                </span>
                              )}
                              {pot.attackSpeed > 0 && (
                                <span>
                                  ASPD&nbsp;
                                  <span className={classes.statChangeValue}>
                                    +{pot.attackSpeed}
                                  </span>
                                </span>
                              )}
                              {pot.redeployTimeInSeconds < 0 && (
                                <span>
                                  Redeploy Time&nbsp;
                                  <span className={classes.statChangeValue}>
                                    {pot.redeployTimeInSeconds}
                                  </span>
                                </span>
                              )}
                              {pot.description && (
                                <span className={classes.potentialDescription}>
                                  {pot.description}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    }
                  >
                    <CustomCheckbox
                      label={isMobile ? "Pot." : "Potential"}
                      checked={potentialBonus}
                      onChange={(e) => {
                        setPotentialBonus(e.target.checked);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
          <div className={classes.spacer} />
          <SliderWithInput
            label="Level"
            id={isSummon ? "summon-level" : "operator-level"}
            value={opLevel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === "") {
                setOpLevel(1);
              } else if (Number(e.target.value) > phases[eliteLevel].maxLevel) {
                setOpLevel(
                  Math.min(
                    Number(`${e.target.value}`.slice(0, 2)),
                    phases[eliteLevel].maxLevel
                  )
                );
              } else {
                setOpLevel(
                  Math.min(Number(e.target.value), phases[eliteLevel].maxLevel)
                );
              }
            }}
            onKeyPress={(e) => {
              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            maxLength={2}
            onFocus={(e) => e.target.select()}
            type="number"
            min={1}
            max={phases[eliteLevel].maxLevel}
            sliderProps={{
              value: opLevel,
              // @ts-expect-error MUI typing tells me to do this
              onChange: (e: Event) => setOpLevel(Number(e.target.value)),
              min: 1,
              max: phases[eliteLevel].maxLevel,
            }}
          />
        </div>
      )}
      <dl
        className={cx(
          isSummon ? classes.statsList.summon : classes.statsList.operator,
          isSummon && !doSummonStatsChange && classes.statsListNoStatChanges
        )}
      >
        {isSummon && (
          <div className={classes.summonIcon}>
            <Image
              src={summonImage(id)}
              alt={name}
              width={SUMMON_ICON_SIZE}
              height={SUMMON_ICON_SIZE}
            />
          </div>
        )}

        <div>
          <dt>
            <HealthIcon
              aria-hidden="true"
              pathClassName={classes.healthIconPath}
            />{" "}
            {isMobile ? "HP" : "Health"}
          </dt>
          <dd>{health}</dd>
        </div>

        <div className={classes.attackPower}>
          <dt>
            <AttackPowerIcon
              aria-hidden="true"
              pathClassName={classes.attackPowerIconPath}
            />{" "}
            {isMobile ? "ATK" : "Attack Power"}
          </dt>
          <dd>{attackPower}</dd>
        </div>

        <div>
          <dt>
            <DefenseIcon
              aria-hidden="true"
              pathClassName={classes.defenseIconPath}
            />{" "}
            {isMobile ? "DEF" : "Defense"}
          </dt>
          <dd>{defense}</dd>
        </div>

        <div>
          <dt>
            <AttackSpeedIcon
              aria-hidden="true"
              pathClassName={classes.attackSpeedIconPath}
            />{" "}
            {isMobile ? "ASPD" : "Attack Speed"}
          </dt>
          <dd>{Math.round(secondsPerAttack * 100) / 100} sec</dd>
        </div>

        <div>
          <dt>
            <ArtsResistanceIcon
              aria-hidden="true"
              pathClassName={classes.artsResistanceIconPath}
            />{" "}
            {isMobile ? "RES" : "Arts Resistance"}
          </dt>
          <dd>{artsResistance}%</dd>
        </div>

        <div>
          <dt>
            <BlockIcon
              aria-hidden="true"
              pathClassName={classes.blockIconPath}
            />{" "}
            Block
          </dt>
          <dd>{blockCount}</dd>
        </div>

        <div>
          <dt>
            <RedeployTimeIcon
              aria-hidden="true"
              pathClassName={classes.redeployTimeIconPath}
            />{" "}
            {isMobile ? "Redeploy" : "Redeploy Time"}
          </dt>
          <dd>{redeployTimeInSeconds} sec</dd>
        </div>

        <div>
          <dt>
            <DPCostIcon
              aria-hidden="true"
              pathClassName={classes.dpCostIconPath}
            />{" "}
            DP Cost
          </dt>
          <dd>{dpCost}</dd>
        </div>

        <div className={classes.range}>
          <dt className={isMobile ? "visually-hidden" : ""}>Range</dt>
          <dd className={classes.rangeDetails}>
            <CharacterRange rangeObject={rangeObject} />
          </dd>
        </div>
      </dl>
    </section>
  );
};
export default CharacterStats;

const styles = (theme: Theme) => css`
  .stats-controls {
    display: flex;
    flex-direction: row;
    height: ${theme.spacing(8)};
    background: ${theme.palette.midtone.main};
    margin-top: ${theme.spacing(3)};
    border-bottom: ${theme.spacing(0.125)} solid
      ${theme.palette.midtoneBrighterer.main};
    border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};

    ${theme.breakpoints.down("mobile")} {
      flex-direction: column-reverse;
      border-radius: 0;
      margin-top: ${theme.spacing(9)};
    }

    .trust-and-elite-buttons {
      display: flex;
      height: ${theme.spacing(8)};

      .checkbox-container {
        margin: ${theme.spacing(2, 2, 2, 0)};
        display: flex;
        flex-direction: row;

        ${theme.breakpoints.down("mobile")} {
          border: none;
        }

        .checkbox {
          margin-left: ${theme.spacing(3)};

          ${theme.breakpoints.down("mobile")} {
            margin-left: ${theme.spacing(2)};
          }

          label {
            padding: ${theme.spacing(0.25)} 0;

            ${theme.breakpoints.down("mobile")} {
              padding: ${theme.spacing(0.5)} 0;
            }
          }
        }
      }
    }

    .slider-container {
      margin-right: ${theme.spacing(2)};

      ${theme.breakpoints.down("mobile")} {
        position: relative;
        margin-right: 0;
        background: ${theme.palette.midtone.main};
        padding-left: ${theme.spacing(2)};
        border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
      }
    }

    .mobile-spacer {
      ${theme.breakpoints.down("mobile")} {
        flex: 1 1 0;
      }
    }

    .spacer {
      flex: 1 1 0;
    }
  }

  dl {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
    gap: ${theme.spacing(0.25)};
    margin-top: 0;

    ${theme.breakpoints.down("mobile")} {
      grid-auto-flow: unset;
    }

    &.operator-stats {
      grid-template-columns: repeat(4, 195fr) 224fr;

      ${theme.breakpoints.down("mobile")} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, max-content);
      }

      .attack-power {
        border-bottom-left-radius: ${theme.spacing(0.5)};

        ${theme.breakpoints.down("mobile")} {
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.spacing(0.5)};
        }
      }
    }

    &.summon-stats {
      grid-template-columns: 88fr repeat(4, 149fr) 224fr;

      ${theme.breakpoints.down("mobile")} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(6, max-content);

        .range {
          grid-row: 6;
        }
      }

      // FIXME FIXME FIXME
      &.no-stat-changes {
        margin-top: ${theme.spacing(3)};

        ${theme.breakpoints.down("mobile")} {
          margin-top: ${theme.spacing(2)};
        }
        .summon-icon {
          border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
          ${theme.breakpoints.down("mobile")} {
            border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
          }
        }
        .range {
          border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
        }
      }
    }
    // end FIXME

    .summon-icon {
      grid-row-start: span 2;

      justify-content: center;

      ${theme.breakpoints.down("mobile")} {
        grid-row-start: unset;
        grid-column: span 2;
      }

      img {
        margin: auto;
      }
    }

    .health {
      svg path {
        fill: ${theme.palette.lime.main};
      }
    }

    .attack-power {
      svg path {
        fill: ${theme.palette.red.main};
      }
    }

    .defense {
      svg path {
        fill: ${theme.palette.orange.main};
      }
    }

    .attack-speed {
      svg path {
        fill: ${theme.palette.yellow.main};
      }
    }

    .arts-resistance {
      svg path {
        fill: ${theme.palette.blue.main};
      }
    }

    .block {
      svg path {
        fill: ${theme.palette.softBlue.main};
      }
    }

    .redeploy-time {
      svg path {
        fill: ${theme.palette.pink.main};
      }
    }

    .dp-cost {
      svg path {
        fill: ${theme.palette.white.main};
      }
    }

    .range {
      grid-row-start: span 2;
      position: relative;
      border-radius: ${theme.spacing(0, 0, 0.5, 0)};

      ${theme.breakpoints.down("mobile")} {
        grid-row: 5;
        grid-column-start: span 2;
        border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
      }

      dd {
        position: absolute;
        top: -5px; /* this is needed to counteract extra space made by .visually-hidden */
        left: -5px;
        margin-top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        ${theme.breakpoints.down("mobile")} {
          position: relative;
          top: -2.5px;
          left: -2.5px;
        }
      }
    }
  }
`;
