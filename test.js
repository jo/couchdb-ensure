var test = require('tap').test
var nano = require('nano')

var ensure = require('./')

var url = process.env.COUCH || 'http://localhost:5984'
var dbname = 'couchdb-ensure-test'
var couch = nano(url)
var db = couch.use(dbname)

test('database did not exist', function (t) {
  couch.db.destroy(dbname, function () {
    ensure(url + '/' + dbname, function (error, response) {
      t.error(error)
      t.ok(response.ok, 'response is ok')
      t.end()
    })
  })
})

test('database did exist', function (t) {
  couch.db.create(dbname, function () {
    ensure(url + '/' + dbname, function (error, response) {
      t.error(error)
      t.ok(response.ok, 'response is ok')
      t.ok(response.existing, 'existing is set')
      t.end()
    })
  })
})

test('url is nano object', function (t) {
  ensure(db, function (error, response) {
    t.error(error)
    t.ok(response.ok, 'response is ok')
    t.end()
  })
})
