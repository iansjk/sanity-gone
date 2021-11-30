import { css } from "@emotion/react";
import Theme from "../src/gatsby-theme-material-ui-top-layout/theme";
import TopLayout from "../src/gatsby-theme-material-ui-top-layout/components/top-layout";
import Layout from "../src/Layout";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
};

export const decorators = [
  (Story) => (
    <TopLayout theme={Theme}>
      <Layout css={styles}>
        <Story />
      </Layout>
    </TopLayout>
  ),
];

const styles = (theme) => css`
  header,
  footer,
  .navbar {
    display: none;
  }

  .header-main-wrapper {
    margin: 0;
  }

  .page-content {
    padding: ${theme.spacing(3)};
  }

  body {
    font-family: ${theme.typography.body1.family};
    background-color: #1b1b22;
  }
`;
