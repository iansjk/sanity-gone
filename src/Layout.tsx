/** @jsxImportSource @emotion/react */

import { Theme } from "@emotion/react";

const Layout: React.FC = ({ children }) => {
  return <main css={styles}>{children}</main>;
};
export default Layout;

const styles = (theme: Theme) => ({
  fontFamily: theme.typography.body.family,
  fontSize: theme.typography.body.size,
  color: theme.palette.white,
  backgroundColor: theme.palette.background,
  padding: theme.spacing(2),
  "& b, & strong": {
    fontWeight: theme.typography.highlight.weight,
  },
  "& a": {
    fontStyle: theme.typography.link.fontStyle,
    textDecoration: theme.typography.link.textDecoration,
  },
});
