/** @jsxImportSource @emotion/react */
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
  font-size: ${theme.typography.body.size};
  color: ${theme.palette.white};
  background-color: ${theme.palette.background};
  padding: ${theme.spacing(2)};

  b,
  strong {
    color: ${theme.palette.blue};
    font-weight: ${theme.typography.highlight.weight};
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
`;
