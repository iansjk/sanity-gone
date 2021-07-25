/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import AuthorCredit, { AuthorCreditProps } from "./AuthorCredit";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";

export type IntroductionProps = AuthorCreditProps & OperatorInfoProps;

const Introduction: React.FC<IntroductionProps> = (props) => {
  const { operatorEntry, authorDiscordTag, children } = props;
  return (
    <section css={styles}>
      <div className="introduction-meta">
        <OperatorInfo operatorEntry={operatorEntry} />
        <div className="spacer" />
        <AuthorCredit authorDiscordTag={authorDiscordTag} />
      </div>
      <div className="introduction-content">{children}</div>
    </section>
  );
};
export default Introduction;

const styles = css`
  .introduction-meta {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    .spacer {
      flex-grow: 1;
    }
  }

  .introduction-content {
    p {
      line-height: 28px;
      margin: 0 0 24px;
    }

    b {
      color: #49b3ff;
    }
  }
`;
