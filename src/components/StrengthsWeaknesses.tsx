import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export interface StrengthsWeaknessesProps {
  strengths: MDXRemoteSerializeResult;
  weaknesses: MDXRemoteSerializeResult;
}

const StrengthsWeaknesses: React.VFC<StrengthsWeaknessesProps> = (props) => {
  const { strengths, weaknesses } = props;
  return (
    <div className="strengths-and-weaknesses" css={styles}>
      <h3 className="strengths">Strengths</h3>
      <div className="strengths-list">
        <MDXRemote {...strengths} />
      </div>
      <h3 className="weaknesses">Weaknesses</h3>
      <div className="weaknesses-list">
        <MDXRemote {...weaknesses} />
      </div>
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
    background-color: ${theme.palette.midtoneDarker.main};
  }

  h3 {
    padding: ${theme.spacing(2, 3)};
    font-size: ${theme.typography.generalHeading.fontSize}px;
    font-weight: 400;
    line-height: ${theme.typography.generalHeading.lineHeight};

    &.strengths {
      color: ${theme.palette.lime.main};
      border-top-left-radius: ${theme.spacing(0.5)};

      ${theme.breakpoints.down("mobile")} {
        border-top-right-radius: ${theme.spacing(0.5)};
      }
    }

    &.weaknesses {
      color: ${theme.palette.red.main};
      border-top-right-radius: ${theme.spacing(0.5)};

      ${theme.breakpoints.down("mobile")} {
        border-radius: 0;
      }
    }
  }

  .strengths-list,
  .weaknesses-list {
    grid-row: 2;

    &.strengths-list {
      border-bottom-left-radius: ${theme.spacing(0.5)};

      ${theme.breakpoints.down("mobile")} {
        border-radius: 0;
      }
    }

    &.weaknesses-list {
      border-bottom-right-radius: ${theme.spacing(0.5)};

      ${theme.breakpoints.down("mobile")} {
        grid-row: 4;
        border-bottom-left-radius: ${theme.spacing(0.5)};
      }
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: ${theme.spacing(2, 3)};
    }

    li::before {
      content: " ";
      display: inline-block;
      width: ${theme.spacing(1)};
      margin: ${theme.spacing(0, 2)};
      vertical-align: middle;
      border-top: 1px solid ${theme.palette.midtoneBrighter.main};
      border-bottom: 1px solid ${theme.palette.midtoneBrighter.main};
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
