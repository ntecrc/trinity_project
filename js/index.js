$(document).ready(function () {
    //Event listener for our search button 
    $("#search-button").on("click", function (event) {
        console.log('search condition');
        event.preventDefault();

        //Storingo our betterDoctor APIL URL for conditions list and API key 

        var api_key = '574ed0fbc60ac48c790cea0499b42494'; // Get your API key at developer.betterdoctor.com
        var queryURL = 'https://api.betterdoctor.com/2016-03-01/doctors';

        //Performing an AJAX GET request to our queryURL 
        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                //location: "37.773,-122.41 3,100",
                user_key: api_key,
                query: document.getElementById('condition').value
            }
        }).then(function (response) {
            console.log(response);
            $('.test').empty();
            (response.data.forEach(function (data) {
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
                    
                     <li>< class="profile-link" href="#" onclick="onProfileClick('.${docName.replace(/\s/g, '')}-doc-bio')">Profile</span</li>
                     <li>Phone#: <a href='tel:+1${docPhone}'>${docPhone}</a></li>
                     
                 </ul>
             <hr>
                 `;

         $('.test').append(testHTML);

                // let profileHTML = `
                //  <span>Dr. ${docName}</span>
                //  <p>${docSpeacialties}</p>
                //     <img src='${docPic}'>
                //     <br>
                //     <span>${docInfo}</span>
                //     <div>
                //         Phone#: <a href='tel:+1${docPhone}'>${docPhone}</a>
                //     </div>

                //     <hr>
                // `;
                // $('.showDoctors').append(profileHTML);

            }));
        })

            .fail(function (error) {
                $('.showDoctors').text("No doctors found that met your search criteria");


            });
    });

});
