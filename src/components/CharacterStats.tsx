import { css, Theme } from "@emotion/react";
import {
  ArtsResistanceIcon,
  AttackPowerIcon,
  AttackSpeedIcon,
  BlockIcon,
  DPCostIcon,
  DefenseIcon,
  HealthIcon,
  RedeployTimeIcon,
} from "./icons/operatorStats";
import CharacterRange from "./CharacterRange";
import { CharacterObject } from "../utils/types";
import { highestCharacterStats } from "../utils/globals";
import { summonImage } from "../utils/images";
import useIsMobile from "../hooks/useIsMobile";

const SUMMON_ICON_SIZE = 60;

export interface CharacterStatsProps {
  characterObject: CharacterObject;
}

const CharacterStats: React.VFC<CharacterStatsProps> = ({
  characterObject,
}) => {
  const {
    artsResistance,
    attackPower,
    attacksPerSecond,
    blockCount,
    defense,
    dpCost,
    health,
    rangeObject,
    redeployTimeInSeconds,
  } = highestCharacterStats(characterObject);
  const { id, name, profession } = characterObject;
  const isSummon = profession === "TOKEN";
  const isMobile = useIsMobile();

  return (
    <section css={styles}>
      <h3 className="visually-hidden">
        {`${isSummon ? "Summon" : "Operator"} Stats`}
      </h3>
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
          <dd>{attacksPerSecond} sec</dd>
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
          <dt>Range</dt>
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
  dl {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
    gap: ${theme.spacing(0.25)};
    margin: ${theme.spacing(3, 0, 0)};

    ${theme.breakpoints.down("mobile")} {
      grid-auto-flow: unset;
    }

    &.operator-stats {
      grid-template-columns: repeat(4, 195fr) 224fr;
      
      ${theme.breakpoints.down("mobile")} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, max-content);
      }
    }
    
    &.summon-stats {
      grid-template-columns: 88fr repeat(4, 149fr) 224fr;

      ${theme.breakpoints.down("mobile")} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(6, max-content);
      }
    }

    .summon-icon {
      grid-row-start: span 2;

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
        fill: ${theme.palette.lime};
      }
    }

    .attack-power {
      svg path {
        fill: ${theme.palette.red};
      }
    }

    .defense {
      svg path {
        fill: ${theme.palette.orange};
      }
    }

    .attack-speed {
      svg path {
        fill: ${theme.palette.yellow};
      }
    }

    .arts-resistance {
      svg path {
        fill: ${theme.palette.blue};
      }
    }

    .block {
      svg path {
        fill: ${theme.palette.softBlue};
      }
    }

    .redeploy-time {
      svg path {
        fill: ${theme.palette.pink};
      }
    }

    .dp-cost {
      svg path {
        fill: ${theme.palette.white};
      }
    }

    .range {
      grid-row-start: span 2;
      position: relative;
      border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
      
      ${theme.breakpoints.down("mobile")} {
        grid-row: 5;
        grid-column-start: span 2;

        display: grid;
        grid-template-columns: max-content 1fr;
      }

      dd {
        margin-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        ${theme.breakpoints.down("mobile")} {
          position: relative;
          top: -2px;
        }

        ${theme.breakpoints.up("mobile")} {
          position: absolute;
          top: -5px; /* this is needed to counteract extra space made by .visually-hidden */
          left: -5px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
