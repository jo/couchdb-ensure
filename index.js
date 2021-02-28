const nanoOption = require('nano-option')

const existResponse = {
  ok: true,
  existing: true
}

module.exports = function configure (url, callback) {
  const db = nanoOption(url)
  const couch = nanoOption({ url: db.config.url, parseUrl: false })

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
