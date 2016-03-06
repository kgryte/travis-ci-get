Get
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Retrieve resources from a [Travis CI API][travis-api] endpoint.


## Installation

``` bash
$ npm install travis-ci-get
```


## Usage

``` javascript
var request = require( 'travis-ci-get' );
```

<a name="request"></a>
#### request( options, clbk )

Retrieves resources from a [Travis CI API][travis-api] endpoint.

``` javascript
var opts = {
	'pathname': '/repos/kgryte/utils-copy.json'
};

request( opts, onResponse );

function onResponse( error, data ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( data );
	// returns <response_data>
}
```

The `function` accepts the following `options`:
*	__protocol__: request protocol. Default: `'https'`.
*	__hostname__: endpoint hostname. Default: `'api.travis-ci.org'`.
*	__port__: endpoint port. Default: `443` (https) or `80` (http).
*	__pathname__: resource [pathname][travis-api]; e.g., `/repos`. Default: `'/'`.
*	__query__: params portion of a query `string`; e.g., `beep=boop&a=b`. Default: `''`.
*	__token__: Travis CI [access token][travis-token].
*	__accept__: media type. Default: `'application/vnd.travis-ci.2+json'`.

To specify a particular resource [endpoint][travis-api], set the `pathname` option.

``` javascript
var opts = {
	'pathname': '/hooks'
};

request( opts, onResponse );
```

To [authenticate][travis-token] with an endpoint, set the [`token`][travis-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

request( opts, onResponse );
```


#### request.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'pathname': '/repos',
	'query': 'active=true',
	'token': 'tkjorjk34ek3nj4!'
};

var get = request.factory( opts, onResponse );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`request()`](#request).


## Notes

*	If the module encounters an application-level `error` while __initially__ querying an endpoint (e.g., no network connection, malformed request, etc), that `error` is returned immediately to the provided `callback`.
* 	Response data will either be an `object` or an object `array`.


---
## Examples

``` javascript
var request = require( 'travis-ci-get' );

var opts = {
	'hostname': 'api.travis-ci.org',
	'pathname': '/hooks',
	'token': 'tkjorjk34ek3nj4!'
};

request( opts, onResponse );

function onResponse( error, data ) {
	if ( error ) {
		throw error;
	}
	console.log( data );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain an access [token][travis-token] and modify the `token` option accordingly.


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g travis-ci-get
```


### Usage

``` bash
Usage: travisget [options]

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --protocol protocol  Request protocol. Default: https.
       --hostname host      Hostname. Default: api.travis-ci.org.
  -p,  --port port          Port. Default: 443 (https) or 80 (http).
       --pathname pathname  Resource pathname. Default: '/'.
       --token token        Travis CI access token.
       --accept media_type  Media type. Default: application/vnd.travis-ci.2+json.
  -qs, --query querystring  Params portion of a query string.
```


### Notes

*	In addition to the [`token`][travis-token] option, the [token][travis-token] may also be specified by a [`TRAVISCI_TOKEN`][travis-token] environment variable. The command-line option __always__ takes precedence.
*	Request resources are written to `stdout`.


### Examples

Setting the access [token][travis-token] using the command-line option:

``` bash
$ DEBUG=* travisget --token <token> --pathname '/hooks'
# => '[{...},{...},...]'
```

Setting the access [token][travis-token] using an environment variable:

``` bash
$ DEBUG=* TRAVISCI_TOKEN=<token> travisget --pathname '/hooks'
# => '[{...},{...},...]'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/travisget --token <token> --pathname '/hooks'
# => '[{...},{...},...]'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> --pathname '/hooks'
# => '[{...},{...},...]'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/travis-ci-get.svg
[npm-url]: https://npmjs.org/package/travis-ci-get

[build-image]: http://img.shields.io/travis/kgryte/travis-ci-get/master.svg
[build-url]: https://travis-ci.org/kgryte/travis-ci-get

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/travis-ci-get/master.svg
[coverage-url]: https://codecov.io/github/kgryte/travis-ci-get?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/travis-ci-get.svg
[dependencies-url]: https://david-dm.org/kgryte/travis-ci-get

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/travis-ci-get.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/travis-ci-get

[github-issues-image]: http://img.shields.io/github/issues/kgryte/travis-ci-get.svg
[github-issues-url]: https://github.com/kgryte/travis-ci-get/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[travis-api]: https://docs.travis-ci.com/api
[travis-token]: https://github.com/kgryte/travis-ci-access-token
