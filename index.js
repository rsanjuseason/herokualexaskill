module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var pg = require('pg');

var app = new alexa.app( 'skill' );
//var client = new pg.Client(process.env.DATABASE_URL);


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
			
	    return pg.connect(process.env.DATABASE_URL , function (err,client,done) {
			    if (err) {
			    	console.log("not able to get connection "+ err);
		    	}
			    console.log('Connected to postgres! Getting schemas...');
			    
			    client.query(
			    	'SELECT firstname,lastname,email FROM salesforce.Lead',
			    	function(err, result) {
			    		if(err){
			               console.log(err);
			            }
			            done();
			            //back(result.rows[0].firstname);
			            return response.clear().say("An error occured: ").send();
			            //done(); 
			            //return result.rows[0].firstname;
					}
				);

			});
			    
	}
);

//app.express({ expressApp: express_app });

module.exports = app;