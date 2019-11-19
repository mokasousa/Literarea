function InitMap() {
    let marker, position, group;

    // Print Map
    const platform = new H.service.Platform({
        'apikey': 'nq3453HnDGdLLeabEWsaeCA14GnxNLXlvwzebECKl-U'
    });

    const defaultLayers = platform.createDefaultLayers();

    const options = {
        zoom: 10,
    };

    const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, options);
    const ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR');
    const mapEvents = new H.mapevents.MapEvents(map);
    const iconYellow = new H.map.Icon("/images/pin_amarelo.svg");
    const iconPurple = new H.map.Icon("/images/pin_roxo.svg");
    //Fim do print
    function currentPosition(lat, lng) {
        position = {
            lat: lat,
            lng: lng,
        }
        map.setCenter(position);
        const userMarker = new H.map.Marker(position, { icon: iconYellow });
        userMarker.addEventListener('click', () => console.log('oooo'))
        map.addObject(userMarker);
        return position;
    }
    function callback(position) {
        currentPosition(position.coords.latitude, position.coords.longitude);

    }
    //Track user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);

    } else {
        console.log("Geolocation is not supported by this browser!");
    }


    firebase.firestore().collection('users')
        .get()
        .then((querySnapshot) => {
            //Pega os users de acordo com o cadastro -> coloca os pins
            const locations = [];
            querySnapshot.forEach((doc) => {
                const address = doc.data().address;
                const name = doc.data().name;
                locations.push({ address, name });
            });

            locations.forEach((location) => {
                const geocoder = platform.getGeocodingService();
                geocoder.geocode({searchText: location.address}, onResult, (e) => console.log(e));
            });

            function onResult(result) {
                
                if (result.Response.View.length !== 0) {
                    const locations = result.Response.View[0].Result;
                    const postions = locations.map((address) => {
                        return {
                            lat: address.Location.DisplayPosition.Latitude,
                            lng: address.Location.DisplayPosition.Longitude
                        }
                    });

                    console.log(postions)
                    const marker = new H.map.Marker(postions[0], { icon: iconPurple });
                    marker.setData('ananan');
                    marker.addEventListener('tap', (event) => {
                        console.log('oioioi');
                        const bubble = new H.ui.InfoBubble(
                                event.target.b, { content: event.target.getData() })
                                ui.addBubble(bubble)
                        }, )
                    map.addObject(marker);
                    // console.log(map)
                        // // marker.setData(nameMarker);

                }
            }

                // group.addObject(marker);
                //ForEach acaba aqui

        }) //Fecha o then
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

