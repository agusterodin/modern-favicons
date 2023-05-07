const fs = require('fs')
const sharp = require('sharp')
const svgo = require('svgo')
const favicons = require('favicons')

module.exports = function (source, destination, appleTouchBackground = 'white', appleTouchPadding = 0) {
  const configuration = {
    icons: {
      android: true,
      appleIcon: { background: appleTouchBackground },
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      windows: false,
      yandex: false
    }
  }

  const resultFileMapping = {
    'favicon-48x48.png': 'favicon-48.png',
    'android-chrome-192x192.png': 'favicon-192.png',
    'android-chrome-512x512.png': 'favicon-512.png',
    'apple-touch-icon-180x180.png': 'favicon-apple-touch-temp.png'
  }

  const resultFilesCopied = {
    ...resultFileMapping
  }
  Object.keys(resultFilesCopied).forEach(resultFileName => (resultFilesCopied[resultFileName] = false))

  const callback = async function (response) {
    try {
      const svgIcon = fs.readFileSync(source)
      const optimizedSvgIcon = svgo.optimize(svgIcon, { path: `${destination}/favicon.svg` }).data
      fs.writeFileSync(`${destination}/favicon.svg`, optimizedSvgIcon)
    } catch (error) {
      console.error(`favicon generation failed: failed to produce optimized svg (${error})`)
    }

    response.images.map(image => {
      if (resultFileMapping[image.name]) {
        try {
          fs.writeFileSync(`${destination}/${resultFileMapping[image.name]}`, image.contents)
        } catch (error) {
          console.error(`favicon generation failed: could not copy ${image.name} favicon to ${resultFileMapping[image.name]} (${error.message})`)
          process.exit(1)
        }
        resultFilesCopied[image.name] = true
      }
    })

    if (!Object.values(resultFilesCopied).every(x => x)) {
      console.error('favicon generation failed: not all expected favicons were generated')
      process.exit(1)
    }

    try {
      const paddedAppleTouchIcon = await sharp(`${destination}/favicon-apple-touch-temp.png`)
        .extend({
          top: appleTouchPadding,
          right: appleTouchPadding,
          bottom: appleTouchPadding,
          left: appleTouchPadding,
          background: appleTouchBackground
        })
        .toBuffer()
      await sharp(paddedAppleTouchIcon)
        .resize({
          height: 180,
          width: 180
        })
        .toFile(`${destination}/favicon-apple-touch.png`)
      fs.unlinkSync(`${destination}/favicon-apple-touch-temp.png`)
    } catch (error) {
      console.error(`favicon generation failed: could not generate apple touch icon (${error})`)
      process.exit(1)
    }
  }

  favicons
    .favicons(source, configuration)
    .then(result => callback(result))
    .catch(error => {
      console.error(`favicon generation failed: ${error.message}`)
      process.exit(1)
    })
}
