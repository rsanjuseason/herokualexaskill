module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );


var pg = require('pg');
var client = new pg.Client(process.env.DATABASE_URL);

var app = new alexa.app( 'skill' );
//var Promise = require('promise');
//var pg = require('pg-async');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

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
		var FAADataHelper = require('./salesforceconnect');
		console.log(FAADataHelper.data);
		//var query = client.query('SELECT firstname,lastname,email FROM salesforce.Lead');

		async (function getData(back){
             
		    return pg.connect(process.env.DATABASE_URL , function (err,conn,done) {
		        if (err) {
		            return await (back(err));

		        }else{
		            console.log('Connected to postgres! Getting schemas...');
		        
		            conn.query(
		                'SELECT firstname,lastname,email FROM salesforce.Lead',
		                function(err, result) {
		                    if(err){
		                       return await(back(err));
		                    }
		                    done();
		                    return await (back(result.rows[0].firstname));
		                    //done(); 
		                    //return result.rows[0].firstname;
		                }
		            );    
		        }
		        

		    });
		});

		response.say(getData(function(data){
								console.log('my data :' +  data);
							    if(data != undefined) return data;
							    return 'No result';
							}));
					
		//console.log('data s : ' +s);
        //console.log('esxp ' + result.result);
        //var rst = query.on('end').result;
        //console.log(rst);

        //if(result.rowCount == 0) response.say('data ' +result.rowCount);*/
        
		//response.say('data ');
		//var data = FAADataHelper();
		//console.log(data + ':data');
		
		/*client.connect(function(err) {
			if (err) {
				return callback(err, null);
			}
			
		}

		//var s = client.query("SELECT firstname,lastname,email FROM salesforce.Lead");
		//console.log(s);*/
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
		}
		//response.say(FAADataHelper.name);

		getData(function(err,result){
			console.log('result: '+ result);
			console.log(response.say('data'));
				response.say('data ' + result);
			
			
		}.bind(this));*/
		

		
    }
);

function getData(callback) {
	client.connect(function(err) {
		if (err) {
		return callback(err, null);
		
	}

	return client.query("SELECT firstname,lastname,email FROM salesforce.Lead", function (err, result) {
		client.end();
		if (err) {
			return callback(err, null);
			
		}

		if (result.rows[0] == undefined) return callback(null, 'Lead available.');
		else return callback(null,result.rows[0].firstname);
		});
	});
};
//app.express({ expressApp: express_app });

module.exports = app;