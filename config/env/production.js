'use strict';
var oauth = require('./oauthSecure');

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/campuswall',
	assets: {
		lib: {
			css: [
				'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'
			],
			js: [
				'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-resource.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-cookies.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-animate.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-touch.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular-sanitize.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-utils/0.1.1/angular-ui-utils.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.0/ui-bootstrap-tpls.min.js',
				'public/lib/angular-deckgrid/angular-deckgrid.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.4/angular-filter.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || oauth.fbId,
		clientSecret: process.env.FACEBOOK_SECRET || oauth.fbSecret,
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
