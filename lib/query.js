'use strict';

// MODULES //

var debug = require( 'debug' )( 'travis-ci-get:query' );
var getOpts = require( './options.js' );
var getPath = require( './path.js' );
var request = require( './request.js' );


// QUERY //

/**
* FUNCTION: query( options, clbk )
*	Queries an endpoint.
*
* @param {Object} options - query options
* @param {Function} clbk - callback to invoke after completing a query
* @returns {Void}
*/
function query( options, clbk ) {
	var opts;

	// Extract request options:
	opts = getOpts( options );

	// Set the query endpoint:
	opts.path = getPath( options );

	// Make the request:
	request( opts, done );

	/**
	* FUNCTION: done( error, response, data )
	*	Callback invoked after completing request.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object} response - HTTP response object
	* @param {Object} data - response data
	* @returns {Void}
	*/
	function done( error, response, data ) {
		if ( error ) {
			return clbk( error );
		}
		debug( 'Request successfully completed.' );
		clbk( null, data );
	} // end FUNCTION done()
} // end FUNCTION query()


// EXPORTS //

module.exports = query;
