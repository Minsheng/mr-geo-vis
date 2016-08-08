import { createServer } from 'https'; // only use this function from https
import fs from 'fs';
import PubNub from 'pubnub';

const options = {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/key-cert.pem')
};

var handler = (req, res) => {
    res.writeHead(200);
    res.end('hello yo\n');
    // publish();
};

createServer(options, (req, res) => {
    handler(req, res);
}).listen(8000);

var pubnub = new PubNub({
    subscribeKey: "sub-c-441be6a2-5d04-11e6-ada4-02ee2ddab7fe",
    publishKey: "pub-c-d223f6bb-65ab-4128-b272-3984970759c1'",
    // secretKey: "secretKey",
    // cipherKey: "myCipherKey",
    authKey: "AuthKeyBob",
    logVerbosity: true,
    uuid: "UUID-bob",
    ssl: true,
    // origin: "custom.pubnub.com",
    presenceTimeout: 130,
    heartbeatInterval: 60
});

// single-user scenario
pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            var payload = {
                my: 'hey bob'
            };
            pubnub.publish(
                {
                    message: payload
                },
                function (status) {
                    // handle publish response
                }
            );
        }
    },
    message: function(msg) {
        // handle message
        console.log(msg);
    },
    presence: function(presenceEvent) {
        // handle presence
    }
})

pubnub.subscribe({
    channels: ['mr-demo']
});

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
