// This file contains the js code for the google maps api
// 
// Script for linking this js code to the html code below:
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
//  type="text/javascript"></script>
//
// google maps Input API Key = AIzaSyBDpZfrYnejpr2QUgPiVBHQ9QMkjMGQuaE


//Adding event to search button on html
// betterDoctor API key = 574ed0fbc60ac48c790cea0499b42494
//Getting the data from api BetterDoctor when user input and click button
// function initMap() {
//     console.log('Map is ready');

// }

$(document).ready(function () {


    $("#search-button").on("click", function (event) {
        console.log('Map Object');
        event.preventDefault();
        var user_input = document.getElementById('condition').value;
        //function carries out the event to retrieve data based on user query

        
        var api_key = '574ed0fbc60ac48c790cea0499b42494';
        var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?user_key=' + api_key + '&query=' +
            user_input;

        $.ajax({
            type: 'GET',
            url: resource_url,
            dataType: 'JSON',
            timeOut: 5000,

            success: function (searchResults) {
                console.log(searchResults);
                var results = searchResults.data;
                var lat = parseFloat(searchResults.data[0].practices[0].lat);
                var lng = parseFloat(searchResults.data[0].practices[0].lon);
                // The map, centered at Doctor
                // TODO: How to centre map amongst all different practices location
                var map = new google.maps.Map(document.getElementById('map_listing'), { zoom: 4, center: { lat: lat, lng: lng } });
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    console.log(result);
                    // // The location of doctor
                    var doctorLocation = { lat: parseFloat(result.practices[0].lat), lng: parseFloat(result.practices[0].lon) };
                    console.log(doctorLocation);
                    // // The marker, positioned at Uluru
                    var marker = new google.maps.Marker({ position: doctorLocation, map: map });

                  
            
                }
            }
        });
    })

});