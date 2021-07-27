/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import React from "react";
import AuthorCredit, { AuthorCreditProps } from "./AuthorCredit";
import Card from "./Card";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

export type IntroductionProps = AuthorCreditProps & OperatorInfoProps;

const Introduction: React.FC<IntroductionProps> = (props) => {
  const {
    operatorEntry,
    authorDiscordTag,
    archetype,
    isLimited,
    children,
  } = props;
  return (
    <Card header="Introduction">
      <div css={styles}>
        <OperatorInfo
          operatorEntry={operatorEntry}
          archetype={archetype}
          isLimited={isLimited}
        />
        <div className="spacer" />
        <AuthorCredit authorDiscordTag={authorDiscordTag} />
      </div>
      <div className="introduction-content">{children}</div>
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
