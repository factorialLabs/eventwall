'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Event = mongoose.model('Event'),
	_ = require('lodash');

/**
 * Create a Event
 */
exports.create = function(req, res) {
	var event = new Event(req.body);
	event.user = req.user;

    // Returns 401 error if the user is unverified.
    if (!req.user.verified){
        return res.status(401).send({
            message: "You need to be verified to create events!"
        });
    }

    // Sets default thumbnail for the homepage if one isn't provided.
    if (event.thumbnail == null){
        if (event.category == 'FEDS'){
            event.thumbnail = 'http://www.feds.ca/wp-content/themes/waterloofeds/images/logo.png';
        }
        else{
            event.thumbnail = 'http://placehold.it/350x250';
        }
    }

    // If no organizer's entered, set the organizer to the user's display name.
    if (event.organizer === '' || event.organizer === null){
        event.organizer = req.user.displayName;
    }

    // And let's save the event!
	event.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * Show the current Event
 */
exports.read = function(req, res) {
	res.jsonp(req.event);
};

/**
 * Update a Event
 */
exports.update = function(req, res) {
	var event = req.event ;

	event = _.extend(event , req.body);

	event.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * Delete an Event
 */
exports.delete = function(req, res) {
	var event = req.event ;

	event.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(event);
		}
	});
};
/**
 * Event middleware
 */
exports.eventByID = function(req, res, next, id) { 
	Event.findById(id).populate('user', 'displayName').exec(function(err, event) {
		if (err) return next(err);
		if (! event) return next(new Error('Failed to load Event ' + id));
		req.event = event ;
		next();
	});
};

/**
 * Event authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.event.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/**
 * Event authorization middleware
 */
exports.getCategories = function(req, res, next) {
	res.json(Event.schema.path('category').enumValues);
};

/**
 * Events by a certain user.
 */
exports.getEventsByUser = function (req, res){
    Event.find().where('user').equals(req.query.userId)
    .skip(req.query.page*req.query.limit) //current page
    .limit(req.query.limit)
    .sort('datetime_start')
    .populate('user', 'displayName')
    .exec(function (err, events){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(events);
        }
    });
};

/**
 * Events by category
 */
exports.getEventsByCategory = function (req, res){
    Event.find()
    .where('category').equals(req.query.category)
    .skip(req.query.page*req.query.limit) //current page
    .limit(req.query.limit)
    .sort('datetime_start')
    .populate('user', 'displayName')
    .exec(function (err, events){
        console.log(err);
        console.log(events);
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(events);
            }
        });
};


/**
 * List of Events
 */
exports.list = function(req, res) {
    //If the query specifies a userID, call getEventsByUser()
    if (req.query.userId != null){
        exports.getEventsByUser(req, res);   
    }
    //If the query specifies a category, call getEventsByCategory()
    else if (req.query.category != null){
        exports.getEventsByCategory(req, res);
    }
    //Returns list of all events.
    else{
        Event.find().where('datetime_end')
        .gt(new Date()).sort('datetime_start')
        .skip(req.query.page*req.query.limit) //current page
        .limit(req.query.limit)
        .populate('user', 'displayName').exec(function(err, events) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(events);
		}
	});
    }
};
