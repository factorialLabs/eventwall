'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Event = mongoose.model('Event');

/**
 * Globals
 */
var user, event;

/**
 * Unit tests
 */
describe('Event Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@uwaterloo.ca',
			username: 'username',
			password: 'password',
            verified: true
		});

		user.save(function() { 
			event = new Event({
				name: 'Event Name',
				user: user,
                location: 'TBD',
                datetime_start: '2016-02-03',
                datetime_end: '2016-02-04'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return event.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should show an error when trying to save without a name', function(done) {
			event.name = '';

			return event.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when trying to save without a location', function(done) {
			event.location = '';

			return event.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when trying to save without a start-time', function(done) {
			event.datetime_start = '';

			return event.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when trying to save without a end-time', function(done) {
			event.datetime_end = '';

			return event.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when trying to save when user is unverified', function(done) {
            user.verified = false;

			return event.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Event.remove().exec();
		User.remove().exec();

		done();
	});
});
