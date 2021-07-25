/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import AuthorCredit, { AuthorCreditProps } from "./AuthorCredit";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

export type IntroductionProps = AuthorCreditProps & OperatorInfoProps;

const Introduction: React.VFC<IntroductionProps> = (props) => {
  const { operatorEntry, authorDiscordTag } = props;
  return (
    <div css={styles}>
      <OperatorInfo operatorEntry={operatorEntry} />
      <div className="spacer" />
      <AuthorCredit authorDiscordTag={authorDiscordTag} />
    </div>
  );
};
export default Introduction;

const styles = css`
  display: flex;
  align-items: center;

  .spacer {
    flex-grow: 1;
  }
`;
