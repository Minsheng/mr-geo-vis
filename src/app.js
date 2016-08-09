// import { createServer } from 'https'; // only use this function from https
// import fs from 'fs';
// import PubNub from 'pubnub';
// import express from 'express';

var express = require('express');
var PubNub = require('pubnub');
var fs = require('fs');
var https = require('https');
var path = require('path');
var favicon = require('serve-favicon');
var Yelp = require('yelp');

const credentials = {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/key-cert.pem')
};

var port = process.env.PORT || 8000;

var app = express();

var name = "";

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);

    var pubnub = new PubNub({
        subscribeKey: "sub-c-441be6a2-5d04-11e6-ada4-02ee2ddab7fe",
        publishKey: "pub-c-d223f6bb-65ab-4128-b272-3984970759c1",
        uuid: 'name',
        ssl: true
    });

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

// var pubnub = new PubNub({
//     subscribeKey: "sub-c-441be6a2-5d04-11e6-ada4-02ee2ddab7fe",
//     publishKey: "pub-c-d223f6bb-65ab-4128-b272-3984970759c1'",
//     secretKey: "sec-c-OGY5YTk4MzYtOGQ2Zi00NmJhLWE2NjQtY2M2ZDM0M2E3NTM5"
//     // cipherKey: "myCipherKey",
//     // logVerbosity: true,
//     // ssl: true
// });

// grant permission to world
// pubnub.grant({
//     channel : 'mr-demo',
//     read : true,
//     write : true,
//     callback : function(m){
//         console.log(m)
//     }
// });

app.use(express.static("./public"));

app.use(favicon(path.join('public','images','favicon.ico')));

https.createServer(credentials, app).listen(port);

module.exports = app;

// var handler = (req, res) => {
//     if (req.url === "/") {
//         fs.readFile("./public/index.html", "utf-8", (err, html) => {
//             res.writeHead(200, {"Content-Type": "text/html"});
//             res.end(html);
//         });
//     } else if (req.url.match(/.css$/)) { // if it is css
//         var cssPath = path.join(__dirname, 'public', req.url);
//         var fileStream = fs.createReadStream(cssPath, "utf-8");
//
//         res.writeHead(200, {"Content-Type": "text/css"});
//
//         fileStream.pipe(res);
//     } else if (req.url.match(/.ico$/)) { // favicon
//         var imgPath = path.join(__dirname, 'public', req.url);
//         var imgStream = fs.createReadStream(imgPath);
//
//         res.writeHead(200, {"Content-Type": "image/x-icon"});
//         imgStream.pipe(res);
//     } else if (req.url.match(/.js$/)) {
//         // var jsPath = path.join(__dirname, 'public', req.url);
//         var jsPath = "./public/" + req.url;
//         var fileStream = fs.createReadStream(jsPath, "utf-8");
//
//         res.writeHead(200, {"Content-Type": "application/javascript"});
//
//         fileStream.pipe(res);
//     } else {
//         res.writeHead(404, {"Content-Type": "text/plain"});
//         res.end("404 File not found");
//     }
//     // res.writeHead(200, {"Content-Type": "text/html"});
//     // res.end('hello yo\n');
// };

// var pubnub = new PubNub({
//     subscribeKey: "sub-c-441be6a2-5d04-11e6-ada4-02ee2ddab7fe",
//     publishKey: "pub-c-d223f6bb-65ab-4128-b272-3984970759c1'",
//     // secretKey: "secretKey",
//     // cipherKey: "myCipherKey",
//     authKey: "AuthKeyBob",
//     logVerbosity: true,
//     uuid: "UUID-bob",
//     ssl: true,
//     // origin: "custom.pubnub.com",
//     presenceTimeout: 130,
//     heartbeatInterval: 60
// });
//
// // single-user scenario
// pubnub.addListener({
//     status: function(statusEvent) {
//         if (statusEvent.category === "PNConnectedCategory") {
//             var payload = {
//                 my: 'hey bob'
//             };
//             pubnub.publish(
//                 {
//                     message: payload
//                 },
//                 function (status) {
//                     // handle publish response
//                 }
//             );
//         }
//     },
//     message: function(msg) {
//         // handle message
//         console.log(msg);
//     },
//     presence: function(presenceEvent) {
//         // handle presence
//     }
// })
//
// pubnub.subscribe({
//     channels: ['mr-demo']
// });

// multi-user scenario
// pubnub.subscribe({
//     channels: ['mr-demo'],
//     withPresence: true // also subscribe to presence instances.
// });
//
// pubnub.publish(
//     {
//         message: {
//             such: 'hey bob'
//         },
//         channel: 'mr-demo',
//         sendByPost: false, // true to send via post
//         // storeInHistory: false, //override default storage options
//         meta: {
//             "cool": "meta"
//         }   // publish extra meta with the request
//     },
//     function (status, response) {
//         if (status.error) {
//             // handle error
//             console.log(status)
//         } else {
//             console.log("message Published w/ timetoken", response.timetoken)
//         }
//     }
// );
