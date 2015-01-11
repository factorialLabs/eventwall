'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var events = require('../../app/controllers/events.server.controller');

	// Events Routes
	app.route('/events')
		.get(events.list)
		.post(users.requiresLogin, events.create);

	app.route('/events/:eventId')
		.get(events.read)
		.put(users.requiresLogin, events.hasAuthorization, events.update)
		.delete(users.requiresLogin, events.hasAuthorization, events.delete);
    //get categories
    app.route('/categories')
		.get(events.getCategories);
    
    //get events of a certain category
    app.route('/events/category/:categoryName')
        .get(events.getEventsInCategory);
    
    //get events from a certain user
    app.route('/events/user/:userId')
        .get(events.getEventsByUser);

	// Finish by binding the Event middleware
	app.param('eventId', events.eventByID);
};
