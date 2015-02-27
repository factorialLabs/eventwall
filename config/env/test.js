'use strict';

var oauth = require('./oauth');

module.exports = {
	db: 'mongodb://localhost/campuswall-test',
	port: 3001,
	app: {
		title: 'CampusWall - Test Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || oauth.fbDevId,
		clientSecret: process.env.FACEBOOK_SECRET || oauth.fbDevSecret,
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || oauth.twitterDevId,
		clientSecret: process.env.TWITTER_SECRET || oauth.twitterDevSecret,
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || oauth.googleDevId,
		clientSecret: process.env.GOOGLE_SECRET || oauth.googleDevSecret,
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || oauth.linkedInDevId,
		clientSecret: process.env.LINKEDIN_SECRET || oauth.linkedInDevSecret,
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || oauth.gitDevId,
		clientSecret: process.env.GITHUB_SECRET || oauth.gitDevSecret,
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
