const test = require('tap').test
const nano = require('nano')

const ensure = require('./')

const url = process.env.COUCH || 'http://localhost:5984'
const dbname = 'couchdb-ensure-test'
const couch = nano(url)
const db = couch.use(dbname)

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

test('does not throw for server at subpath', function (t) {
  t.doesNotThrow(function () {
    ensure('http://example.com/couchdb/database', function () {
      t.end()
    })
  }, 'did throw an exception')
})
