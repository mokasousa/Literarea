function InitMap() {
    let marker, position;

    // Print Map
    const platform = new H.service.Platform({
        'apikey': 'nq3453HnDGdLLeabEWsaeCA14GnxNLXlvwzebECKl-U'
      });
      
    const defaultLayers = platform.createDefaultLayers();
      
    const options = {
    zoom: 13,
    center: { lat: -23.557536, lng: -46.662385 }
    };
    
    const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, options);

    // Transform address to pin 
        //for each address from firebase set searchText
    const geocodingParams = {
    searchText: 'Alameda Santos 2356 Cerqueira Cesar Sao Paulo Brasil'
    };

    const onResult = (result) => {
        const locations = result.Response.View[0].Result;
        console.log(locations);

        locations.forEach((address) => {
        
            position = {
                lat: address.Location.DisplayPosition.Latitude,
                lng: address.Location.DisplayPosition.Longitude
            };

            marker = new H.map.Marker(position);

            map.addObject(marker);
        })

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                position = {
                    lat: position.coords.Latitude,
                    lng: position.coords.Longitude
                };

            });
            marker = new H.map.Marker(position);

            map.addObject(marker);
            
        } else {
            console.log("Geolocation is not supported by this browser!");
        }
    };
    
    const geocoder = platform.getGeocodingService();
    
    geocoder.geocode(geocodingParams, onResult, (e) => console.log(e));
    
    // marker.addEventListener('click', () => {
    //     console.log('aceitou!')
    // });

}

export default InitMap


// GOOGLE MAPS

// const options = {
//     center: {lat: -23.557536, lng: -46.662385},
//     zoom: 12
// };

// const map = new google.maps.Map(document.getElementById('map'), options);

// let markers = [
//     {
//         coords:{lat: -23.557231, lng: -46.659413},
//         // icon: '../img/purple-pin.png',
//         content: '<p>Manuel da Costa</p>'
//     },//ibmec
//     {
//         coords:{lat: -23.556926, lng: -46.662106},
//         // icon: '../img/purple-pin.png',
//         content: '<p>Adriana</p>'
//     },
//     {
//         coords:{lat: -23.557811, lng: -46.663630},
//         // icon: '../img/purple-pin.png',
//         content: '<p>Renata</p>'
//     }
// ];

// function addMarker(props){
//     const marker = new google.maps.Marker({
//             position:props.coords,
//             map: map,
//             contents: props.content,
//             //icon: props.icon,
//         });

//     let infoWindow = new google.maps.InfoWindow({
//         content: props.content,
//     });

//     marker.addListener('click', () => {
//         infoWindow.open(map, marker);
//         //ADD aqui o get do firebase
//     });
//     return marker;
// }

// markers.forEach(i => {
//     //console.log(i);
//     addMarker(i);
// });


//Geocoding maps

// let location = 'Alameda Santos 2356 Cerqueira Cesar Sao Paulo Brasil';
  // fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyAUaI90oFUYGhg6NNi4G8n37ahqzP3laUk")
  // .then(response => response.json())
  // .then(res => console.log(res.results[0].geometry.location));

