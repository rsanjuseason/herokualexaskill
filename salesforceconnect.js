'use strict';

var pg = require('pg');
var Promise = require('promise');
//var pgClient = new pg.Client(process.env.DATABASE_URL);


 

module.exports = function(){
    return pg.connect(process.env.DATABASE_URL).spread( function (client,done) {
            /*if (err) {
              console.log("not able to get connection "+ err);
            }*/
        console.log('Connected to postgres! Getting schemas...');
        
        var query = client.query({
            text: "SELECT firstname,lastname,email FROM salesforce.Lead",
            buffer: true 
        }).promise.then(
            function(result) {
              
                  console.log(result.rows[0].firstname);
                  return result.rows[0].firstname;
                  
          },
          function(err) { throw err; }
        ).finally(done);
        
    }).done();  
}