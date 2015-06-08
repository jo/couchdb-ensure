var test = require('tape')
var nano = require('nano')

var secure = require('./')


var url = process.env.COUCH || 'http://localhost:5984'
var dbname = 'couchdb-ensure-test'
var couch = nano(url)
var db = couch.use(dbname)


test('database did not exist', function(t) {
  couch.db.destroy(dbname, function() {
    secure(url + '/' + dbname, function(error, response) {
      t.notOk(error, 'no error occured')
      t.ok(response.ok, 'response is ok')
      t.end()
    })
  })
})

test('database did exist', function(t) {
  couch.db.create(dbname, function() {
    secure(url + '/' + dbname, function(error, response) {
      t.notOk(error, 'no error occured')
      t.ok(response.ok, 'response is ok')
      t.ok(response.existing, 'existing is set')
      t.end()
    })
  })
})
