$(function initMap() {
    const options = {
        timeout: (5 * 1000),
        maximumAge: 0,
        enableHighAccuracy: true
    };

    var name = "";

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, function() {
            handleLocationError(true);
        }, options);
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false);
    }

    function success(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        document.getElementById('currentLat').innerHTML = pos.lat;
        document.getElementById('currentLon').innerHTML = pos.lng;

        console.log("Your current loc: " + pos.lat + " , " + pos.lng);

        var pubnub = new PubNub({
            subscribeKey: "sub-c-441be6a2-5d04-11e6-ada4-02ee2ddab7fe",
            publishKey: "pub-c-d223f6bb-65ab-4128-b272-3984970759c1",
            uuid: name,
            ssl: true
        });

        pubnub.publish({
            channel  : 'mr-demo',
            message  : {
                uuid : pubnub.getUUID(),
                type : 'geo',
                position : pos ? pos : "not found"
            },
            callback : function(m){
                console.log(m)
            }
        });

        pubnub.addListener({
            message: function(message) {
                // handle incoming messages
                console.log(message);
            },
            presence: function(presence) {
                // handle incoming presence events.
            },
            status: function(status) {
                // handle incoming status events.
            }
        });

        pubnub.subscribe({
            channels: ['mr-demo']
        });
    };

    function handleLocationError(browserHasGeolocation) {
        console.log(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    };

    var positionTimer = navigator.geolocation.watchPosition(
        success
    );

    // If the position hasn't updated within 5 minutes, stop
    // monitoring the position for changes.
    setTimeout(
        function(){
            // Clear the position watcher.
            navigator.geolocation.clearWatch( positionTimer );
        },
        (1000 * 60 * 5)
    );
});
