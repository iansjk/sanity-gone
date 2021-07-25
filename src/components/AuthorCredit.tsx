/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DiscordLogo from "./icons/DiscordLogo";

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
        <DiscordLogo className="discord-logo" />
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
    margin-top: 14px;
    display: flex;
    align-items: center;

    .username {
      font-weight: bold;
    }

    .discriminator {
      opacity: 0.5;

      &::before {
        content: " ";
      }
    }

    .discord-logo {
      width: 20px;
      margin-left: 8px;
      opacity: 0.2;
    }
  }
`;
