// Generates aceship.json, a mapping of charIds -> relative page paths
const path = require("path");
const fs = require("fs");

const prerenderManifestPath = path.join(
  __dirname,
  ".next",
  "prerender-manifest.json"
);
const outFilePath = path.join(__dirname, "public", "aceship.json");
const prerenderManifest = require(prerenderManifestPath);

void (async () => {
  const mappings = await Promise.all(
    Object.keys(prerenderManifest.routes)
      .filter((route) => route.startsWith("/operators/"))
      .map(async (route) => {
        const [_root, __operators, slug] = route.split("/");
        const pageJsonPath = path.join(
          __dirname,
          ".next",
          "server",
          "pages",
          "operators",
          `${slug}.json`
        );
        const pageJson = require(pageJsonPath);
        const { charId } = pageJson.pageProps;
        return [charId, route];
      })
  );
  const aceshipJson = Object.fromEntries(mappings);
  console.log(`[aceship]: found ${mappings.length} entries`);
  console.log(aceshipJson);
  fs.writeFileSync(outFilePath, JSON.stringify(aceshipJson));
  console.log(`✅ [aceship] wrote ${outFilePath}`);
})();
