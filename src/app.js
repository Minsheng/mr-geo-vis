var express = require('express');
var PubNub = require('pubnub');
var fs = require('fs');
// var https = require('https');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var Yelp = require('yelp');

// for the https authentication
// const credentials = {
//     key: fs.readFileSync('./keys/key.pem'),
//     cert: fs.readFileSync('./keys/key-cert.pem')
// };

// for deployment on Heroku, port number will get replaced
var port = process.env.PORT || 8000;
var app = express();

app.use(express.static("public"));
// app.use(favicon(__dirname + 'public/favicon.ico'));

var name = ""; // random client id for pubnub connection

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);

    // set up pubnub authentication so the server can publish and subscribe through pubnub channel
    var pubnub = new PubNub({
        subscribeKey: "sub-c-441be6a2-5d04-11e6-ada4-02ee2ddab7fe",
        publishKey: "pub-c-d223f6bb-65ab-4128-b272-3984970759c1",
        uuid: 'name',
        ssl: true
    });

    // the server will subscribe to a pubnub channel, get the geolocation data of a client,
    // and publish the api search result back to the channel
    pubnub.addListener({
        status: function(statusEvent) {
        },
        message: function(message) {
            console.log("New Message!!");

            if (message && message.type === 'geo') {
                var pos_param = message.position.lat.toString()+","+message.position.lng.toString();

                var yelp = new Yelp({
                    consumer_key: 'nX3YjWtzkYdmyWzYWwvMXA',
                    consumer_secret: '_kXOXGtqQIwUoZoEhiQM6GyaNwk',
                    token: '08tu1zy4l0bQ62MZT2Omap-FbKbVCX42',
                    token_secret: 'yAdZhROnQd56fWTHQmqQ3szPSr0',
                });

                yelp.search({
                    term: 'food',
                    location: 'toronto',
                    cll: pos_param,
                    limit: 10
                }).then(function (data) {
                    // process the api search result
                    var business_data_to_send = convertSearchResult(data);

                    pubnub.publish({
                        channel  : 'mr-demo',
                        message  : {
                            uuid : pubnub.getUUID(),
                            type : 'api',
                            data : business_data_to_send ? business_data_to_send : "not found"
                        },
                        callback : function(m){
                            console.log(m)
                        }
                    });
                }).catch(function (err) {
                    console.error(err);
                });
            }
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    });

    pubnub.subscribe({
        channels: ['mr-demo']
    });

    next(); // send response back
});

// only retrieve a list of buisness names and their ratings
function convertSearchResult(result) {
    console.log("convertSearchResult reached");

    // parse the response into a javascript json object
    var result_json = JSON.parse(result);

    // get the first result in the list of regions
    var first_result = result_json[Object.keys(result_json)[0]];

    // get a list of businesses of the first result
    var buisnesses = first_result.businesses;

    var buisness_hash = {};

    buisnesses.forEach((b) => {
        buisness_hash[b.name] = b.rating
    });

    return buisness_hash;
}

// create a https server
http.createServer(app).listen(port);

module.exports = app;
