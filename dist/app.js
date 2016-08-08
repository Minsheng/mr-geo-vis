'use strict';

var _https = require('https');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pubnub = require('pubnub');

var _pubnub2 = _interopRequireDefault(_pubnub);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// only use this function from https
var credentials = {
    key: _fs2.default.readFileSync('./keys/key.pem'),
    cert: _fs2.default.readFileSync('./keys/key-cert.pem')
};

var port = process.env.PORT || 8000;

var app = (0, _express2.default)();

app.use(function (req, res, next) {
    console.log(req.method + ' request for ' + req.url);
    next(); // send response back
});

app.use(_express2.default.static("./public"));

(0, _https.createServer)(credentials, app).listen(port);

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