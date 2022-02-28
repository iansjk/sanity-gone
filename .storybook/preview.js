import { ThemeProvider as MuiThemeProvider, GlobalStyles } from "@mui/material";
import { css, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import * as NextImage from "next/image";

import { MediaContextProvider, mediaStyle } from "../src/Media";
import theme from "../src/theme";
import Layout from "../src/Layout";

// deoptimize next/image in Storybook: https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

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
    <MediaContextProvider>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <GlobalStyles styles={mediaStyle} />
          <GlobalStyles styles={emotionNormalize} />
          <GlobalStyles styles={styles} />
          <Layout>
            <Story />
          </Layout>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </MediaContextProvider>
  ),
];

const styles = (theme) => css`
  header,
  footer,
  .navbar {
    display: none !important;
  }
`;
