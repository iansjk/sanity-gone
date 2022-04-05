import { css } from "@emotion/react";
import { Theme, useMediaQuery, useTheme } from "@mui/material";

import { moduleImage } from "../utils/images";
import Image from "next/image";
import { ModuleObject } from "../utils/types";
import {
  AttackPowerIcon,
  AttackSpeedIcon,
  DefenseIcon,
  HealthIcon,
} from "./icons/operatorStats";
import React from "react";

export interface ModuleInfoProps {
  operatorName: string;
  module: ModuleObject;
}

const ModuleInfo: React.VFC<ModuleInfoProps> = (props) => {
  const { operatorName, module } = props;
  const { moduleId, moduleObject, moduleEffect } = module;
  const activePhase = moduleObject.phases[moduleObject.phases.length - 1];
  const attackBonus = activePhase.attributeBlackboard.find(
    (kv) => kv.key === "atk"
  )?.value;
  const healthBonus = activePhase.attributeBlackboard.find(
    (kv) => kv.key === "max_hp"
  )?.value;
  const defenseBonus = activePhase.attributeBlackboard.find(
    (kv) => kv.key === "def"
  )?.value;
  const attackSpeedBonus = activePhase.attributeBlackboard.find(
    (kv) => kv.key === "attack_speed"
  )?.value;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  return (
    <div css={styles}>
      <dl className="module-attributes">
        <div className="module-image-container">
          <Image
            className="module-image"
            src={moduleImage(moduleId)}
            alt={`${operatorName} module`}
            layout="fill"
          />
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

        <div className="effect">
          <dt>Effect</dt>
          <dd dangerouslySetInnerHTML={{ __html: moduleEffect }} />
        </div>
      </dl>
    </div>
  );
};
export default ModuleInfo;

const styles = (theme: Theme) => css`
  .module-attributes {
    margin: ${theme.spacing(0, 0, 0, 0.25)};
    display: grid;
    grid-auto-flow: column;
    position: relative;
    grid-template-columns: 216px 144px 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: ${theme.spacing(0.25)};

    .module-image-container {
      grid-row-start: span 2;
      position: relative;
      overflow: hidden;
      border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};

      span > img {
        padding: ${theme.spacing(0.5)} !important;
      }
    }

    // I need to do this, because --accent-color is only passed as a CSS variable
    // I can't directly modify the opacity
    .module-image-container::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: var(--accent-color);
      opacity: 0.15;
      backdrop-filter: blur(8px); // does this even do anything? whatever
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

    .effect {
      grid-column-start: 3;
      grid-row-start: span 2;
      justify-content: flex-start;

      dt {
        margin-bottom: ${theme.spacing(0.75)};
      }
      dd {
        font-weight: ${theme.typography.body1.fontWeight};
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};
        margin-top: 0;
      }

      span.keyword {
        color: ${theme.palette.blue.main};
      }
      border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
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
