var nano = require('nano')

module.exports = function configure(url, callback) {
  var db = nano(url)
  var couch = nano(db.config.url)

  couch.request({
    method: 'HEAD',
    db: db.config.db
  }, function(error) {
    if (!error) return callback(null, { ok: true, existing: true })
    if (error.statusCode !== 404) return callback(error)

    couch.db.create(db.config.db, callback)
  })
}
