'use strict';

var pg = require('pg');
//var pgClient = new pg.Client(process.env.DATABASE_URL);

function getData(back){
      
      pg.connect(process.env.DATABASE_URL , function (client,done) {
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
                  back(result.rows[0].firstname);
                  
          }
        );

      });
}
    

module.exports = getData(function(data){
                        console.log('data: ' + data);
                        return data;
                      })
                  }