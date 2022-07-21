import React, { useState } from "react";
import { css } from "@emotion/react";
import { Button, Menu, Theme, useMediaQuery, useTheme } from "@mui/material";

import { moduleImage, moduleTypeImage } from "../utils/images";
import Image from "next/image";
import {
  AttackPowerIcon,
  AttackSpeedIcon,
  DefenseIcon,
  HealthIcon,
} from "./icons/operatorStats";
import { DenormalizedModule } from "../utils/types";
import RibbonButton from "./RibbonButton";
import RibbonButtonGroup from "./RibbonButtonGroup";
import CharacterRange from "./CharacterRange";
import PotentialsDropdown from "./PotentialsDropdown";

export interface ModuleInfoProps {
  operatorName: string;
  module: DenormalizedModule;
}

const ModuleInfo: React.VFC<ModuleInfoProps> = (props) => {
  const { operatorName, module } = props;
  const { moduleId, moduleName, moduleIcon, phases } = module;

  const maxStage = phases.length;
  const [stage, setStageNumber] = useState(maxStage);
  const [potential, setPotential] = useState(0);

  const potentialsInUse: number[][] = [];
  // load the potentials in use

  for (let i = 0; i < phases.length; i++) {
    const curPotentialList: number[] = [];
    for (let curPot = 0; curPot <= 5; curPot++) {
      if (
        phases[i].candidates.find((obj) => obj.requiredPotentialRank === curPot)
      ) {
        curPotentialList.push(curPot);
      }
    }
    potentialsInUse.push(curPotentialList);
  }

  const setStage = (stage: number) => {
    if (!potentialsInUse[stage - 1].includes(potential)) {
      setPotential(potentialsInUse[stage - 1][0]);
    }
    setStageNumber(stage);
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const activeCandidate = phases[stage - 1].candidates.find(
    (phase) => phase.requiredPotentialRank === potential
  )!;

  const attributes = activeCandidate.attributeBlackboard;
  const attackBonus = attributes.find((kv) => kv.key === "atk")?.value;
  const healthBonus = attributes.find((kv) => kv.key === "max_hp")?.value;
  const defenseBonus = attributes.find((kv) => kv.key === "def")?.value;
  const attackSpeedBonus = attributes.find(
    (kv) => kv.key === "attack_speed"
  )?.value;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  return (
    <div css={styles}>
      <div className="module-controls">
        <RibbonButtonGroup className="stage-buttons">
          <RibbonButton
            className={stage === 1 ? "active" : "inactive"}
            onClick={() => {
              setStage(1);
            }}
            aria-label="Stage 1"
          >
            1
          </RibbonButton>
          {maxStage >= 2 && (
            <RibbonButton
              className={stage === 2 ? "active" : "inactive"}
              onClick={() => {
                setStage(2);
              }}
              aria-label="Stage 2"
            >
              2
            </RibbonButton>
          )}
          {maxStage >= 3 && (
            <RibbonButton
              className={stage === 3 ? "active" : "inactive"}
              onClick={() => {
                setStage(3);
              }}
              aria-label="Stage 3"
            >
              3
            </RibbonButton>
          )}
        </RibbonButtonGroup>
        <PotentialsDropdown
          handlePotentialChange={(pot) => setPotential(pot)}
          potentialsToShow={potentialsInUse[stage - 1]}
          currentPotential={potential}
        />
      </div>
      <dl className="module-attributes">
        <div className="module-image-container">
          <Image
            className="module-image"
            src={moduleImage(moduleId)}
            alt={`${operatorName} module`}
            layout="fill"
          />
        </div>

        <div className="module-labels">
          <div className="module-icon">
            <Image src={moduleTypeImage(moduleIcon)} width={40} height={40} />
          </div>
          <div className="module-labels-text">
            <div className="module-name-container">
              <h3 className="module-name">{moduleName}</h3>
            </div>
            <p className="module-type">{moduleIcon.toUpperCase()}</p>
          </div>
        </div>
        {attackBonus && (
          <div className="attack">
            <dt>
              <AttackPowerIcon aria-hidden="true" />{" "}
              {isMobile ? "ATK" : "Attack Power"}
            </dt>
            <dd>{attackBonus ? `+${attackBonus}` : "N/A"}</dd>
          </div>
        )}

        {healthBonus && (
          <div className="health">
            <dt>
              <HealthIcon aria-hidden="true" /> {isMobile ? "HP" : "Health"}
            </dt>
            <dd>{healthBonus ? `+${healthBonus}` : "N/A"}</dd>
          </div>
        )}

        {defenseBonus && (
          <div className="defense">
            <dt>
              <DefenseIcon aria-hidden="true" /> {isMobile ? "DEF" : "Defense"}
            </dt>
            <dd>+{defenseBonus}</dd>
          </div>
        )}

        {attackSpeedBonus && (
          <div className="attack-speed">
            <dt>
              <AttackSpeedIcon aria-hidden="true" />{" "}
              {isMobile ? "ASPD" : "Attack Speed"}
            </dt>
            <dd>+{attackSpeedBonus}</dd>
          </div>
        )}
      </dl>
      <div
        className={
          "module-effects" + (activeCandidate.displayRange ? " has-range" : "")
        }
      >
        <div className="trait-effect">
          <dt>
            {activeCandidate.traitEffectType === "update" && (
              <span className="added">ADDED</span>
            )}
            {activeCandidate.traitEffectType === "override" && (
              <span className="updated">UPDATED</span>
            )}
            Trait
          </dt>
          <dd
            dangerouslySetInnerHTML={{
              __html: activeCandidate.traitEffect ?? "No effect",
            }}
          />
        </div>
        <div className="talent-effect">
          <dt>
            {activeCandidate.talentEffect && (
              <span className="updated">UPDATED</span>
            )}
            Talent{" "}
            {activeCandidate.talentEffect && activeCandidate.talentIndex + 1}
          </dt>
          <dd
            dangerouslySetInnerHTML={{
              __html: activeCandidate.talentEffect ?? "No effect",
            }}
          />
        </div>
        {activeCandidate.displayRange && (
          <div className="module-range">
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <CharacterRange rangeObject={activeCandidate.range!} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ModuleInfo;

const styles = (theme: Theme) => css`
  .module-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: ${theme.spacing(8)};
    background: ${theme.palette.midtone.main};
    margin-top: ${theme.spacing(3)};
    border-bottom: ${theme.spacing(0.125)} solid
      ${theme.palette.midtoneBrighterer.main};
    border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};

    ${theme.breakpoints.down("mobile")} {
      padding-right: ${theme.spacing(2)};
    }

    .stage-buttons {
      margin-right: ${theme.spacing(3)};

      button {
        width: ${theme.spacing(7.5)};
        height: ${theme.spacing(8)};
        font-size: ${theme.typography.generalHeading.fontSize}px;
        line-height: ${theme.typography.generalHeading.lineHeight};
        border-radius: ${theme.spacing(0)};
        &.active {
          // this is to counterbalance the text shifting
          padding-top: 3px;
        }

        &:first-of-type {
          border-top-left-radius: ${theme.spacing(0.5)};
        }
      }

      ${theme.breakpoints.down("mobile")} {
        margin-right: 0;
        flex-grow: 1;

        button {
          width: 53px;
        }
      }
    }

    ${theme.breakpoints.down("mobile")} {
      border-radius: 0;
    }
  }

  .module-attributes {
    margin: ${theme.spacing(0, 0, 0.25, 0)};
    display: grid;
    grid-auto-flow: row;
    position: relative;
    grid-template-columns: 304px 1fr 1fr;
    grid-template-rows: repeat(2, 88px);
    gap: ${theme.spacing(0.25)};

    .module-image-container {
      grid-row-start: span 2;
      position: relative;
      overflow: hidden;
      background: ${theme.palette.midtoneDarker.main};

      span > img {
        padding: ${theme.spacing(2, 2, 0)} !important;
      }
    }

    .module-labels {
      display: flex;
      flex-direction: row;
      grid-column-start: span 2;
      align-items: center;

      .module-icon {
        height: ${theme.spacing(5)};
        padding: ${theme.spacing(0.75)};
        margin-right: ${theme.spacing(2)};
        border-radius: ${theme.spacing(1)};
        background-color: ${theme.palette.dark.main};
        flex: none;
      }

      min-width: 0;

      .module-labels-text {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        font-weight: ${theme.typography.body1Bold.fontWeight};
        line-height: 23px;
        height: ${theme.spacing(6)};
        overflow: hidden;

        .module-name-container {
          margin: ${theme.spacing(0, 0, 0.5, 0)};

          .module-name {
            white-space: nowrap;
            margin: 0;
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .module-type {
          margin: 0;
          padding: 0;
          color: ${theme.palette.gray.main};
          overflow: hidden;
        }
      }
    }

    .attack {
      svg path {
        fill: ${theme.palette.red.main};
      }
    }

    .health {
      svg path {
        fill: ${theme.palette.lime.main};
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
  }

  .module-effects {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    gap: ${theme.spacing(0.25)};

    span.keyword,
    span.potential {
      color: ${theme.palette.blue.main};
    }

    .trait-effect,
    .talent-effect {
      background: ${theme.palette.midtoneDarker.main};
      padding: ${theme.spacing(2)};

      dt {
        margin-bottom: ${theme.spacing(1)};
        font-size: ${theme.typography.body3.fontSize}px;
        line-height: ${theme.typography.body3.lineHeight};
        color: ${theme.palette.gray.main};

        span.added {
          color: ${theme.palette.lime.main};
          margin-right: ${theme.spacing(1)};
        }
        span.updated {
          color: ${theme.palette.yellow.main};
          margin-right: ${theme.spacing(1)};
        }
      }
      dd {
        font-weight: ${theme.typography.body1.fontWeight};
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};
        margin: 0;
      }
    }
    .trait-effect {
      grid-column-start: 1;
      grid-row-start: 1;
    }
    .talent-effect {
      grid-column-start: 1;
      grid-row-start: 2;
      border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
    }

    &.has-range {
      grid-template-columns: 1fr 228px;

      .talent-effect {
        border-bottom-right-radius: 0;
      }

      .module-range {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column-start: 2;
        grid-row: span 2;
        background: ${theme.palette.midtoneDarker.main};
        padding: ${theme.spacing(2)};
        border-bottom-right-radius: ${theme.spacing(0.5)};
      }
    }
  }

  ${theme.breakpoints.down("mobile")} {
    .module-attributes {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 178px repeat(2, max-content);
      grid-auto-flow: row;

      .module-image-container {
        grid-column-start: span 2;
        grid-row-start: 1;
        border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
      }

      .effect {
        grid-column-start: span 2;
        grid-row-start: 3;
        border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
        flex-direction: column;
        align-items: flex-start;
        padding: ${theme.spacing(2)};
        dd {
          font-weight: ${theme.typography.body2.fontWeight};
          font-size: ${theme.typography.body2.fontSize}px;
          line-height: ${theme.typography.body2.lineHeight};
        }
      }
    }
  }
`;
