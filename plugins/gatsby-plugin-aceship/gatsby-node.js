/* eslint-disable */
const operatorsJson = require("../../src/data/operators.json");
const opNameToId = Object.fromEntries(operatorsJson.map((op) => [op.name, op.id]));
const opIdToPath = {};

exports.onCreatePage = ({ page, reporter, actions }) => {
  if (page.context?.operator__name) {
    opIdToPath[opNameToId[page.context.operator__name]] = page.path;
  }
}

exports.onPostBootstrap = () => {
  console.table(opIdToPath);
}
