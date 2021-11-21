# Modern Favicons

Generates a set of favicons from an SVG file that will satisfy the needs of 99.9% of modern web projects.

Inspired by https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs and https://www.leereamsnyder.com/blog/favicons-in-2021.

This tool operates under the assumption that your are running Node 16+ and that the provided SVG file is square (same height and width). This tool does not generate the legacy masked Safari icon described in the aforementioned articles. If you absolutely need legacy Safari masked icon support, create it manually and place it in the public directory yourself.

## Install

```sh
npm i -D modern-favicons
# or
yarn add -D modern-favicons
```

## Usage

1. Generate the icons to your project's public directory using the CLI command. Run the command without options to see a full list of options. Skip this step if you plan on automating this by adding pre scripts to your package.json.

```sh
npx generate-favicons [...options]
# or
yarn exec -- generate-favicons [...options]
```

2. Add these to the document head.

```html
<link rel="icon" href="/favicon-48.png" type="image/png" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/favicon-apple-touch.png" />
<link rel="manifest" href="/manifest.json" />
```

3. Add a file to your project's public directory called manifest.json. Copy this into the file contents.

```json
{
  "icons": [
    { "src": "/favicon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/favicon-512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```

4. Add [pre script](https://docs.npmjs.com/cli/v7/using-npm/scripts#pre--post-scripts) entries to package.json for development and build processes.

```json
{
  "scripts": {
    "predev": "npx generate-favicons --source images/favicon.svg --destination ./public",
    "prebuild": "npx generate-favicons --source images/favicon.svg --destination ./public"
  }
}

```

5. Add these entries to .gitignore to exclude the generated favicons.

```
/public/*.png
/public/*.ico
/public/*.svg
```
