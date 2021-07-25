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
      <div className="heading-block">
        <h2>Introduction</h2>
      </div>
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
  background: #232134;
  border-radius: 8px;
  padding-bottom: 8px;

  .heading-block {
    padding: 16px 0 16px 24px;
    border-bottom: 1px solid #534f6b;

    h2 {
      margin: 0;
      text-transform: uppercase;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #f4f4f4;
    }
  }

  .introduction-meta {
    margin: 19px 0 32px;
    padding: 0 32px 0 32px;
    display: flex;
    align-items: center;

    .spacer {
      flex-grow: 1;
    }
  }

  .introduction-content {
    padding: 0 32px;

    p {
      line-height: 28px;
      margin: 0 0 24px;
    }

    b {
      color: #49b3ff;
    }
  }
`;
