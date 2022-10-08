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
  features: { emotionAlias: false, storyStoreV7: true },
  staticDirs: ["../public"],
  babel: async (options) => {
    options.overrides.push({
      presets: [
        [
          "@babel/preset-react",
          { runtime: "automatic", importSource: "@emotion/react" },
        ],
      ],
      plugins: ["@emotion/babel-plugin"],
      test: "*", // This says "for all files, use this override".
    });
    return options;
  },
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
