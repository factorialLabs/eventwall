'use strict';

var CronJob = require('cron').CronJob;
var ical = require('ical');

module.exports.schedule = function(mongoose){
    new CronJob('* * * * * *', function(){
        console.log('You will see this message every second');
    }, null, true, "America/Los_Angeles");
};
module.exports.run = function(mongoose){
    //Import FEDS events
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var Event = mongoose.model('Event');
    ical.fromURL('http://www.feds.ca/events/month/?ical=1&tribe_display=month', {}, function(err, data) {

        var events = [];

        for (var k in data){
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                console.log(ev);
                console.log("Conference",
                            ev.summary,
                            'is in',
                            ev.location,
                            'on the', ev.start.getDate(), 'of', months[ev.start.getMonth()]);

                events.push(new Event({
                    name: ev.summary,
                    //category: ,
                    datetime_start: ev.start,
                    datetime_end: ev.end,
                    location: ev.location,
                    description: ev.description,
                    //thumbnail: ,
                    //created: ,
                    //edited:,
                    //user: ,
                    organizer: "Feds"
                }));
            }
        }

            //var event = new Event(req.body);
            Event.create(events, function (err) {
                if (err) // ...
                {

                }
            });
    });
}
