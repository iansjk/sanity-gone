import { css, Theme } from "@emotion/react";
import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { replaceSelfClosingHtmlTags } from "../utils/globals";
import AuthorCredit, { AuthorCreditProps } from "./AuthorCredit";
import Card from "./Card";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";
import OperatorStats from "./OperatorStats";

export type IntroductionProps = AuthorCreditProps &
  OperatorInfoProps & {
    analysis: string;
  };

const Introduction: React.VFC<IntroductionProps> = (props) => {
  const {
    operatorObject,
    authorDiscordTag,
    archetype,
    isLimited,
    analysis,
  } = props;
  return (
    <Card header="Introduction">
      <div css={styles}>
        <OperatorInfo
          operatorObject={operatorObject}
          archetype={archetype}
          isLimited={isLimited}
        />
        <div className="spacer" />
        <AuthorCredit authorDiscordTag={authorDiscordTag} />
      </div>
      <div className="introduction-content">
        {parse(replaceSelfClosingHtmlTags(analysis), {
          replace: (domNode) => {
            if (
              domNode instanceof Element &&
              domNode.name.toLowerCase() === "operatorstats"
            ) {
              return <OperatorStats operatorObject={operatorObject} />;
            }
          },
        })}
      </div>
    </Card>
  );
};
export default Introduction;

const styles = (theme: Theme) => css`
  display: flex;
  align-items: center;

  .spacer {
    flex-grow: 1;
  }
`;
