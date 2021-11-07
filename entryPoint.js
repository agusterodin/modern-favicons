#!/usr/bin/env node
var program = require('commander')
var generateFavicons = require('.')

program
  .option('--source <source>', 'path of svg file to generate favicons from (required)')
  .option('--destination <destination>', 'path of directory to output favicons to (required)')
  .option(
    '--apple-touch-background <color>',
    'background color of the icon that will be shown when an iOS user adds the website to their home screen (optional, defaults to white)'
  )
  .option(
    '--apple-touch-padding <number>',
    'amount of padding (in pixels) in the icon that will be shown when an iOS user adds the website to their home screen (optional, defaults to 0)'
  )
  .parse(process.argv)

const options = program.opts()

if (!options.source) return program.help()
if (!options.destination) return program.help()

generateFavicons(options.source, options.destination, options['apple-touch-background'], options['apple-touch-padding'])
