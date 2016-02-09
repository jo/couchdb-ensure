#!/usr/bin/env node

var configure = require('./')

var args = process.argv.slice(2)
if (!args.length) {
  console.log('Usage: \ncouchdb-ensure URL')
  process.exit()
}

var url = args[0]

configure(url, function (error, response) {
  if (error) return console.error(error)

  console.log(JSON.stringify(response, null, '  '))
})
