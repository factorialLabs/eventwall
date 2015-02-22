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

    var Event = mongoose.model('Event');
    var User = mongoose.model('User');


    async.waterfall([
        //Import FEDS events
        //Find FEDS user
        function (callback){
            User.findOne({_id: "54c43cd2b882706028fb8b13"})
            .populate('postedBy')
            .exec(function(err, user) {
                callback(null, user);
            });
        },
        //Remove all old FEDS events
        function(fedsUser, callback){
            Event.find({user: fedsUser}).remove().exec(function(err,events){
                callback(null, fedsUser);
            });
        },
        //Add events from FEDS ical
        function (user,callback){
            ical.fromURL('http://www.feds.ca/events/month/?ical=1&tribe_display=month', {}, function(err, data) {

                var events = [];

                for (var k in data){
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if (ev.location === ''|| ev.location === null || ev.location === undefined) ev.location = "TBD";

                        if(ev.organizer === null || ev.organizer === undefined || ev.organizer === ''){
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
                            thumbnail: 'http://www.feds.ca/wp-content/themes/waterloofeds/images/logo.png',
                            created: ev.created,
                            //edited:,
                            user: user,
                            organizer: ev.organizer
                        }));
                        }
                    }
                }

                Event.create(events, function (err) {
                    if (err)
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
                callback(null, user);
            });
        },
        //Remove all old EngSoc events
        function(engsocUser, callback){
            Event.find({user: engsocUser}).remove().exec(function(err,events){
                callback(null, engsocUser);
            });
        },
        //Add events from EngSoc
        function (user, callback){
            ical.fromURL("https://www.google.com/calendar/ical/um08n4cml235750sucn1vmgqd0%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {

                var events = [];

                for (var k in data){
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if (ev.location === ''|| ev.location === null || ev.location === undefined) ev.location = "TBD";
                        if(ev.summary === null) ev.summary = "TBD";
                        if(ev.organizer === null || ev.organizer === undefined || ev.organizer === '') ev.organizer = "EngSoc";

                        if (new Date(ev.end) > new Date() && ev.summary.indexOf('Hell Week') === -1){
                            events.push(new Event({
                                name: ev.summary,
                                category: "EngSoc",
                                datetime_start: ev.start,
                                datetime_end: ev.end,
                                location: ev.location,
                                description: ev.description,
                                thumbnail: 'https://engsoc.uwaterloo.ca/sites/default/files/EngSoc%20%28colour%29.bmp',
                                created: ev.created,
                                //edited:,
                                user: user,
                                organizer: ev.organizer
                            }));
                        }
                    }
                }

                Event.create(events, function (err) {
                    if (err)
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
        function(cecaUser, callback){
            Event.find({user: cecaUser}).remove().exec(function(err,events){
                callback(null, cecaUser);
            });
        },
        function (user, callback) {
            uwapi.termsInfosessions({term_id:1151}).then(function (session) { // 1151 - Winter 2015; 1155 - Spring 2015

                var events = [];

                for (var k in session){
                    if (session.hasOwnProperty(k)) {

                        var ev = session[k];
                        ev.startTime = new Date(ev.date + ' ' + ev.start_time);
                        ev.endTime = new Date(ev.date + ' ' + ev.end_time);

                        // If description isn't provided, put the relevant programs in place.
                        if (ev.description === ''|| ev.description === null) ev.description = ev.employer + " is looking for students from: " + ev.programs;
                        if (ev.location === ''|| ev.location === null || ev.location === undefined) ev.location = "TBD";
                        if (ev.employer !== "Closed info session" && ev.endTime > new Date() && ev.employer.indexOf('CANCELLED') === -1){

                            events.push(new Event({
                                name: ev.employer + " Info Session",
                                category: 'Employer Info Session',
                                datetime_start: ev.startTime,
                                datetime_end: ev.endTime,
                                location: ev.location,
                                description: ev.description,
                                thumbnail: 'https://scontent-lga.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1465233_675390705833110_1338633322_n.png?oh=7a5a5cf7edd12619b8a2b7c241894b93&oe=5549FD08',
                                //created: ev.created,
                                //edited:,
                                user: user,
                                organizer: ev.employer
                            }));
                        }
                    }
                }

                Event.create(events, function (err) {
                    if (err)
                    {
                        console.log(err);
                    }
                });
            });
            callback(null);
        }

    ], function (err, result){
        console.log(err);
    });
}
