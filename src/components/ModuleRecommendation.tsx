import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export interface ModuleRecommendationProps {
  stage: string; // apparently 1+ exists so just arbitrary string
  priority?: string;
  children: React.ReactNode;
}

const ModuleRecommendation: React.FC<
  React.PropsWithChildren<ModuleRecommendationProps>
> = (props) => {
  const { stage, priority, children } = props;
  return (
    <section css={styles}>
      <dl className="module-recommendation">
        <div className="recommended-stage">
          <dt>Recommended Stage</dt>
          <dd>{stage === "no" ? "None" : `Stage ${stage}`}</dd>
        </div>
        <div className="priority">
          <dt>Priority</dt>
          <dd>{priority ?? "--"}</dd>
        </div>
      </dl>
      {children}
    </section>
  );
};
export default ModuleRecommendation;

const styles = (theme: Theme) => css`
  .module-recommendation {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${theme.spacing(0.25)};

    ${theme.breakpoints.down("mobile")} {
      grid-template-columns: unset;
    }

    .recommended-stage {
      border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};

      ${theme.breakpoints.down("mobile")} {
        border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
      }
    }

    .priority {
      border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};

      ${theme.breakpoints.down("mobile")} {
        border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
      }
    }

    .recommended-stage,
    .priority {
      flex-direction: row;
      align-items: center;

      dt {
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};
      }

      dd {
        margin: 0;
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};
        font-weight: ${theme.typography.body1Bold.fontWeight};
      }
    }
  }
`;
