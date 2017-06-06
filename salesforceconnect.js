'use strict';

var pg = require('pg');
//var Promise = require('promise');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var client = new pg.Client(process.env.DATABASE_URL);

module.exports = function(){
        var query = client.query(
                    'SELECT firstname,lastname,email FROM salesforce.Lead');
        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end",function(result){
            console.log(result);
            return 'data';
            
        });

        return 'data1';
        
    }
