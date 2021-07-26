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

const styles = (theme: Theme) => ({
  fontFamily: theme.typography.body.family,
  fontSize: theme.typography.body.size,
  color: theme.palette.white,
  backgroundColor: theme.palette.background,
  padding: theme.spacing(2),
  "& b, & strong": {
    color: theme.palette.blue,
    fontWeight: theme.typography.highlight.weight,
  },
  "& a": {
    fontStyle: theme.typography.link.fontStyle,
    textDecoration: theme.typography.link.textDecoration,
    color: theme.palette.blue,
  },
  "& .visually-hidden:not(:focus):not(:active)": {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute" as const,
    whiteSpace: "nowrap" as const,
    width: "1px",
  },
});
