import { css, Theme } from "@emotion/react";
import React from "react";
import AuthorCredit, { AuthorCreditProps } from "./AuthorCredit";
import Card from "./Card";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

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
      <div
        className="introduction-content"
        dangerouslySetInnerHTML={{ __html: analysis }}
      />
    </Card>
  );
};
export default Introduction;

const styles = (theme: Theme) => css`
  margin: 0 0 ${theme.spacing(4)};
  display: flex;
  align-items: center;

  .spacer {
    flex-grow: 1;
  }
`;
