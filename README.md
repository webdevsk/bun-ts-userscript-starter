# 🐵 Xmonkey Userscript: Bun + TypeScript Boilerplate

Create powerful Xmonkey (Greasemonkey/Tampermonkey/Violentmonkey/...) userscripts using the all-in-one lightning-fast [Bun](https://bun.sh) JavaScript runtime and TypeScript.

## Features

* Full TypeScript support
* SCSS and HTML injection capabilities
* Automatic generation of the [userscript metadata block](https://violentmonkey.github.io/api/metadata-block/) based on package information
* Local development server with watching-building for seamless development

## Getting Started

1. Install Bun. We recommend using the [mise method](https://mise.jdx.dev/lang/bun.html), but you can also follow the official [Bun installation guide](https://bun.sh/docs/installation).

2. Create a new project using this template:

    ```sh
    bun create genzj/bun-ts-userscript-starter my-awesome-userscript
    cd my-awesome-userscript
    ```

3. Start the development server:

    ```sh
    bun dev
    ```

4. Open <http://localhost:3000> in your browser to install the built userscript. This template includes an example that injects into <https://example.com>, so you can visit that site to verify the installation.

5. Every time you update your code, the `bun dev` command will rebuild the userscript. You'll need to update or reinstall the script either from your Xmonkey dashboard or by refreshing <http://localhost:3000>.

6. To release your changes, stop the dev server (if running) by pressing `Ctrl+C`. Then run `bun run build` and commit and push the `dist/*.user.js` file.

## Building

```bash
# Create a minified build for distribution
bun run build

# Generate a non-minified development build with inline sourcemap
bun run build:dev

# Watch for changes and automatically run development builds
bun run build:watch

# View additional building options
bun run build.ts --help
```

## Updating the Userscript Metadata Block

Customize the userscript metadata through the `userscriptHeader` field in `package.json`. Any key in this field will be written to the metadata block. Values can be either a string (for single-line entries) or an array of strings (for multi-line entries). See the `@match` and `@grant` fields in the template's `package.json` for examples.

## Roadmap

* [x] Improve README documentation
* [x] Implement watch and auto-reload for development
* [x] Serve the generated userscript during watch mode
* [x] Support serving with proper filename, update URL, and download URL
* [ ] Add GitHub Action for automated releases

## Acknowledgements

This project draws significant inspiration from the [Greasemonkey Webpack + TypeScript boilerplate](https://github.com/tarkant/greasemonkey-webpack-typescript-boilerplate).
