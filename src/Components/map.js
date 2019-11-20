function InitMap() {
    

    // Print Map
    const platform = new H.service.Platform({
        'apikey': 'nq3453HnDGdLLeabEWsaeCA14GnxNLXlvwzebECKl-U'
    });

    const defaultLayers = platform.createDefaultLayers();
    const options = {
        zoom: 11,
        center: { lat: -23.557536, lng: -46.662385 },
        pixelRatio: window.devicePixelRatio || 1
    };

    const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, options);

    window.addEventListener('resize', () => map.getViewPort().resize());

    const ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR');
    const mapEvents = new H.mapevents.MapEvents(map);
    const behavior = new H.mapevents.Behavior(mapEvents);

    const iconYellow = new H.map.Icon("/images/pin_amarelo.svg");
    const iconPurple = new H.map.Icon("/images/pin_roxo.svg");
    //Fim do print

    const user = firebase.auth().currentUser.uid;

    function currentPosition(lat, lng) {
        let position = {
            lat: lat,
            lng: lng,
        }
        map.setCenter(position);
        let userMarker = new H.map.Marker(position, { icon: iconYellow });
        userMarker.setData(user);
        userMarker.addEventListener('tap', (event) => {
            const loggedUser = event.target.getData();
            window.app.userProfile(loggedUser);
            // const bubble = new H.ui.InfoBubble(event.target.b, { content: event.target.getData() })
            // ui.addBubble(bubble)
        }, )

        map.addObject(userMarker);
        //return position;
    }


    function callback(position) {
        currentPosition(position.coords.latitude, position.coords.longitude);
    }

    //Track localização atual do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        console.log("Geolocation is not supported by this browser!");
    }

    firebase.firestore().collection('users')
        .get()
        .then((querySnapshot) => {
            //Pega os users de acordo com o cadastro -> coloca os pins

            //const locations = [];
            querySnapshot.forEach((doc) => {
                const address = doc.data().address;
                const id = doc.data().id;
                //locations.push({ address, name });

                const geocoder = platform.getGeocodingService();
                
                geocoder.geocode(
                    {
                        searchtext: address
                    },
                    success => {
                        let coordUser = success.Response.View[0].Result[0].Location.DisplayPosition;
                        let position = {
                            lat: coordUser.Latitude,
                            lng: coordUser.Longitude,
                        }
                        let marker = new H.map.Marker(position, { icon: iconPurple });
                        marker.setData(id);
                        marker.addEventListener('tap', (event) => {
                            const otherUsers = event.target.getData();
                            window.app.userProfile(otherUsers);
                            // const bubble = new H.ui.InfoBubble(
                            //     event.target.b, { content: event.target.getData() })
                            //     ui.addBubble(bubble)
                        }, )
                        map.addObject(marker);
                    },
                    error => console.error(error)
                );
            });
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

