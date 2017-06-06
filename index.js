module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var FAADataHelper = require('./salesforceconnect');

var pg = require('pg');
var client = new pg.Client(process.env.DATABASE_URL);

var app = new alexa.app( 'skill' );
//var Promise = require('promise');
//var pg = require('pg-async');
//var async = require('asyncawait/async');
//var await = require('asyncawait/await');

//var pgAsync = new pg(process.env.DATABASE_URL);
//var client = new pg.Client(process.env.DATABASE_URL);
//var pgClient = new pg.Client(process.env.DATABASE_URL);


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
		//var data = FAADataHelper();
		//console.log(data + ':data');

		/*function getdata() {
			return pgAsync.transaction(async (client )=> {
			    var data;
			    const sql = 'SELECT firstname,lastname,email FROM salesforce.Lead';
			    data = await client.value(sql);	
			    
			    return data;
			  });
			return pg.connect(process.env.DATABASE_URL ,
				function (err,client,done) {
			        if (err) {
			            return console.log("not able to get connection "+ err);
			        }
			        console.log('Connected to postgres! Getting schemas...');
			        
			        var result = await client.query('SELECT firstname,lastname,email FROM salesforce.Lead');

			        return result;

		    	}
		    );
		}*/
		function getData(callback,request,response) {
			  client.connect(function(err) {
			    if (err) {
			      callback(err, null,request,response);
			      return;
			    }

			    client.query("SELECT firstname,lastname,email FROM salesforce.Lead", function (err, result) {
			      client.end();
			      if (err) {
			        callback(err, null,request,response);
			        return;
			      }

			      if (result.rows[0] == undefined) callback(null, 'Lead available.');
			      else callback(null,result.rows[0].firstname,request,response);
			    });
			  });
		};

		getData(function(err,result,req,res){
			console.log('result: '+ result);
			res.say(result)
			
		});
		

		
    }
);
//app.express({ expressApp: express_app });

module.exports = app;