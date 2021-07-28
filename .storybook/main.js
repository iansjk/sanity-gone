// The location of your Babel config.
const babelConfig = require('../babel.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  babel: async (
    options
  ) => {
    options
      .overrides
      .push({
        ...babelConfig,
        test: '*', // This says "for all files, use this override".
      })

    return options;
  },
}
