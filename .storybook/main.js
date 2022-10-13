const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

/** @type {import('@storybook/react/types').StorybookConfig} */
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  features: { storyStoreV7: true },
  staticDirs: ["../public"],
  webpackFinal: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.plugins = [
      ...(config.plugins ?? []),
      new NodePolyfillPlugin(),
      new VanillaExtractPlugin(),
    ];
    return config;
  },
};
