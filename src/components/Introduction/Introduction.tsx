import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { CharacterObject } from "../../utils/types";
import Card, { CardProps } from "../Card";
import CharacterStats from "../CharacterStats";
import OperatorInfo, { OperatorInfoProps } from "../OperatorInfo";
import StrengthsWeaknesses from "../StrengthsWeaknesses";

import * as classes from "./styles.css";

export type IntroductionProps = OperatorInfoProps & {
  summonObject?: CharacterObject;
  analysis: MDXRemoteSerializeResult;
  strengths: MDXRemoteSerializeResult;
  weaknesses: MDXRemoteSerializeResult;
  classes?: CardProps["classes"];
};

const Introduction: React.VFC<IntroductionProps> = (props) => {
  const {
    operatorObject,
    summonObject,
    isLimited,
    analysis,
    strengths,
    weaknesses,
    classes: cardClasses,
  } = props;

  const components = {
    OperatorStats: () => <CharacterStats characterObject={operatorObject} />,
    ...(summonObject != null
      ? {
          SummonStats: () => <CharacterStats characterObject={summonObject} />,
        }
      : {}),
    img: (props: React.HTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img {...props} className={classes.imgEmbed} />
    ),
  };

  return (
    <Card header="Introduction" classes={cardClasses}>
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
