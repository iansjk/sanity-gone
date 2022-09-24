import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CharacterObject } from "../utils/types";

import Card from "./Card";
import CharacterStats from "./CharacterStats";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";
import StrengthsWeaknesses from "./StrengthsWeaknesses";

export type IntroductionProps = OperatorInfoProps & {
  summonObject?: CharacterObject;
  analysis: MDXRemoteSerializeResult;
  strengths: MDXRemoteSerializeResult;
  weaknesses: MDXRemoteSerializeResult;
};

const Introduction: React.VFC<IntroductionProps> = (props) => {
  const {
    operatorObject,
    summonObject,
    isLimited,
    analysis,
    strengths,
    weaknesses,
  } = props;

  const components = {
    OperatorStats: () => <CharacterStats characterObject={operatorObject} />,
    ...(summonObject != null
      ? {
          SummonStats: () => <CharacterStats characterObject={summonObject} />,
        }
      : {}),
  };

  return (
    <Card header="Introduction" css={styles}>
      <OperatorInfo operatorObject={operatorObject} isLimited={isLimited} />
      <div className="introduction-content">
        <MDXRemote {...analysis} components={components} />
        <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
      </div>
    </Card>
  );
};
export default Introduction;

const styles = (theme: Theme) => css`
  .strengths-and-weaknesses {
    margin: ${theme.spacing(3, 0, 0)};

    ${theme.breakpoints.down("mobile")} {
      margin: ${theme.spacing(2, 0, 0)};
    }
  }
`;
