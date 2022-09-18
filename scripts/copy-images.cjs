const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const fg = require("fast-glob");

const ACESHIP_REPO_DIRECTORY = path.join(__dirname, "../../Arknight-Images");
const OUTPUT_IMAGE_DIRECTORY = path.join(__dirname, "../public/images");

const directoriesToCheck = [
  {
    from: "./avatars",
    to: "./avatars",
  },
  {
    from: "./ui/subclass",
    to: "./branches",
  },
  {
    from: "./equip/icon",
    to: "./modules",
  },
  {
    from: "./portraits",
    to: "./portraits",
  },
  {
    from: "./skills",
    to: "./skills",
  },
  {
    from: "./equip/type",
    to: "./module-types",
  },
];
void (async () => {
  if (!existsSync(ACESHIP_REPO_DIRECTORY)) {
    throw new Error(
      `❗ Image copy failed: couldn't find Aceship repository directory at path: ${ACESHIP_REPO_DIRECTORY}`
    );
  }

  await Promise.all(
    directoriesToCheck.map(async ({ from, to }) => {
      const sourceDir = path
        .join(ACESHIP_REPO_DIRECTORY, from)
        .replace(/\\/g, "/");
      const destinationDir = path
        .join(OUTPUT_IMAGE_DIRECTORY, to)
        .replace(/\\/g, "/");

      if (!existsSync(sourceDir)) {
        throw new Error(
          `❗ Image copy failed: couldn't find source directory at path: ${sourceDir}`
        );
      }

      if (!existsSync(destinationDir)) {
        await fs.mkdir(destinationDir);
      }

      const files = await fg([`${sourceDir}/*.png`]);
      console.log(
        `Found ${files.length} PNGs in ${sourceDir} (-> ${destinationDir})`
      );

      let newFileCount = 0;
      await Promise.all(
        files.map(async (sourcePath) => {
          const filename = path.basename(sourcePath);
          const outPath = path.join(destinationDir, filename);

          if (!existsSync(outPath)) {
            await fs.copyFile(sourcePath, outPath);
            newFileCount++;
          }
        })
      );

      if (newFileCount > 0) {
        console.log(`Copied ${newFileCount} new files to ${destinationDir}`);
      } else {
        console.log(`No new files for ${destinationDir}`);
      }
    })
  );
  console.log("✅ Image copy complete");
})();
