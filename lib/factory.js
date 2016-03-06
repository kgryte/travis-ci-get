'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var resolve = require( './resolve.js' );


// VARIABLES //

var DEFAULT_HTTP_PORT = 80;
var DEFAULT_HTTPS_PORT = 443;


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for fetching resources from a Travis CI API endpoint.
*
* @param {Object} options - function options
* @param {String} [options.protocol='https'] - request protocol
* @param {String} [options.hostname='api.travis-ci.org'] - endpoint hostname
* @param {Number} [options.port] - endpoint port
* @param {String} [options.pathname='/'] - resource pathname
* @param {String} [options.query=""] - params portion of a query string
* @param {String} [options.token] - Travis CI access token
* @param {String} [options.accept='application/vnd.travis-ci.2+json'] - media type
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for getting resources
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( opts.port === null ) {
		if ( opts.protocol === 'https' ) {
			opts.port = DEFAULT_HTTPS_PORT;
		} else {
			opts.port = DEFAULT_HTTP_PORT;
		}
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: get()
	*	Resolves endpoint resources.
	*
	* @returns {Void}
	*/
	return function get() {
		resolve( opts, done );
		/**
		* FUNCTION: done( error, data )
		*	Callback invoked after resolving resources.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object[]} data - query data
		* @returns {Void}
		*/
		function done( error, data ) {
			if ( error ) {
				return clbk( error );
			}
			clbk( null, data );
		} // end FUNCTION done()
	}; // end FUNCTION get()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
