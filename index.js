module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var _ = require('lodash');
//var pg = require('pg');
//var FAADataHelper = require('./salesforceconnect');
//var rp = require('request-promise');
//var Promise = require('promise');
//var async = require('asyncawait/async');
//var await = require('asyncawait/await');
//client.connect();
//var pg = require('pg');
//var client = new pg.Client(process.env.DATABASE_URL);
//var pg = require("promise-pg");
var ENDPOINT ='https://season-developer-edition.ap2.force.com/services/apexrest/FindCase?number=';
//var client = new pg.Client(process.env.DATABASE_URL);

var app = new alexa.app( 'skill' );

app.launch( function( request, response ) {
	response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
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
		//var self = this;
		var reprompt = 'say the number between one to hundred.';
	    if (_.isEmpty(airportCode)) {
	      	var prompt = 'I didn\'t hear a number. Tell me a number.';
	      	response.say(prompt).reprompt(reprompt).shouldEndSession(false);
	      	return true;
	    } else {
	      	var faaHelper = new FAADataHelper();
	      	
			/*faaHelper.requestAirportStatus(airportCode).then(function(airportStatus) {
		        console.log(airportStatus);
		        
		        response.say(airportStatus).send();
		        
		      }).catch(function(err) {
		        console.log(err.statusCode);
		        
		        var prompt = 'I didn\'t have data for an airport code of ' + airportCode;
		         //https://github.com/matt-kruse/alexa-app/blob/master/index.js#L171
		        response.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
		      });
			
	      	return false; */

	      	response.say('Hi, I got your number.you have ask for the number ' + number);

	    }
		
    }
);
app.intent('todaysLead',
	{
		
		"utterances":[ 
			"get my today's leads",
			"get my leads",
			"my leads",
			"leads"
		]
	},
	function(request, response) {
	
		
      	var request = require('sync-request');
		var res = request('GET', ENDPOINT,{
			timeout:5000
		});
		//console.log(res.getStatusCode());
		var s = JSON.parse(res.getBody());
		console.log(s);
		response.say(s);

    }
);

module.exports = app;