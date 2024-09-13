import styleLoader from "bun-style-loader";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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

async function postBuildScript(options: ScriptOptions): Promise<void> {
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

  const outputPath = `${path.dirname(entrypointPath)}/${distUserScript}`;
  const data = await Bun.file(entrypointPath).text();
  let output = HEADER_BEGIN;

  for (const header in packageJson.userscriptHeader) {
    const value = packageJson.userscriptHeader[header];
    for (const row of typeof value === "string" ? [value] : value) {
      output += `// ${header} ${row}\n`;
    }
  }
  output += HEADER_END;
  output += data;

  await Bun.write(outputPath, output);
  console.info(
    `Successfully added the header to the userscript ${outputPath}!`
  );
}

interface BuildOptions {
  dev: boolean;
}

async function build(params: BuildOptions) {
  const { dev } = params;
  const build = await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    minify: !dev,
    sourcemap: dev ? "inline" : undefined,
    loader: {
      ".html": "text",
    },
    plugins: [styleLoader()],
  });

  console.info(build);

  if (!build.success) {
    throw new Error("Bun build return errors");
  }

  const entrypointPath = build.outputs.find(
    (artifact) => artifact.kind === "entry-point"
  )?.path;
  console.info(`Running post build script with entrypoint ${entrypointPath}.`);
  if (!entrypointPath) {
    throw new Error("cannot find entrypoint in built artifacts.");
  }

  await postBuildScript({ entrypointPath });
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option("dev", {
      type: "boolean",
      description:
        "Build in development mode, which disables minify and enables inline source map",
      default: false,
    })
    .parse();

  await build({ dev: argv.dev });
}

await main();
