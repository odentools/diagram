/**
	Test for WebAPI server - /api/2/routes
**/

// Load assertion modules
var assert = require("assert");
var request = require("supertest");

// Get app
var app = require("../../../../server");
var BASE_URL = "/api/2";

// Connect to database
var helper = require("../../helper");
var dbPool = helper.db;
require.main.exports.db = dbPool;

// Set hook for preparation of db
require("../../db_prepare.js");

// Set hook for insertion of route
beforeEach(function(done){
	var queries = [
		'INSERT INTO Route (routePrefix, routeName, management, departureLocation, arrivalLocation) \
		 VALUES ("ABC Bus DEF Line", "Foo Campus", "ABC Bus Inc.", "Bar Station", "Foo Campus");'
	];
	helper.execQueries(dbPool, queries, function(){
		done();
	});
});

// Test - route list
describe("Route list - GET /routes", function() {

	it("Valid request", function(done) {
		request(app).get(BASE_URL + "/routes")
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, ret) {
				if (err) throw err;
				var json = JSON.parse(ret.text);

				// Number of routes
				assert.equal(json.Routes.length, 1, "Number of routes");

				// ID of Route
				assert.ok(json.Routes[0].id <= 1, "id of route");
				// RouteName of Route
				assert.ok(json.Routes[0].routeName == "Foo Campus", "routeName of route");

				// Done
				done();
			});
	});

	it("Valid request - Non-existent ID", function(done) {
		request(app).get(BASE_URL + "/routes/9999")
			.expect(200)
			.end(function(err, ret) {
				if (err) throw err;
				var json = JSON.parse(ret.text);

				// Number of routes
				assert.equal(json.Routes.length, 0, "Number of routes");

				// Done
				done();
			});
	});
});
