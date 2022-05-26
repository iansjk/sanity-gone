import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export interface ModuleRecommendationProps {
  priority: string;
  analysis: string;
}

const ModuleRecommendation: React.FC<ModuleRecommendationProps> = (props) => {
  const { priority, analysis } = props;
  return (
    <section css={styles}>
      <dl className="module-recommendation">
        <div className="priority">
          <dt>Priority</dt>
          <dd>{priority}</dd>
        </div>
      </dl>
      <p dangerouslySetInnerHTML={{ __html: analysis }} />
    </section>
  );
};
export default ModuleRecommendation;

const styles = (theme: Theme) => css`
  .module-recommendation {
    display: grid;

    .priority {
      border-radius: ${theme.spacing(0.5)};
      flex-direction: row;
      align-items: center;

      dd {
        margin: 0;
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};
        font-weight: ${theme.typography.body1Bold.fontWeight};
      }
    }
  }
`;
