'use strict';

var pg = require('pg');
//var Promise = require('promise');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//client.connect();

//var client = new pg.Client(process.env.DATABASE_URL);

function getData(back){
            
    pg.connect(process.env.DATABASE_URL , function (err,conn,done) {
        if (err) {
            back(err);

        }else{
            console.log('Connected to postgres! Getting schemas...');
        
            conn.query(
                'SELECT firstname,lastname,email FROM salesforce.Lead',
                function(err, result) {
                    if(err){
                       back(err);
                    }
                    done();
                    await (back(result.rows[0].firstname));
                    //done(); 
                    //return result.rows[0].firstname;
                }
            );    
        }
        

    });
}

module.exports = getData(function(data){
    if(data != undefined) return data;
    return 'No result';
})
