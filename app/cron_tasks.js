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
    var fedsUser;

    async.waterfall([        
        function (callback){
            User.findOne({_id: "54c43cd2b882706028fb8b13"})
            .populate('postedBy')
            .exec(function(err, user) {
                callback(null,user);
            });
        },
        function(fUser, callback){
            Event.find({user: fUser}).remove().exec(function(err,events){
                callback(null, fUser);
            });
        },
        function (user,callback){
            ical.fromURL('http://www.feds.ca/events/month/?ical=1&tribe_display=month', {}, function(err, data) {

                var events = [];

                for (var k in data){
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if(ev.location == null) ev.location = "";
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
                            organizer: "FEDS"
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
        }


    ], function (err, result){
        console.log(err);
    });



}
