'use strict';

var loginPage = require('../pageObjects/loginPage.js');
var urls = require('../pageObjects/urls.js');
var mysql = require('mysql');
var sql = 'SELECT user_panellist_id AS result FROM users WHERE user_active=1 AND user_admin=0 AND user_id < 400000 AND user_delivery_telephone = "" AND user_pmxid IS NOT NULL ORDER BY user_id DESC limit 0,1';

    var connection = mysql.createConnection({
    host : 'mysql.stgwaw.opigram',
    user : 'monad',
    password : 'monad',
    database: 'monad'
    });

var common = require('common');
var path = common.fixtures + '/data/data.csv';
var table = 'user_panellist_id';

describe ('Database connection', function(){

    beforeEach(function() {
    });

    it('should connect to database properly', function() {
    connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
    }
    console.log('connected as id ' + connection.threadId);
    });
    });

    it('should make a query', function() {
    connection.query(sql, [path, table, ','], function(err, result, rows, fields) {
    if (err) {
    	throw err;
    console.log('No suitable users found in the database');
    } else {
    	console.log('Found ' + rows.length + ' rows when quering for users');
    	  	  	console.log('Found ' + result.length + ' results when quering for users');
    }

    });
    });
});