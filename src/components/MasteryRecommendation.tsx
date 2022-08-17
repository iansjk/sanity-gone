import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export interface MasteryRecommendationProps {
  level: "no" | "1" | "2" | "3";
  priority?: string;
  children: React.ReactNode;
}

const MasteryRecommendation: React.FC<MasteryRecommendationProps> = (props) => {
  const { level, priority, children } = props;
  return (
    <section css={styles}>
      <h3>Skill Mastery</h3>
      <dl className="mastery-recommendation">
        <div className="recommended-rank">
          <dt>Recommended Rank</dt>
          <dd>{level === "no" ? "None" : `Mastery ${level}`}</dd>
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
export default MasteryRecommendation;

const styles = (theme: Theme) => css`
  h3 {
    font-size: ${theme.typography.generalHeading.fontSize}px;
    line-height: ${theme.typography.generalHeading.lineHeight};
    font-weight: ${theme.typography.generalHeadingBold.fontWeight};
  }

  .mastery-recommendation {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${theme.spacing(0.25)};

    ${theme.breakpoints.down("mobile")} {
      grid-template-columns: unset;
    }

    .recommended-rank {
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
    .recommended-rank,
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
