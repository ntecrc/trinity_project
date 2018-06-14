var onProfileClick = function (docTile) {
    console.log(document.querySelector(docTile));
    var isActive = document.querySelector(docTile).classList.contains('active');
    !isActive ? document.querySelector(docTile).classList.add('active') : document.querySelector(docTile).classList.remove('active');
};

document.addEventListener('DOMContentLoaded', function (e) {
    console.log('list js loaded')
    var currentUrl = window.location.href;
    var condition = currentUrl.slice(currentUrl.indexOf('=') + 1, currentUrl.length); 
    var api_key = '574ed0fbc60ac48c790cea0499b42494'; // Get your API key at developer.betterdoctor.com
    var queryURL = 'https://api.betterdoctor.com/2016-03-01/doctors';

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            //location: "37.773,-122.41 3,100",
            user_key: api_key,
            query: condition
        }
    }).then(function (response) {
        console.log(response);
        $('.test').empty();
        response.data.forEach(function (data) {
            var docName = data.profile.first_name + " " + data.profile.last_name;
            var docSpeacialties = data.specialties[0].actor + ", " + data.profile.title + "<br>" + data.specialties[0].description;
            var docDegree = data.educations.school;
            var docPic = data.profile.image_url;
            var docBio = data.profile.bio;
            var docPhone = data.practices[0].phones[0].number;
            var docInfo = data.practices[0].name + "<br>" + data.practices[0].visit_address.street + ", " + data.practices[0].visit_address.zip;
            let testHTML = `
            
                   <img class="img-fluid rounded-circle mb-3" src='${docPic}' id="docPic">
                
                    <small>${docSpeacialties}</small>
                    <h3>Dr. ${docName}</h3>
                    <div class="${docName.replace(/\s/g, '')}-doc-bio doc-bio">${docBio}</div>
                    <ul>
                       
                        <li><span class="profile-link" href="#" onclick="onProfileClick('.${docName.replace(/\s/g, '')}-doc-bio')">Profile</span</li>
                        <li>Phone#: <a href='tel:+1${docPhone}'>${docPhone}</a></li>
                        
                    </ul>
                <hr>
                    `;

            $('.test').append(testHTML);

            var results = response.data;
            var lat = parseFloat(response.data[0].practices[0].lat);
            var lng = parseFloat(response.data[0].practices[0].lon);
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
        });
    }).fail(function (error) {
        $('.showDoctors').text("No doctors found that met your search criteria");
    });

});

