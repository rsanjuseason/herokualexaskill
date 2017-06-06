'use strict';

var pg = require('pg');
//var Promise = require('promise');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

//var client = new pg.Client(process.env.DATABASE_URL);

module.exports = function(){

        /*client.connect(function(err) {
            if (err) {
                return err;
            }
            
        };
        var query = client.query(
                    'SELECT firstname,lastname,email FROM salesforce.Lead');
        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end",function(result){
            console.log(result);
            return 'data';
            
        });*/
        return pg.connect(process.env.DATABASE_URL , function (err,client,done) {
            if (err) {
                return err;
            }
            console.log('Connected to postgres! Getting schemas...');
            
            client.query(
                'SELECT firstname,lastname,email FROM salesforce.Lead',
                function(err, result) {
                    if(err){
                       return err;
                    }
                    done();
                    return result.rows[0].firstname;
                    //done(); 
                    //return result.rows[0].firstname;
                }
            );

        });

        //return 'data1';
        
    }
