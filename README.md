# CouchDB Ensure
Create database unless it exists.

[![Build
Status](https://travis-ci.org/eHealthAfrica/couchdb-ensure.svg?branch=master)](https://travis-ci.org/eHealthAfrica/couchdb-ensure)

## API

```js
ensure(url[, options], callback)
```

### Example

```js
var ensure = require('couchdb-ensure')
ensure('http://localhost:5984/mydb', function(error, response) {
  // here we go, mydb exists
})
```

## CLI

```sh
couchdb-ensure URL
```

### Example

```sh
couchdb-ensure http://localhost:5984/mydb
```

## Tests
```sh
npm test
```
