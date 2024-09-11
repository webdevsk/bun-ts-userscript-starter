import styleLoader from "bun-style-loader";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { promises as fs } from "fs";
import path from "path";
import type { PackageJson } from "type-fest";

interface UserScriptHeader {
  [k: string]: string[] | string;
}

type ExtendedPackageJson = PackageJson & {
  userscriptHeader: UserScriptHeader;
};

interface ScriptOptions {
  entrypointPath: string;
}

export async function postBuildScript(options: ScriptOptions): Promise<void> {
  const { entrypointPath } = options;
  const packageJsonPath = "./package.json";

  const packageJson: ExtendedPackageJson = require(packageJsonPath);

  if (
    !packageJson.name ||
    !packageJson.version ||
    !packageJson.description ||
    !packageJson.license ||
    !packageJson.author ||
    !packageJson.repository
  ) {
    throw new Error("Missing required fields in package.json");
  }

  const distUserScript = `${packageJson.name}.user.js`;
  const url = (packageJson.repository as { url: string }).url
    .replace("git+", "")
    .replace(".git", "");
  const updateUrl = `${url}/raw/main/dist/${distUserScript}`;
  const downloadUrl = updateUrl;

  const HEADER_BEGIN = `// ==UserScript==
// @name         ${packageJson.name}
// @namespace    ${url}
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @licence      ${packageJson.license}
// @author       ${packageJson.author}
// @updateURL    ${updateUrl}
// @downloadURL  ${downloadUrl}
`;
  const HEADER_END = `// ==/UserScript==

`;

  const data = await fs.readFile(entrypointPath);
  const outputPath = `${path.dirname(entrypointPath)}/${distUserScript}`;
  const fd = await fs.open(outputPath, "w");
  await fd.write(HEADER_BEGIN);
  for (const header in packageJson.userscriptHeader) {
    const value = packageJson.userscriptHeader[header];
    for (const row of typeof value === "string" ? [value] : value) {
      await fd.write(`// ${header} ${row}\n`);
    }
  }
  await fd.write(HEADER_END);
  await fd.write(data);
  await fd.close();
}

const argv = await yargs(hideBin(process.argv))
  .option("dev", {
    type: "boolean",
    description:
      "Build in development mode, which disables minify and enables inline source map",
    default: false,
  })
  .parse();

const build = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  format: "esm",
  minify: !argv.dev,
  sourcemap: argv.dev ? "inline" : undefined,
  loader: {
    ".html": "text",
  },
  plugins: [styleLoader()],
});

console.info(build);

if (!build.success) {
  process.exit(1);
}

const entrypointPath = build.outputs.find(
  (artifact) => artifact.kind === "entry-point"
)?.path;
console.info(`Running post build script with entrypoint ${entrypointPath}.`);
if (!entrypointPath) {
  throw new Error("cannot find entrypoint in built artifacts.");
}

await postBuildScript({ entrypointPath });
console.info("Successfully added the header to the userscript!");
