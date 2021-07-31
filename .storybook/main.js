module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
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
};
