#!/usr/bin/env node

var configure = require('./')


var url = process.argv[2]


configure(url, function(error, response) {
  if (error) return console.error(error)

  console.log(JSON.stringify(response, null, '  '))
})
