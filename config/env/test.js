'use strict';

var oauth = require('./oauthTest');

module.exports = {
	db: 'mongodb://localhost/campuswall-test',
	port: 3001,
	app: {
		title: 'CampusWall - Test Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || oauth.fbTestId,
		clientSecret: process.env.FACEBOOK_SECRET || oauth.fbTestSecret,
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || oauth.twitterTestId,
		clientSecret: process.env.TWITTER_SECRET || oauth.twitterTestSecret,
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || oauth.googleTestId,
		clientSecret: process.env.GOOGLE_SECRET || oauth.googleTestSecret,
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || oauth.linkedInTestId,
		clientSecret: process.env.LINKEDIN_SECRET || oauth.linkedInTestSecret,
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || oauth.gitTestId,
		clientSecret: process.env.GITHUB_SECRET || oauth.gitTestSecret,
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
