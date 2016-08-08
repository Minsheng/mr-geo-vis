// import { createServer } from 'https'; // only use this function from https
// import fs from 'fs';
// import PubNub from 'pubnub';
// import express from 'express';

var express = require('express');
var PubNub = require('pubnub');
var fs = require('fs');
var https = require('https');

const credentials = {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/key-cert.pem')
};

var port = process.env.PORT || 8000;

var app = express();

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // send response back
});

app.use(express.static("./public"));

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
