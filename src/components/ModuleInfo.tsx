import { css } from "@emotion/react";
import { Theme } from "@mui/material";

import { moduleImage } from "../utils/images";
import Image from "next/image";
import { ModuleObject } from "../utils/types";
import { AttackPowerIcon, HealthIcon } from "./icons/operatorStats";
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

  return (
    <div css={styles}>
      <Image
        className="module-image"
        src={moduleImage(moduleId)}
        alt={`${operatorName} module`}
        width={216}
        height={100}
      />
      <dl className="module-attributes">
        <div className="attack">
          <dt>
            <AttackPowerIcon aria-hidden="true" /> Attack Power
          </dt>
          <dd>+{attackBonus}</dd>
        </div>

        <div className="health">
          <dt>
            <HealthIcon aria-hidden="true" /> Health
          </dt>
          <dd>+{healthBonus}</dd>
        </div>

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
  display: grid;
  grid-template-columns: 216px 1fr;
  position: relative;

  .module-attributes {
    margin: ${theme.spacing(0, 0, 0, 0.25)};
    display: grid;
    position: relative;
    grid-template-columns: 144px 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: ${theme.spacing(0.25)};

    .attack {
      svg path {
        fill: ${theme.palette.red.main};
      }
    }

    .health {
      grid-row-start: 2;
      grid-column-start: 1;

      svg path {
        fill: ${theme.palette.lime.main};
      }
    }

    .effect {
      grid-column-start: 2;
      grid-row-start: span 2;
      justify-content: flex-start;

      dd {
        font-weight: ${theme.typography.body1.fontWeight};
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};
      }

      ${theme.breakpoints.down("mobile")} {
        dt {
          margin-right: ${theme.spacing(2)};
        }
      }
    }
  }
`;
