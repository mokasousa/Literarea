function InitMap() {
    
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
        }, )

        map.addObject(userMarker);
    }


    function callback(position) {
        currentPosition(position.coords.latitude, position.coords.longitude);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        console.log("Geolocation is not supported by this browser!");
    }

    firebase.firestore().collection('users')
        .get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                const address = doc.data().address;
                const id = doc.data().id;

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
                        }, )
                        map.addObject(marker);
                    },
                    error => console.error(error)
                );
            });
        })
}

export default InitMap
