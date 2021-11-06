import React, { useState } from "react";
import { css } from "@emotion/react";
import {
  useMediaQuery,
  useTheme,
  Theme,
  ButtonGroup,
  Input,
  SliderUnstyled,
  Tooltip,
  ButtonBase,
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

  const getTooltipHtml = (str: string) => {
    return str.split("\n").map((str) => {
      const strArray = str.split(" "); // split array by space to
      // extract last word in the string, and wrap it in a blue span
      return (
        <p key={str} style={{ margin: 0 }}>
          {strArray.slice(0, -1).join(" ") + " "}
          <span style={{ color: theme.palette.blue.main }}>
            {strArray[strArray.length - 1]}
          </span>
        </p>
      );
    });
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

  return (
    <section css={styles}>
      <h3 className="visually-hidden">
        {`${isSummon ? "Summon" : "Operator"} Stats`}
      </h3>
      <div className="stats-controls">
        <div className="trust-and-elite-buttons">
          <ButtonGroup variant="text" className="elite-buttons">
            <ButtonBase
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
            </ButtonBase>
            {maxElite >= 1 && (
              <ButtonBase
                className={eliteLevel === 1 ? "active" : "inactive"}
                onClick={() => {
                  setEliteLevel(1);
                }}
                aria-label="Elite 1"
              >
                <EliteOneIcon />
              </ButtonBase>
            )}
            {maxElite >= 2 && (
              <ButtonBase
                className={eliteLevel === 2 ? "active" : "inactive"}
                onClick={() => {
                  setEliteLevel(2);
                }}
                aria-label="Elite 2"
              >
                <EliteTwoIcon />
              </ButtonBase>
            )}
          </ButtonGroup>
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
        <div className="level-slider-container">
          <p>Level</p>
          <Input
            className="level-slider-input"
            value={opLevel}
            onChange={(e) => {
              if (e.target.value === "") {
                setOpLevel(1);
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
            inputProps={{
              maxLength: 2,
              onFocus: (e) => e.target.select(),
              type: "number",
            }}
          />
          <div className="level-slider-border">
            <SliderUnstyled
              className="level-slider"
              value={opLevel}
              // @ts-expect-error MUI typing tells me to do this
              onChange={(e: Event) => setOpLevel(Number(e.target.value))}
              min={1}
              max={phases[eliteLevel].maxLevel}
            />
          </div>
        </div>
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
          padding: ${theme.spacing(0, 2)};
          border: none;
          border-radius: 0;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

          &:hover {
            background-color: rgba(232, 232, 242, 0.04);
          }

          ${theme.breakpoints.down("mobile")} {
            padding: ${theme.spacing(0, 1.375)};
            border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
          }

          path {
            fill: ${theme.palette.midtoneBrighterer.main};
          }

          .elite-zero path {
            fill: transparent;
            stroke: ${theme.palette.midtoneBrighterer.main};
          }
        }

        button.elite-zero-button {
          border-top-left-radius: ${theme.spacing(0.5)};
        }

        button.active {
          background: ${theme.palette.midtoneBrighter.main};
          border-bottom: 3px solid ${theme.palette.white.main};

          path {
            fill: ${theme.palette.white.main};
          }

          .elite-zero path {
            fill: transparent;
            stroke: ${theme.palette.white.main};
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

    .mobile-spacer {
      ${theme.breakpoints.down("mobile")} {
        flex: 1 1 0;
      }
    }

    .spacer {
      flex: 1 1 0;
    }

    .level-slider-container {
      display: flex;
      flex-direction: row;
      margin-right: ${theme.spacing(2)};

      ${theme.breakpoints.down("mobile")} {
        position: relative;
        height: ${theme.spacing(8)};
        background: ${theme.palette.midtone.main};
        margin-right: 0;
        padding-left: ${theme.spacing(2)};
        border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
      }

      p {
        margin-top: auto;
        margin-bottom: auto;
      }

      .level-slider-input {
        input {
          text-align: center;
        }

        background: ${theme.palette.midtoneDarker.main};
        width: ${theme.spacing(5)};
        height: ${theme.spacing(4)};
        margin: ${theme.spacing(2, 1)};
        color: ${theme.palette.white.main};
        border-radius: ${theme.spacing(0.5)};
      }

      .level-slider-border {
        width: ${theme.spacing(32)};
        height: ${theme.spacing(3)};
        margin: auto 0;
        padding: ${theme.spacing(0.5, 2.25)};
        border-radius: ${theme.spacing(0.5)};
        border: ${theme.spacing(0.25)} solid
          ${theme.palette.midtoneBrighterer.main};

        ${theme.breakpoints.down("mobile")} {
          flex-grow: 1;
          width: 100%;
          margin-right: ${theme.spacing(2)};
        }

        .level-slider {
          display: inline-block;
          width: ${theme.spacing(32)};
          height: ${theme.spacing(3)};
          position: relative;
          cursor: pointer;

          ${theme.breakpoints.down("mobile")} {
            flex-grow: 1;
            width: 100%;
          }

          .MuiSlider-track {
            display: block;
            position: absolute;
            height: ${theme.spacing(3)};
            margin-left: ${theme.spacing(-1.75)};
            border-radius: ${theme.spacing(0.25)};
            background: ${theme.palette.midtoneBrighter.main};
          }

          .MuiSlider-rail {
            display: block;
            position: absolute;
            width: 100%;
            padding-right: ${theme.spacing(1.75)};
            height: ${theme.spacing(3)};
          }

          .MuiSlider-thumb {
            position: absolute;
            display: grid;
            margin-left: ${theme.spacing(-1.75)};
            margin-top: ${theme.spacing(0)};
            border-radius: ${theme.spacing(0.25)};
            height: ${theme.spacing(3)};
            width: ${theme.spacing(3.5)};
            background-attachment: fixed;
            background: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.5 0.5C0.776143 0.5 1 0.723858 1 1L1 10C1 10.2761 0.776142 10.5 0.5 10.5C0.223858 10.5 -1.20705e-08 10.2761 0 10L3.93396e-07 1C4.05467e-07 0.723858 0.223858 0.5 0.5 0.5Z' fill='%23484858'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 0.5C5.77614 0.5 6 0.723858 6 1L6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10L5 1C5 0.723858 5.22386 0.5 5.5 0.5Z' fill='%23484858'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.5C10.7761 0.5 11 0.723858 11 1V10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10V1C10 0.723858 10.2239 0.5 10.5 0.5Z' fill='%23484858'/%3E%3C/svg%3E%0A")
              no-repeat center ${theme.palette.gray.main};
          }

          .MuiSlider-thumb:hover {
            background: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.5 0.5C0.776143 0.5 1 0.723858 1 1L1 10C1 10.2761 0.776142 10.5 0.5 10.5C0.223858 10.5 -1.20705e-08 10.2761 0 10L3.93396e-07 1C4.05467e-07 0.723858 0.223858 0.5 0.5 0.5Z' fill='%2387879B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 0.5C5.77614 0.5 6 0.723858 6 1L6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10L5 1C5 0.723858 5.22386 0.5 5.5 0.5Z' fill='%2387879B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.5C10.7761 0.5 11 0.723858 11 1V10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10V1C10 0.723858 10.2239 0.5 10.5 0.5Z' fill='%2387879B'/%3E%3C/svg%3E%0A")
              no-repeat center ${theme.palette.white.main};
          }
        }
      }
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
