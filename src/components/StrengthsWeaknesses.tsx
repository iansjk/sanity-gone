import { css, Theme } from "@emotion/react";

export interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

const StrengthsWeaknesses: React.VFC<StrengthsWeaknessesProps> = (props) => {
  const { strengths, weaknesses } = props;
  return (
    <div className="strengths-and-weaknesses" css={styles}>
      <h3 className="strengths">Strengths</h3>
      <ul className="strengths-list">
        {strengths.map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </ul>
      <h3 className="weaknesses">Weaknesses</h3>
      <ul className="weaknesses-list">
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
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, max-content);
  gap: ${theme.spacing(0.25)};

  ${theme.breakpoints.down("mobile")} {
    grid-template-rows: repeat(4, max-content);
    grid-template-columns: 1fr;
  }

  & > * {
    margin: 0;
    padding: ${theme.spacing(2, 3)};
    background-color: ${theme.palette.midtoneDarker};
  }

  h3 {
    font-size: ${theme.typography.generalHeading.fontSize};
    font-weight: 400;
    line-height: ${theme.typography.generalHeading.lineHeight};

    &.strengths {
      color: ${theme.palette.lime};
    }

    &.weaknesses {
      color: ${theme.palette.red};
    }
  }

  ul {
    grid-row: 2;
    list-style-type: none;

    ${theme.breakpoints.down("mobile")} {
      &.weaknesses-list {
        grid-row: 4;
      }
    }

    li::before {
      content: " ";
      display: inline-block;
      width: ${theme.spacing(1)};
      margin: ${theme.spacing(0, 2)};
      vertical-align: middle;
      border-top: 1px solid ${theme.palette.midtoneBrighter};
      border-bottom: 1px solid ${theme.palette.midtoneBrighter};
    }

    li {
      margin-left: ${theme.spacing(2)};
      text-indent: -${theme.spacing(2 + 2 + 1)};
    }

    li ~ li {
      margin-top: ${theme.spacing(1)};
    }
  }
`;
