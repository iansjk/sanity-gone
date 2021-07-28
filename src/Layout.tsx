import { Global, Theme, css } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          ${emotionNormalize}
        `}
      />
      <main css={styles}>{children}</main>
    </>
  );
};
export default Layout;

const styles = (theme: Theme) => css`
  font-family: ${theme.typography.body.family};
  font-size: ${theme.typography.body.size}px;
  color: ${theme.palette.white};
  background-color: ${theme.palette.background};
  padding: ${theme.spacing(2)};
  line-height: ${theme.typography.body.lineHeight};

  b,
  strong {
    color: ${theme.palette.blue};
    font-weight: ${theme.typography.skillTalentHeading.weight};
  }

  a {
    font-style: ${theme.typography.link.fontStyle};
    text-decoration: ${theme.typography.link.textDecoration};
    color: ${theme.palette.blue};
  }

  .visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  dl {
    & > div {
      padding: ${theme.spacing(2)};
      background-color: ${theme.palette.midBackground};
    }

    dt {
      font-size: 14px;
      color: ${theme.palette.gray};
      display: flex;
      align-items: center;

      svg {
        margin-right: ${theme.spacing(1)};
      }
    }

    dd {
      margin: ${theme.spacing(1)} 0 0;
      line-height: 31px;
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
