//@ts-nocheck
import * as NextImage from "next/image";

import { MediaContextProvider, mediaStyle } from "../src/Media";
import Layout from "../src/components/Layout";

import * as classes from "./preview.css";

import "normalize.css";

const breakpoints = {
  mobile: 360,
  desktop: 1280,
};

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
  chromatic: {
    viewports: Object.values(breakpoints),
  },
};

export const decorators = [
  (Story) => (
    <MediaContextProvider>
      <style>{mediaStyle}</style>
      <Layout
        classes={{
          header: classes.forceHide,
          footer: classes.forceHide,
          navbar: classes.forceHide,
          headerMainWrapper: classes.headerMainWrapper,
        }}
      >
        <Story />
      </Layout>
    </MediaContextProvider>
  ),
];
