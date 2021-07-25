/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
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
        <DiscordLogo className="discord-logo" aria-label="on Discord" />
      </span>
    </div>
  );
};
export default AuthorCredit;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  text-align: end;

  .attribution {
    display: block;
    text-transform: uppercase;
    color: ${theme.palette.gray};
  }

  .discord-tag {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .username {
      font-weight: bold;
    }

    .discriminator {
      margin-left: ${theme.spacing(0.5)};
      color: ${theme.palette.gray};
    }

    .discord-logo {
      width: 20px;
      height: 20px;
      margin-left: ${theme.spacing(1)};
      path {
        fill: ${theme.palette.gray};
      }
    }
  }
`;
