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
        enum: ['Uncategorized', 'Clubs', 'Sports', 'Academics', 'Employer Info Session', 'FEDS', 'EngSoc', 'University'],
		default: 'Uncategorized',
		required: 'Please enter a category.',
		trim: true
	},
    datetime_start: {
		type: Date,
		required: 'Please enter a start date and time.'
	},
    datetime_end: {
		type: Date,
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

/**
 * A validation check so event datetimes makes sense
 */
EventSchema.pre("validate", function(next) {
    if(this.datetime_end<this.datetime_start ||
      this.datetime_start<new Date()){
            console.log("Invalid");
            this.invalidate("datetime_start", "Start and End time must be valid");
            //next(new Error("Start and End time must be valid"));
        } else {
            console.log("valid");
            next();
        }
    }
);

mongoose.model('Event', EventSchema);
