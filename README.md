EventWall Alpha
==========
[![Build Status](https://travis-ci.org/icechen1/campuswall.svg?branch=master)](https://travis-ci.org/icechen1/campuswall)

Note that EventWall is currently in the Alpha stage and that it can be buggy at times.

## What's EventWall?
Sitting at home, wondering what you should do next? Maybe you want to meet new people outside your program. Perfect!
EventWall is an event hub built for students to discover events happening on campus. 
Discover clubs you didn't even know existed, pick up a new hobby!
Anyone can discover and post events to EventWall, just sign up with your @uwaterloo.ca email!


## Setting up a Dev environment (simplified version of MEAN.js's)
EventWall is built using the [MEAN.js](http://meanjs.org) stack. 

After cloning this repo, you need:
* Node.js with npm
* MongoDB
* Bower, using `$ npm install -g bower`
* Grunt, install using `$ sudo npm install -g grunt-cli`
* Brackets with Brackets SASS for SCSS.

When all that is setup, install node.js dependencies:
```
$ npm install
```

To run EventWall:
Ensure `mongod` is running on port 27017 (default)
```
$ grunt
```

To enable social network login:
Please create /config/env/oauth.js and put:
```
module.exports = {
    fbId: '',
    fbSecret: '',
    fbTestId: '',
    fbTestSecret: '',
    twitterId: '',
    twitterSecret: '',
    googleId: '',
    googleSecret: '',    
    linkedInId: '',
    linkedInSecret: '',
    gitId: '',
    gitSecret: ''
};
```

and fill in the respective API keys for each website.

Navigate to http://localhost:3000 in your browser.

### SemVer

Please use [Semantic Versioning](http://semver.org/) and update package.json and bower.json as required.
