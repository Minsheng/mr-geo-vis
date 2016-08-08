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
