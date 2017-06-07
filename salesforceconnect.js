'use strict';

var pg = require('pg');
var _ = require('lodash');
var rp = require('request-promise');
//var Promise = require('promise');
//var async = require('asyncawait/async');
//var await = require('asyncawait/await');
//client.connect();
//var pg = require('pg');
//var client = new pg.Client(process.env.DATABASE_URL);
//var pg = require("promise-pg");
var ENDPOINT ='https://season-developer-edition.ap2.force.com/services/apexrest/FindCase?number='
//var async = require('async');
function FAADataHelper() {
}

FAADataHelper.prototype.requestAirportStatus = function(airportCode) {
  return this.getAirportStatus(airportCode).then(
    function(response) {
      console.log('success - received airport info for ' + airportCode);
      return response.body;
    }
  );
};

FAADataHelper.prototype.getAirportStatus = function(airportCode) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + airportCode,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};



module.exports = FAADataHelper;
