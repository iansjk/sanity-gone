/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface AuthorCreditProps {
  authorDiscordTag: string;
}

const AuthorCredit: React.VFC<AuthorCreditProps> = (props) => {
  const { authorDiscordTag } = props;
  const [username, discriminator] = authorDiscordTag.split("#");
  return (
    <div css={styles}>
      <span className="attribution">Guide written by</span>
      <span className="discord-tag">
        <span className="username">{username}</span>
        <span className="discriminator">#{discriminator}</span>
      </span>
    </div>
  );
};
export default AuthorCredit;

const styles = css`
  display: flex;
  flex-direction: column;
  text-align: end;

  .attribution {
    display: block;
    text-transform: uppercase;
    color: #998dba;
    font-size: 16px;
    letter-spacing: 1px;
  }

  .discord-tag {
    display: block;
    margin-top: 14px;

    .username {
      font-weight: bold;
    }

    .discriminator {
      opacity: 0.5;

      &::before {
        content: " ";
      }
    }
  }
`;
