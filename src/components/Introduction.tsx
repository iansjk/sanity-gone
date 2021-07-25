/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
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

const styles = (theme: Theme) => css`
  background: ${theme.palette.mid};
  border-radius: ${theme.spacing(1)};
  padding-bottom: ${theme.spacing(1)};

  .heading-block {
    padding: 16px 0 16px 24px;
    border-bottom: 1px solid ${theme.palette.midHighlight};

    h2 {
      margin: 0;
      text-transform: ${theme.typography.cardHeader.textTransform};
      font-size: ${theme.typography.cardHeader.size};
      font-weight: ${theme.typography.cardHeader.weight};
      font-variant: ${theme.typography.cardHeader.fontVariant};
      letter-spacing: 1px;
      color: ${theme.palette.white};
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
      color: ${theme.palette.blue};
    }
  }
`;
