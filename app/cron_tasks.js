'use strict';

var CronJob = require('cron').CronJob;
var ical = require('ical');
var async = require('async');

module.exports.schedule = function(mongoose){
    new CronJob('* * * * * *', function(){
        console.log('You will see this message every second');
    }, null, true, "America/Los_Angeles");
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
                        if(ev.location == null) ev.location = "Undeclared.";
                        if(ev.organizer == null){
                            ev.organizer = "FEDS";
                        }
                        else{
                            ev.organizer = ev.organizer.params[0].slice(3);
                        }
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
                        if(ev.location == null) ev.location = "Undeclared.";
                        if(ev.summary == null) ev.summary = "No Name";
                        if(ev.start == null) ev.start = "01-01-2015";
                        if(ev.end == null) ev.end = "01-01-2015";
                        if(ev.organizer == null) ev.organizer = "EngSoc";
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

                //var event = new Event(req.body);
                Event.create(events, function (err) {
                    if (err) // ...
                    {
                        console.log(err);
                    }
                });
            });
        },

    ], function (err, result){
        console.log(err);
    });



}
