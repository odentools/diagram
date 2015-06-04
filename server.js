#!/usr/bin/env node
/**
	Timetable API and webpage for Bus of OECU
	(C) OdenTools
**/
"use strict";

var express = require('express');
var app = express();

// Export app for testing
module.exports = app;

// Connect to database
var dbPool = require('mysql').createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST || "oecu.pw",
	user: process.env.DB_USER || "timetable",
	password: process.env.DB_PASSWORD || "aB12cD34",
	database: process.env.DB_NAME || "timeTable"
});
module.exports.db = new function() { // Database helper
	return dbPool;
};

// To serve static file
app.use(express.static('public'));

// Mount sub-app for API v2
var appApiV2 = require("./server/api/2/routes"); // routes.js
app.use('/2', appApiV2);

// Launch server
app.listen(3000);
