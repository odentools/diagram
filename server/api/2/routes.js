/**
	Sub-app for API v2
	(C) OdenTools
**/
"use strict";

var express = require('express');
var app = express();

// API - Routes list
app.get('/routes', function (req, res) {
	var columns = "*";
	if (req.query.develop == undefined) { // Developer request
		columns = "id, routePrefix, routeName, management, departureLocation, arrivalLocation, departureLocationLat, departureLocationLng, arrivalLocationLat, arrivalLocationLng";
	}

	// Fetch item from database
	var dbCon = require.main.exports.db;
	dbCon.query("SELECT " + columns + " FROM Route;", function(err, rows, fields) {
		if (err) throw err;
		res.json({
			"Routes": rows
		});
	});
});

// Export this sub-app
module.exports = app;
