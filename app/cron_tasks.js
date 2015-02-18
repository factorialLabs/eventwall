'use strict';

var CronJob = require('cron').CronJob;
var ical = require('ical');
var async = require('async');
var uwAPIKey = "47d9f4f9a60af7d7042865726c5c09ec";
var uwapi = require('uwapi')(uwAPIKey);

module.exports.schedule = function(mongoose){
    new CronJob('00 00 11 * * *', function(){
        module.exports.run(mongoose);
    }, function(){
        //executed when the job stops
        console.log("Successfully imported events!");
    }, true, "America/Los_Angeles");
};
module.exports.run = function(mongoose){
    //Import FEDS events
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var Event = mongoose.model('Event');
    var User = mongoose.model('User');


    async.waterfall([
        //Find FEDS user
        function (callback){
            User.findOne({_id: "54c43cd2b882706028fb8b13"})
            .populate('postedBy')
            .exec(function(err, user) {
                callback(null,user);
            });
        },
        //Remove all old FEDS events
        function(fUser, callback){
            Event.find({user: fUser}).remove().exec(function(err,events){
                callback(null, fUser);
            });
        },
        //Add events from FEDS ical
        function (user,callback){
            ical.fromURL('http://www.feds.ca/events/month/?ical=1&tribe_display=month', {}, function(err, data) {

                var events = [];

                for (var k in data){
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if(ev.location == null) ev.location = "TBD";
                        if(ev.organizer == null){
                            ev.organizer = "FEDS";
                        }
                        else{
                            ev.organizer = ev.organizer.params[0].slice(3);
                        }
                        if (new Date(ev.end) > new Date()){
                            events.push(new Event({
                            name: ev.summary,
                            category: "FEDS",
                            datetime_start: ev.start,
                            datetime_end: ev.end,
                            location: ev.location,
                            description: ev.description,
                            //thumbnail: ,
                            created: ev.created,
                            //edited:,
                            user: user,
                            organizer: ev.organizer
                        }));
                        }

                    }
                }

                //var event = new Event(req.body);
                Event.create(events, function (err) {
                    if (err) // ...
                    {
                        console.log(err);
                    }
                });
            });
            callback(null);
        },
        //Find EngSoc User
        function (callback){
            User.findOne({_id: "54c4216768e34fd41d38fba2"})
            .populate('postedBy')
            .exec(function(err, user) {
                callback(null,user);
            });
        },
        //Remove all old FEDS events
        function(fUser, callback){
            Event.find({user: fUser}).remove().exec(function(err,events){
                callback(null, fUser);
            });
        },
        //Add events from EngSoc
        function (user,callback){
            ical.fromURL("https://www.google.com/calendar/ical/um08n4cml235750sucn1vmgqd0%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {
                //console.log(data);
                var events = [];

                for (var k in data){
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if(ev.location == null) ev.location = "TBD";
                        if(ev.summary == null) ev.summary = "TBD";
                        if(ev.organizer == null) ev.organizer = "EngSoc";

                        if (new Date(ev.end) > new Date()){
                            events.push(new Event({
                                name: ev.summary,
                                category: "EngSoc",
                                datetime_start: ev.start,
                                datetime_end: ev.end,
                                location: ev.location,
                                description: ev.description,
                                //thumbnail: ,
                                created: ev.created,
                                //edited:,
                                user: user,
                                organizer: ev.organizer
                            }));
                        }
                    }
                }

                //var event = new Event(req.body);
                Event.create(events, function (err) {
                    if (err) // ...
                    {
                        console.log(err);
                    }
                });
            });
            callback(null);
        },
        //Find CECA User
        function (callback){
            User.findOne({_id: "54c45c5a91b223c41dc407a3"})
            .populate('postedBy')
            .exec(function(err, user) {
                callback(null,user);
            });
        },
        //Remove all old CECA events
        function(fUser, callback){
            Event.find({user: fUser}).remove().exec(function(err,events){
                callback(null, fUser);
            });
        },
        function (user, callback) {
            uwapi.termsInfosessions({term_id:1151}).then(function (session) { // 1151 - Winter 2015; 1155 - Spring 2015
                //console.log(session);
                var events = [];

                for (var k in session){
                    if (session.hasOwnProperty(k)) {
                        var ev = session[k];
                        // If description isn't provided, put the relevant programs in place.
                        if (ev.description === ''|| ev.description === null) ev.description = ev.employer + " is looking for students from: " + ev.programs;
                        if (ev.location == ''|| ev.location == null || ev.location == undefined) ev.location = "TBD";
                        ev.startTime = new Date(ev.date + ' ' + ev.start_time);
                        ev.endTime = new Date(ev.date + ' ' + ev.end_time);
                        if (ev.employer !== "Closed info session" && ev.endTime > new Date()){

                            events.push(new Event({
                                name: ev.employer + " Info Session",
                                category: 'Employer Info Session',
                                datetime_start: ev.startTime,
                                datetime_end: ev.endTime,
                                location: ev.location,
                                description: ev.description,
                                //thumbnail: ,
                                //created: ev.created,
                                //edited:,
                                user: user,
                                organizer: ev.employer
                            }));
                        }
                    }
                }
                //console.log(events);
                //var event = new Event(req.body);
                Event.create(events, function (err) {
                    if (err) // ...
                    {
                        console.log(err);
                    }
                });
            });
            callback(null);
        },
        // UW Events
        //Find UW User
        function (callback){
            User.findOne({_id: "54c460c1bd9b8cec2ccbe348"})
            .populate('postedBy')
            .exec(function(err, user) {
                callback(null,user);
            });
        },
        //Remove all old UW events
        function(fUser, callback){
            Event.find({user: fUser}).remove().exec(function(err,events){
                callback(null, fUser);
            });
        },
        function (user, callback) {
            uwapi.events().then(function (session) {
                var events = [];

                for (var k in session){
                    if (session.hasOwnProperty(k)) {
                        var ev = session[k];
                        if (ev.description == "" || ev.description == null) ev.description = ev.programs;
                        if (new Date(ev.times[0].end) > new Date()){
                            events.push(new Event({
                                name: ev.title,
                                category: 'University',
                                datetime_start: ev.times[0].start,
                                datetime_end: ev.times[0].end,
                                location: "None provided.",
                                description: ev.link,
                                //thumbnail: ,
                                //created: ev.created,
                                //edited:,
                                user: user,
                                organizer: ev.site_name
                            }));
                        }

                    }
                }
                //console.log(events);
                //var event = new Event(req.body);
                Event.create(events, function (err) {
                    if (err) // ...
                    {
                        console.log(err);
                    }
                });
            });
        }

    ], function (err, result){
        console.log(err);
    });
}
