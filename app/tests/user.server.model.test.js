'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2, user3;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@uwaterloo.ca',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@uwaterloo.ca',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

        user3 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@gmail.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show an error when saving without a first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when saving without a last name', function(done) {
			user.lastName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when saving without an username', function(done) {
			user.username = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should show an error when saving without a password', function(done) {
			user.password = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});


        it('should fail to save a user without an UW email', function(done) {
			return user3.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should fail to save a user without a proper UW email', function(done) {
            user3.email = '@uwaterloo.ca';
			return user3.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});
