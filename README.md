# Modern Favicons

Generates a set of favicons from an SVG file that will satisfy the needs of 99.9% of modern web projects.

Inspired by https://www.leereamsnyder.com/blog/favicons-in-2021.

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
<link rel="icon" type="image/png" href="/favicon-48.png" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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
