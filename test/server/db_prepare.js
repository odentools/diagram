/**
	Preparation script for testing of the Web API server
**/

// Connect to database
var helper = require("./helper");
var dbPool = helper.dbForInitialize;

// Queries for making of test database
var sqlQueries = [
	// Cleanup and make database
	"DROP DATABASE IF EXISTS bus_db_test;",
	"CREATE DATABASE bus_db_test;",
	// Create table: Route
	"CREATE TABLE  `bus_db_test`.`Route` ( \
		`id` int(11) NOT NULL AUTO_INCREMENT, \
		`routePrefix` mediumtext NOT NULL COMMENT '路線名(要素)', \
		`routeName` mediumtext NOT NULL COMMENT '路線名(ラベル)', \
		`management` mediumtext COMMENT '運営会社', \
		`departureLocation` mediumtext COMMENT '出発地点', \
		`arrivalLocation` mediumtext COMMENT '到着地点', \
		`departureLocationLat` double DEFAULT NULL COMMENT '出発地点(緯度)', \
		`departureLocationLng` double DEFAULT NULL COMMENT '出発地点(経度)', \
		`arrivalLocationLat` double DEFAULT NULL COMMENT '到着地点(緯度)', \
		`arrivalLocationLng` double DEFAULT NULL COMMENT '到着地点(経度)', \
		PRIMARY KEY (`id`) \
	);",
];

// Function for execution of queries
var executeSQL = function(i, done){
	if (sqlQueries.length <= i) {
		done();
		return;
	}

	// Execute query
	dbPool.query(sqlQueries[i], function (err, rows, fields) {
		if (err) throw err;

		// Execute next query
		executeSQL(++i, done);
	});
}

/* ---- */

// Set hook for before each test
beforeEach("Preparation of Test DB", function(done) {
	executeSQL(0, done);
});
