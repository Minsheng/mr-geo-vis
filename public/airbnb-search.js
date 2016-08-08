$(function initMap() {
    var options = {
        timeout: (5 * 1000),
        maximumAge: 0,
        enableHighAccuracy: true
    };

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
