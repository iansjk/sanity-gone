// Generates aceship.json, a mapping of charIds -> relative page paths
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prerenderManifestPath = path.join(
  __dirname,
  ".next",
  "prerender-manifest.json"
);
const outFilePath = path.join(__dirname, "public", "aceship.json");

void (async () => {
  const prerenderManifest = (
    await import(prerenderManifestPath, { assert: { type: "json" } })
  ).default;
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
        const pageJson = (
          await import(pageJsonPath, { assert: { type: "json" } })
        ).default;
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
