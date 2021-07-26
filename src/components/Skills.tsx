/** @jsxImportSource @emotion/react */
import { Theme, css } from "@emotion/react";
import CardWithPanels from "./CardWithPanels";
import CardPanel from "./CardPanel";

export type SkillsProps = Partial<{
  skill1Analysis: string;
  skill2Analysis: string;
  skill3Analysis: string;
}>;

const Skills: React.VFC<SkillsProps> = (props) => {
  const { skill1Analysis, skill2Analysis, skill3Analysis } = props;

  return (
    <CardWithPanels header="Skills" buttonPrefix="S" css={styles}>
      {skill1Analysis && (
        <CardPanel
          className="skill-analysis"
          dangerouslySetInnerHTML={{ __html: skill1Analysis }}
        />
      )}
      {skill2Analysis && (
        <CardPanel
          className="skill-analysis"
          dangerouslySetInnerHTML={{ __html: skill2Analysis }}
        />
      )}
      {skill3Analysis && (
        <CardPanel
          className="skill-analysis"
          dangerouslySetInnerHTML={{ __html: skill3Analysis }}
        />
      )}
    </CardWithPanels>
  );
};
export default Skills;

const styles = (theme: Theme) => css`
  b,
  strong {
    color: ${theme.palette.pink};
  }

  .skill-analysis {
    p:first-of-type {
      margin-top: 0;
    }
  }
`;
