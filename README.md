## Introduction
This project is for testing out a combination of technologies including but not limited to,
- nodejs
- expressjs
- geolocation API
- pubnub
- airbnb api(unofficial)
- threejs

## Purpose
The purpose of this tech mesh-up is to get ready for the development of a mixed reality geolocation-based visualization app.

1. create a web server with nodejs and expressjs for serving a web page over https.
2. get the user's current position and do a listing search using the airbnb api.
3. visualize airbnb listing information such as pricing or ratings using threejs.
4. (optional) stream geolocation data over pubnub network for collaboration/communication purpose?

The idea of the mixed reality app was co-developed with Michael Carnevale.

## Tech mesh-up process
I encountered a lot of problems setting up the web server and attempting to deploy it.
I tried to use Meteor + AngularJS since it minimized the server code I need to write so I can focus on the client side logic.
But I was stuck with some dependency injection error while following the latest Angular 1 tutorial.

Due to time constraint, I gave up the Meteor app approach and decided to switch to nodejs + expressjs.
I spent some time setting up https server since geolocation API no more works on Chrome 50 onwards.
I also did some configuration to adopt es6 such as the import syntax. But when I tried to deploy my nodejs app to Heroku, the build script failed because of dependency problems (babel not found). Unfortunately I couldn't resolve that right away so I just fell back to the require syntax.

Another thing I tried was to publish and subscribe data through pubnub. I successfully set up a channel and was able to send some sample messages. I can publish a user's geolocation data through pubnub and make it accessible to some other users.

In terms of other APIs, I played with a nodejs wrapper for an unofficial airbnb API. My original purpose was to search airbnb listing based on a user's realtime location and visualize it using threejs. But since the the airbnb API doesn't seem to take coordinate parameters, I switched to a nodejs wrapper for Yelp API. Yelp has a Search API where I can search information about local businesses. I have flexible options of searching such as by address or by coordinates.

I am still in the process of implementing doing a yelp search based on the user's current coordinate. But I can't do it easily on the client side unless I use requirejs. I also have't tackled how to handle the response.

The app is planned to be deployed at [here](http://mr-geo-vis.herokuapp.com/). Sadly it is crashing at the moment.

## Reference list

[Setup ES6 and build configuration for nodejs](https://egghead.io/lessons/node-js-using-es6-and-beyond-with-node-js)

[Setup pubnub node v4](https://www.pubnub.com/docs/nodejs/data-streams-publish-and-subscribe-sdk-v4#include_pubnub_javascript_sdk_1)

[Geolocation tutorial using pubnub](https://www.pubnub.com/blog/2015-04-30-google-maps-geolocation-tracking-in-realtime-with-javascript/)

[Airbnb API node wrapper](https://github.com/phamtrisi/airapi)

[Nodejs create https server](https://nodejs.org/api/https.html#https_server_listen_handle_callback)

[Nodejs essential training (video tutorial + code sample)](https://www.lynda.com/Node-js-tutorials/Node-js-Essential-Training/417077-2.html?org=ocadu.ca)

[generate private key and ssl certificate for it, used by https server](http://stackoverflow.com/questions/16610612/create-https-server-with-node-js)

[gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)

[package.json documentation](https://docs.npmjs.com/getting-started/using-a-package.json)

[Deployment of nodejs app on Heroku (Official Doc)](https://devcenter.heroku.com/articles/deploying-nodejs)

[Deployment of nodejs app on Heroku (blog)](https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku)
