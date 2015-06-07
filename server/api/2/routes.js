/**
	WebAPI - /api/2/routes/
	(C) OdenTools
**/
"use strict";

var express = require('express');
var app = express();

var publicRoutesColumns = "id, routePrefix, routeName, management, departureLocation, arrivalLocation, departureLocationLat, departureLocationLng, arrivalLocationLat, arrivalLocationLng";

// API - List of routes
app.get('/', function (req, res) {
	var columns = "*";
	if (req.query.develop == undefined) { // Developer request
		columns = publicRoutesColumns;
	}

	// Fetch item from database
	var db_con = require.main.exports.db;
	db_con.query("SELECT " + columns + " FROM Route;", function(err, rows, fields) {
		if (err) throw err;
		res.json({
			"Routes": rows
		});
	});
});

// API - Single route
app.get('/:routeId', function (req, res) {
	var route_id = req.params.routeId;
	var columns = "*";
	if (req.query.develop == undefined) { // Developer request
		columns = publicRoutesColumns;
	}

	// Fetch item from database
	var db_con = require.main.exports.db;
	db_con.query("SELECT " + columns + " FROM Route WHERE id = ?;", [route_id], function(err, rows, fields) {
		if (err) throw err;
		res.json({
			"Routes": rows
		});
	});
});

// Export this sub-app
module.exports = app;
