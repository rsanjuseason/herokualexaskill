'use strict';

var pg = require('pg');
//var Promise = require('promise');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var client = new pg.Client(process.env.DATABASE_URL);

module.exports = function(){
        var result = client.query(
                    'SELECT firstname,lastname,email FROM salesforce.Lead').result;
        console.log(result);
        if(result == undefined) return 'No result found';
        return result[0].firstname;
    }
