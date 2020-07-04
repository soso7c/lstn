const axios = require("axios");
const compareVersions = require("compare-versions");
const terminalLink = require("terminal-link");
const color = require("cli-color");

module.exports = async (v) => {
  const { data } = await axios.get("https://nodejs.org/dist/index.json");

  return data
    .filter((node) => {
      const cp = v
        ? compareVersions(node.version, "v" + v + ".0.0") >= 0
        : true;
      return node.lts && cp;
    })
    .map((it) => {
      const { files, ...rest } = it;
      const doc = color.yellow(
        terminalLink(
          "API",
          `https://nodejs.org/dist/${it.version}/docs/api/documentation.html`
        )
      );
      return {
        ...rest,
        doc,
      };
    });
};
