'use strict';
var oauth = require('./oauth');

module.exports = {
	db: 'mongodb://localhost/campuswall-dev',
	app: {
		title: 'CampusWall - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || oauth.fbTestId,
		clientSecret: process.env.FACEBOOK_SECRET || oauth.fbTestSecret,
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || oauth.twitterId,
		clientSecret: process.env.TWITTER_SECRET || oauth.twitterSecret,
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || oauth.googleId,
		clientSecret: process.env.GOOGLE_SECRET || oauth.googleSecret,
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || oauth.linkedInId,
		clientSecret: process.env.LINKEDIN_SECRET || oauth.linkedInSecret,
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || oauth.gitId,
		clientSecret: process.env.GITHUB_SECRET || oauth.gitSecret,
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
