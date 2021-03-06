'use strict';

var request = require( './../lib' );

var opts = {
	'hostname': 'api.travis-ci.org',
	'pathname': '/hooks',

	// INSERT TOKEN HERE //
	'token': '<your_token_goes_here>'
};

request( opts, onResponse );

/**
* FUNCTION: onResponse( error, data )
*	Callback invoked upon receiving a response.
*
* @private
* @param {Error|Null} error - error or null
* @param {Object[]} data - response data
* @returns {Void}
*/
function onResponse( error, data ) {
	if ( error ) {
		throw error;
	}
	console.log( data );
}
