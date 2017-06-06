'use strict';

var pg = require('pg');
var Promise = require('promise');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//var pgClient = new pg.Client(process.env.DATABASE_URL);

function getData(){
            
    pg.connect(process.env.DATABASE_URL , function (err,client,done) {
        if (err) {
            return console.log("not able to get connection "+ err);
        }
        console.log('Connected to postgres! Getting schemas...');
        
        client.query(
            'SELECT firstname,lastname,email FROM salesforce.Lead',
            function(err, result) {
                if(err){
                   console.log(err);
                }
                done();
                console.log(result.rows[0].firstname);
                return result.rows[0].firstname;
                //done(); 
                //return result.rows[0].firstname;
            }
        );

    });
}


module.exports = getData;
    