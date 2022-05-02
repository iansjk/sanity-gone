import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { rgba } from "polished";

import Card from "./Card";

enum Quality {
  Bad = -1,
  Okay,
  Good,
  Great,
}

enum Stage {
  Early,
  Mid,
  Late,
}

interface ProgressionItem {
  quality: Quality;
  stage: Stage;
  description: string;
}

export type ProgressionProps = {
  panelContent: string;
  progressItems: ProgressionItem[];
};

const Progression: React.VFC<ProgressionProps> = (props) => {
  const { panelContent, progressItems } = props;

  return (
    <Card header="Progression" css={styles}>
      <p>{panelContent}</p>
      {progressItems.map(({ quality, stage, description }, index) => {
        return (
          <div className={`progression-item quality-${quality}`} key={index}>
            <div className="bar-segment">
              <div className="segment-node"></div>
              <div className="segment-line"></div>
            </div>
            <div className="progression-title">
              <span className="progression-quality">{quality}</span>
              <h3>{stage}</h3>
            </div>
            <div className="progression-description">
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </Card>
  );
};
export default Progression;

const styles = (theme: Theme) => css`
  p {
    font-size: ${theme.typography.body1.fontSize}px;
    font-weight: ${theme.typography.body1.fontWeight};
    line-height: ${theme.typography.body1.lineHeight};
    color: ${theme.palette.white.main};
    margin-bottom: ${theme.spacing(3)} !important;
  }

  .progression-item {
    display: grid;
    grid-template-columns: 16px 1fr;
    grid-template-rows: auto 1fr;
    column-gap: 25px;

    .quality-0 {
      .progression-quality {
        color: ${theme.palette.red.main};
      }

      .segment-node {
        box-shadow: inset 0px 0px 0px 2.5px ${theme.palette.red.main};
      }

      segment-line {
        background-color: ${theme.palette.red.main};
      }
    }

    .quality-1 {
      .progression-quality {
        color: ${theme.palette.blue.main};
      }

      .segment-node {
        box-shadow: inset 0px 0px 0px 2.5px ${theme.palette.blue.main};
      }

      segment-line {
        background-color: ${theme.palette.blue.main};
      }
    }

    .quality-2 {
      .progression-quality {
        color: ${rgba(theme.palette.white.main, 0.66)};
      }

      .segment-node {
        box-shadow: inset 0px 0px 0px 2.5px ${theme.palette.white.main};
      }

      segment-line {
        background-color: ${theme.palette.white.main};
      }
    }

    .quality-3 {
      .progression-quality {
        color: ${theme.palette.lime.main};
      }

      .segment-node {
        box-shadow: inset 0px 0px 0px 2.5px ${theme.palette.lime.main};
      }

      segment-line {
        background-color: ${theme.palette.lime.main};
      }
    }

    .progression-title {
      display: flex;
      align-items: center;
      gap: ${theme.spacing(1.5)};

      .progression-quality {
        display: block;
        color: ${rgba(theme.palette.white.main, 0.66)};
        background-color: ${theme.palette.midtoneDarker.main};
        padding: ${theme.spacing(0.5)} ${theme.spacing()};
      }

      h3 {
        font-size: ${theme.typography.generalHeadingBold.fontSize}px;
        font-weight: ${theme.typography.generalHeadingBold.fontWeight};
        line-height: ${theme.typography.generalHeadingBold.lineHeight};
        margin: 0;
      }
    }

    .progression-description p {
      margin: ${theme.spacing(3)} 0 !important;
    }

    .bar-segment {
      grid-row: span 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing(1)};
      margin-top: ${theme.spacing(1.5)};

      .segment-node {
        box-shadow: inset 0px 0px 0px 2.5px ${theme.palette.white.main};
        width: ${theme.spacing(2)};
        height: ${theme.spacing(2.5)};
        border-radius: 3px;
        transform: rotate(45deg);
      }

      .segment-line {
        width: 1px;
        background-color: ${theme.palette.white.main};
        opacity: 0.33;
        height: 100%;
        margin-right: 1px;
      }
    }
  }
`;
