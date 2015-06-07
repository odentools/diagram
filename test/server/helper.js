/**
	Helper for testing of the Web API server
**/

// Database instance for initializing
exports.dbForInitialize = require('mysql').createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "travis", // Username of MySQL on Travis-CI is travis
	password: process.env.DB_PASSWORD || "", // Password of MySQL on Travis-CI is blank
	database: null // Don't specified database name
});

// Database instance
exports.db = require('mysql').createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "travis", // Username of MySQL on Travis-CI is travis
	password: process.env.DB_PASSWORD || "", // Password of MySQL on Travis-CI is blank
	database: "bus_db_test"
});

// Function for execution of queries
exports.execQueries = function(db_pool, queries, callback, i) {
	if (i == undefined) {
		i = 0;
	} else if (i - 1 <= queries.length) {
		callback();
		return;
	}

	var func = this.execQueries;

	db_pool.query(queries[i], function(err, rows, fields) {
		if (err) throw err;
		(func)(db_pool, queries, callback, i + 1);
	});
};
