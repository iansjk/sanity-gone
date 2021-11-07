import React, { useState } from "react";
import { css } from "@emotion/react";
import {
  useMediaQuery,
  useTheme,
  Theme,
  Input,
  SliderUnstyled,
  Tooltip,
  styled,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";

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
} from "./icons/operatorStats";
import CharacterRange from "./CharacterRange";
import { CharacterObject } from "../utils/types";
import {
  getPotentialIncreaseString,
  getStatsAtLevel,
  getTrustIncreaseString,
} from "../utils/globals";
import { summonImage } from "../utils/images";
import CustomCheckbox from "./CustomCheckbox";
import RibbonButton from "./RibbonButton";
import RibbonButtonGroup from "./RibbonButtonGroup";
import SliderWithInput from "./SliderWithInput";

const SUMMON_ICON_SIZE = 60;

const StatsChangeTooltip = styled(({ className, ...rest }: TooltipProps) => (
  <Tooltip
    {...rest}
    classes={{ popper: className }}
    placement="top"
    arrow={true}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.black.main,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(0.25),
    fontSize: theme.typography.body3.fontSize,
    lineHeight: theme.typography.body3.lineHeight,
    textAlign: "left",
    ul: {
      margin: 0,
      padding: 0,
      listStyleType: "none",
      ".stat-value": {
        color: theme.palette.blue.main,
      },
    },
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.black.main,
  },
}));

export interface CharacterStatsProps {
  characterObject: CharacterObject;
}

const CharacterStats: React.VFC<CharacterStatsProps> = ({
  characterObject,
}) => {
  const { id, name, profession } = characterObject;
  const isSummon = profession === "TOKEN";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const phases = characterObject.phases;
  const maxElite = phases.length - 1;
  const maxLevel = phases[phases.length - 1].maxLevel;

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

  // str: set of stat changes separated by newlines, e.g. ""DP Cost -3\nRedeploy Time -10"
  const getTooltipHtml = (str: string) => (
    <ul>
      {str.split("\n").map((line) => {
        const words = line.split(" ");
        const value = words[words.length - 1];
        const stat = words.slice(0, -1).join(" ");
        return (
          <li key={stat}>
            {stat} <span className="stat-value">{value}</span>
          </li>
        );
      })}
    </ul>
  );

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

  return (
    <section css={styles}>
      <h3 className="visually-hidden">
        {`${isSummon ? "Summon" : "Operator"} Stats`}
      </h3>
      <div className="stats-controls">
        <div className="trust-and-elite-buttons">
          <RibbonButtonGroup className="elite-buttons">
            <RibbonButton
              className={
                "elite-zero-button " +
                (eliteLevel === 0 ? "active" : "inactive")
              }
              onClick={() => {
                setEliteLevel(0);
              }}
              aria-label="Elite 0"
            >
              <EliteZeroIcon className="elite-zero" />
            </RibbonButton>
            {maxElite >= 1 && (
              <RibbonButton
                className={eliteLevel === 1 ? "active" : "inactive"}
                onClick={() => {
                  setEliteLevel(1);
                }}
                aria-label="Elite 1"
              >
                <EliteOneIcon />
              </RibbonButton>
            )}
            {maxElite >= 2 && (
              <RibbonButton
                className={eliteLevel === 2 ? "active" : "inactive"}
                onClick={() => {
                  setEliteLevel(2);
                }}
                aria-label="Elite 2"
              >
                <EliteTwoIcon />
              </RibbonButton>
            )}
          </RibbonButtonGroup>
          <div className="mobile-spacer" />
          {!isSummon && (
            <div className="checkbox-container">
              <div className="checkbox">
                <StatsChangeTooltip
                  title={getTooltipHtml(
                    getTrustIncreaseString(characterObject)
                  )}
                >
                  <div>
                    <CustomCheckbox
                      label="Trust"
                      checked={trustBonus}
                      onChange={(e) => {
                        setTrustBonus(e.target.checked);
                      }}
                    />
                  </div>
                </StatsChangeTooltip>
              </div>
              <div className="checkbox">
                <StatsChangeTooltip
                  title={getTooltipHtml(
                    getPotentialIncreaseString(characterObject)
                  )}
                >
                  <div>
                    <CustomCheckbox
                      label={isMobile ? "Pot." : "Potential"}
                      checked={potentialBonus}
                      onChange={(e) => {
                        setPotentialBonus(e.target.checked);
                      }}
                    />
                  </div>
                </StatsChangeTooltip>
              </div>
            </div>
          )}
        </div>
        <div className="spacer" />
        <SliderWithInput
          label="Level"
          identifier={isSummon ? "summon-level" : "operator-level"}
          inputProps={{
            value: opLevel,
            onChange: (e) => {
              if (e.target.value === "") {
                setOpLevel(1);
              } else if (Number(e.target.value) > phases[eliteLevel].maxLevel) {
                setOpLevel(Number(`${e.target.value}`.slice(0, 2)));
              } else {
                setOpLevel(
                  Math.min(Number(e.target.value), phases[eliteLevel].maxLevel)
                );
              }
            },
            onKeyPress: (e) => {
              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            },
            inputProps: {
              maxLength: 2,
              onFocus: (e) => e.target.select(),
              type: "number",
              min: 1,
              max: phases[eliteLevel].maxLevel,
            },
          }}
          sliderProps={{
            value: opLevel,
            // @ts-expect-error MUI typing tells me to do this
            onChange: (e: Event) => setOpLevel(Number(e.target.value)),
            min: 1,
            max: phases[eliteLevel].maxLevel,
          }}
        />
      </div>
      <dl className={isSummon ? "summon-stats" : "operator-stats"}>
        {isSummon && (
          <div className="summon-icon">
            <img
              src={summonImage(id)}
              alt={name}
              width={SUMMON_ICON_SIZE}
              height={SUMMON_ICON_SIZE}
            />
          </div>
        )}

        <div className="health">
          <dt>
            <HealthIcon aria-hidden="true" /> {isMobile ? "HP" : "Health"}
          </dt>
          <dd>{health}</dd>
        </div>

        <div className="attack-power">
          <dt>
            <AttackPowerIcon aria-hidden="true" />{" "}
            {isMobile ? "ATK" : "Attack Power"}
          </dt>
          <dd>{attackPower}</dd>
        </div>

        <div className="defense">
          <dt>
            <DefenseIcon aria-hidden="true" /> {isMobile ? "DEF" : "Defense"}
          </dt>
          <dd>{defense}</dd>
        </div>

        <div className="attack-speed">
          <dt>
            <AttackSpeedIcon aria-hidden="true" />{" "}
            {isMobile ? "ASPD" : "Attack Speed"}
          </dt>
          <dd>{Math.round(secondsPerAttack * 100) / 100} sec</dd>
        </div>

        <div className="arts-resistance">
          <dt>
            <ArtsResistanceIcon aria-hidden="true" />{" "}
            {isMobile ? "RES" : "Arts Resistance"}
          </dt>
          <dd>{artsResistance}%</dd>
        </div>

        <div className="block">
          <dt>
            <BlockIcon aria-hidden="true" /> Block
          </dt>
          <dd>{blockCount}</dd>
        </div>

        <div className="redeploy-time">
          <dt>
            <RedeployTimeIcon aria-hidden="true" />{" "}
            {isMobile ? "Redeploy" : "Redeploy Time"}
          </dt>
          <dd>{redeployTimeInSeconds} sec</dd>
        </div>

        <div className="dp-cost">
          <dt>
            <DPCostIcon aria-hidden="true" /> DP Cost
          </dt>
          <dd>{dpCost}</dd>
        </div>

        <div className="range">
          <dt className={isMobile ? "visually-hidden" : ""}>Range</dt>
          <dd>
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

      .elite-buttons {
        height: ${theme.spacing(8)};

        button {
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
    }

    .summon-icon {
      grid-row-start: span 2;
      border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};

      ${theme.breakpoints.down("mobile")} {
        grid-row-start: unset;
        grid-column: span 2;
        border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
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
