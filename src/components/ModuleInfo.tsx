import { css } from "@emotion/react";
import { Theme } from "@mui/material";

import { InterpolatedValue } from "../utils/description-parser";
import { moduleImage } from "../utils/images";

interface ModuleObject {
  phases: {
    equipLevel: number;
    parts: unknown[];
    attributeBlackboard: InterpolatedValue[];
    tokenAttributeBlackboard: unknown;
  }[];
}

export interface ModuleInfoProps {
  operatorName: string;
  moduleId: string;
  moduleObject: ModuleObject;
  moduleEffect: string;
}

const ModuleInfo: React.VFC<ModuleInfoProps> = (props) => {
  const { operatorName, moduleId, moduleObject, moduleEffect } = props;
  const activePhase = moduleObject.phases[moduleObject.phases.length - 1];
  const attackBonus = activePhase.attributeBlackboard.find(
    (kv) => kv.key === "atk"
  )?.value;
  const healthBonus = activePhase.attributeBlackboard.find(
    (kv) => kv.key === "max_hp"
  )?.value;

  return (
    <div css={styles}>
      <img
        className="module-image"
        src={moduleImage(moduleId)}
        alt={`Operator module for ${operatorName}`}
      />
      <dl className="module-attributes">
        <div className="attack">
          <dt>Attack Power</dt>
          <dd>{attackBonus}</dd>
        </div>

        <div className="health">
          <dt>Health</dt>
          <dd>{healthBonus}</dd>
        </div>

        <div className="effect">
          <dt>Effect</dt>
          <dd>{moduleEffect}</dd>
        </div>
      </dl>
    </div>
  );
};
export default ModuleInfo;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 216px 1fr;

  .module-image {
    width: 100%;
    height: 100%;
  }

  .module-attributes {
    margin: ${theme.spacing(0, 0, 0, 0.25)};
    display: grid;
    grid-template-columns: 144fr 650fr;
    grid-template-rows: repeat(2, 1fr);
    gap: ${theme.spacing(0.25)};

    .health {
      grid-row-start: 2;
    }

    .effect {
      grid-column-start: 2;
      grid-row-start: span 2;
      justify-content: flex-start;
    }
  }
`;
