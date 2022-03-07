const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const PNGDiff = require("png-diff");
const fg = require("fast-glob");
const sizeOf = require("image-size");

const ACESHIP_REPO_DIRECTORY = path.join(__dirname, "../../AN-EN-Tags");
const OUTPUT_IMAGE_DIRECTORY = path.join(__dirname, "../public/images");

const directoriesToCheck = [
  {
    from: "./img/avatars",
    to: "./avatars",
  },
  {
    from: "./img/ui/subclass",
    to: "./branches",
  },
  {
    from: "./img/equip/icon",
    to: "./modules",
  },
  {
    from: "./img/portraits",
    to: "./portraits",
  },
  {
    from: "./img/skills",
    to: "./skills",
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
      const sourceDir = path.join(ACESHIP_REPO_DIRECTORY, from);
      const destinationDir = path.join(OUTPUT_IMAGE_DIRECTORY, to);

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
      let updatedFileCount = 0;
      await Promise.all(
        files.map(async (sourcePath) => {
          const filename = path.basename(sourcePath);
          const outPath = path.join(destinationDir, filename);

          let needToCopy = false;
          if (!existsSync(outPath)) {
            newFileCount++;
            needToCopy = true;
          } else {
            const { width: sourceWidth, height: sourceHeight } =
              sizeOf(sourcePath);
            const { width: destinationWidth, height: destinationHeight } =
              sizeOf(outPath);
            if (
              sourceWidth !== destinationWidth ||
              sourceHeight !== destinationHeight
            ) {
              updatedFileCount++;
              needToCopy = true;
            } else {
              const diffMetric = await new Promise((resolve, reject) => {
                PNGDiff.outputDiffStream(
                  sourcePath,
                  outPath,
                  (err, _outputStream, diffMetric) => {
                    if (err) {
                      reject(err);
                    }

                    // for testing purposes: uncomment to write diff to diffs/[filename]
                    // const { createWriteStream } = require("fs");
                    // const diffStream = createWriteStream(
                    //   path.join(__dirname, "diffs", filename)
                    // );
                    // _outputStream.pipe(diffStream);

                    resolve(diffMetric);
                  }
                );
              });
              if (diffMetric === 1) {
                updatedFileCount++;
                needToCopy = true;
              }
            }
          }

          if (needToCopy) {
            return fs.copyFile(sourcePath, outPath);
          }
        })
      );

      if (newFileCount > 0 || updatedFileCount > 0) {
        console.log(
          `Copied ${newFileCount} new files and ${updatedFileCount} updated files to ${destinationDir}`
        );
      } else {
        console.log(`No new or updated files for ${destinationDir}`);
      }
    })
  );
  console.log("✅ Image copy complete");
})();
