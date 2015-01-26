CampusWall Alpha
==========

Note that CampusWall is currently in the Alpha stage and that it can be buggy at times.

## What's CampusWall?
Sitting at home, wondering what you should do next? Maybe you want to meet new people outside your program. Perfect!
CampusWall is an event hub built for students to discover events happening on campus. 
Discover clubs you didn't even know existed, pick up a new hobby!
Anyone can discover and post events to CampusWall, just sign up with your @uwaterloo.ca email!


## Setting up a Dev environment (simplified version of MEAN.js's)
CampusWall is built using the [MEAN.js](http://meanjs.org) stack. 

After cloning this repo, you need:
* Node.js with npm
* MongoDB
* Bower, using `$ npm install -g bower`
* Grunt, install using `$ sudo npm install -g grunt-cli`

When all that is setup, install node.js dependencies:
``` $ npm install ```

To run CampusWall:
Ensure `mongod` is running on port 27017 (default)
```
$ grunt
```

Navigate to http://localhost:3000 in your browser.
