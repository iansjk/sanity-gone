import { css, Theme } from "@emotion/react";

export interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

const StrengthsWeaknesses: React.VFC<StrengthsWeaknessesProps> = (props) => {
  const { strengths, weaknesses } = props;
  return (
    <div css={styles}>
      <h3 className="strengths">Strengths</h3>
      <ul>
        {strengths.map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </ul>
      <h3 className="weaknesses">Weaknesses</h3>
      <ul>
        {weaknesses.map((weakness) => (
          <li key={weakness}>{weakness}</li>
        ))}
      </ul>
    </div>
  );
};
export default StrengthsWeaknesses;

const styles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content max-content;
  gap: ${theme.spacing(0.25)};
  
  h3 {
    font-size: ${theme.typography.generalHeading.size};
    font-weight: 400;
    line-height: ${theme.typography.generalHeading.lineHeight};
    margin: 0;

    &.strengths {
      color: ${theme.palette.lime};
    }

    &.weaknesses {
      color: ${theme.palette.red};
    }
  }

  ul {
    grid-row-start: 2;
    margin: 0;
    padding: 0;
  }
`;
