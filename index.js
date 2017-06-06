module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var FAADataHelper = require('./salesforceconnect');

//var pg = require('pg');

var app = new alexa.app( 'skill' );
//var Promise = require('promise');
var pg = require('pg');
//var client = new pg.Client(process.env.DATABASE_URL);
var pgClient = new pg.Client(process.env.DATABASE_URL);


app.launch( function( request, response ) {
	response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('saynumber',
	{
		"slots":{"number":"AMAZON.NUMBER"}
		,"utterances":[ 
			"say the number {1-100|number}",
			"give me the number {1-100|number}",
			"tell me the number {1-100|number}",
			"I want to hear you say the number {1-100|number}"
		]
	},
	function(request, response) {
	
		var number = request.slot('number');
		//response.say('you ask for the number ' + number);
	 	response.say(FAADataHelper());

    }
);
//app.express({ expressApp: express_app });

module.exports = app;