#!/usr/bin/env node

const configure = require('./')

const args = process.argv.slice(2)
if (!args.length) {
  console.log('Usage: \ncouchdb-ensure URL')
  process.exit()
}

const url = args[0]

configure(url, function (error, response) {
  if (error) return console.error(error)

  console.log(JSON.stringify(response, null, '  '))
})
