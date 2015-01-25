'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please enter a name for your event.',
		trim: true
	},
    category: {
		type: String,
        enum: ['Uncategorized', 'Clubs', 'Sports', 'Academics', 'Employer Info Session'],
		default: 'Uncategorized',
		required: 'Please enter a category.',
		trim: true
	},
    datetime_start: {
		type: Date,
        default: Date.now,
		required: 'Please enter a start date and time.'
	},
    datetime_end: {
		type: Date,
        default: Date.now,
		required: 'Please enter a end date and time.'
	},
    location: {
		type: String,
        default: '',
		required: 'Please enter a location.',
        trim: true
	},
    description: {
		type: String,
        default: '',
        trim: true
	},
    thumbnail: {
		type: String,
        default: '',
        trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    edited:{
        type: Date,
        default: Date.now
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    organizer: {
        type: String,
        default: ''
    }
});

EventSchema.pre('save', function(next){
    var event = this;
    if (!event.organizer){
        event.organizer = event.user.displayName;
    }
    event.userId = event.user._id;
    next();
});
mongoose.model('Event', EventSchema);
