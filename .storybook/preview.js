import { css, ThemeProvider } from "@emotion/react";
import { defaultTheme } from "../src/theme";
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
    <ThemeProvider theme={defaultTheme}>
      <Layout css={styles}>
        <Story />
      </Layout>
    </ThemeProvider>
  ),
];

const styles = (theme) => css`
  header,
  footer {
    display: none;
  }

  .header-main-wrapper {
    margin: 0;
  }

  .page-content {
    padding: ${theme.spacing(3)};
  }

  body {
    font-family: ${theme.typography.body.family};
  }
`;
