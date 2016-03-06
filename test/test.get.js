'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var get = require( './../lib/get.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof get, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when requesting resources', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function get() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ) );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./factory.js': factory
	});

	expected = results;

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function get() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results );
			}
		};
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});
