var nanoOption = require('nano-option')

var existResponse = {
  ok: true,
  existing: true
}

module.exports = function configure (url, callback) {
  var db = nanoOption(url)
  var couch = nanoOption(db.config.url)

  couch.request({
    method: 'HEAD',
    db: db.config.db
  }, function (error) {
    if (!error) return callback(null, existResponse)
    if (error.statusCode !== 404) return callback(error)

    couch.db.create(db.config.db, function (error, response) {
      if (!error) return callback(null, response)
      if (error.statusCode === 412) return callback(null, existResponse)

      callback(error)
    })
  })
}
