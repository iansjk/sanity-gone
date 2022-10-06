import { Box } from "@mui/material";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CharacterObject } from "../../utils/types";

import Card from "../Card";
import CharacterStats from "../CharacterStats";
import OperatorInfo, { OperatorInfoProps } from "../OperatorInfo";
import StrengthsWeaknesses from "../StrengthsWeaknesses";

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
    img: (props: React.HTMLAttributes<HTMLImageElement>) => (
      <Box display="flex" alignItems="center" justifyContent="center">
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          {...props}
          style={{
            width: `min(100vw - 32px, 360px)`,
          }}
        />
      </Box>
    ),
  };

  return (
    <Card header="Introduction">
      <OperatorInfo operatorObject={operatorObject} isLimited={isLimited} />
      <div className="introduction-content">
        <MDXRemote {...analysis} components={components} />
        <div>
          <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
        </div>
      </div>
    </Card>
  );
};
export default Introduction;
