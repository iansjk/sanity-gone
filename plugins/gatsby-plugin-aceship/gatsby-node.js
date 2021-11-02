/* eslint-disable */
const operatorsJson = require("../../src/data/operators.json");
const path = require("path");
const fs = require("fs");

const OUTFILE_NAME = "aceship.json";

const opNameToId = Object.fromEntries(operatorsJson.map((op) => [op.name, op.id]));
const opIdToPath = {};

exports.onCreatePage = ({ page, reporter }) => {
  const opName = page.context?.operator__name;
  if (opName) {
    const opId = opNameToId[opName];
    if (!opId) {
      reporter.panic(`Couldn't find id for operator name "${opName}"`);
    } else {
      opIdToPath[opId] = page.path;
    }
  }
}

exports.onPostBootstrap = ({ reporter }) => {
  reporter.verbose(`Generated Aceship opId to path json: ${JSON.stringify(opIdToPath, null, 2)}`);
  fs.writeFileSync(path.join('public', OUTFILE_NAME), JSON.stringify(opIdToPath));
  reporter.info(`Aceship plugin: wrote ${Object.keys(opIdToPath).length} entries to public/${OUTFILE_NAME}`);
}
