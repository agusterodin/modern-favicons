# Modern Favicons

Generates a set of favicons from an SVG file that will satisfy the needs of 99.9% of modern web projects.

Inspired by https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs and https://www.leereamsnyder.com/blog/favicons-in-2021.

This tool operates under the assumption that the provided SVG file is square (same height and width). This tool does not generate the legacy masked Safari icon described in the aforementioned article. If you absolutely need legacy Safari masked icon support, create it manually and place it in the public directory yourself.

## Install

```sh
npm i -D modern-favicons
# or
yarn add -D modern-favicons
```

## Usage

1. Generate the icons to your project's public directory using the CLI command.

```sh
npx favicons [...options]
# or
yarn exec -- favicons [...options]
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
