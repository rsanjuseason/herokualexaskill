module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
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

		pgClient.connect();
		var query = pgClient.query("SELECT firstname,lastname,email FROM salesforce.Lead");

		query.on("row", function(row,result){

			result.addRow(row);

		});

		query.on("end", function(result){

			if(result.rows[0] === undefined){

				return;

			}
			else{

				var id = result.rows[0].id;

				response.say('got my lead');
				return;

			}

			pgClient.end();
		});
	    //function getData(back) {
	   /* return	pg.connect(process.env.DATABASE_URL).spread( function (client,done) {
				    /*if (err) {
				    	console.log("not able to get connection "+ err);
			    	}***
				    console.log('Connected to postgres! Getting schemas...');
				    
				    var query = client.query({
				    	 text: "",
	       				 buffer: true 
				    }).promise.then(
					    	function(result) {
					    		
					            response.say('An error occured.');
					            return response.send();
					            
							},
							function(err) { throw err; }
						).finally(done);
				    
				}).done();*/


    }
);
//app.express({ expressApp: express_app });

module.exports = app;