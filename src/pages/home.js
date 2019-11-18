function initMap() {

    const options = {
      center: {lat: -23.557536, lng: -46.662385},
      zoom: 12
    };

    const map = new google.maps.Map(document.getElementById('map'), options);
    
    let markers = [
        {
            coords:{lat: -23.557231, lng: -46.659413},
            // icon: '../img/purple-pin.png',
            content: '<p>Manuel da Costa</p>'
        },//ibmec
        {
            coords:{lat: -23.556926, lng: -46.662106},
            // icon: '../img/purple-pin.png',
            content: '<p>Adriana</p>'
        },
        {
            coords:{lat: -23.557811, lng: -46.663630},
            // icon: '../img/purple-pin.png',
            content: '<p>Renata</p>'
        }
    ];

    function addMarker(props){
        const marker = new google.maps.Marker({
                position:props.coords,
                map: map,
                contents: props.content,
                //icon: props.icon,
            });

        let infoWindow = new google.maps.InfoWindow({
            content: props.content,
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
            //ADD aqui o get do firebase
        });
        return marker;
    }

    markers.forEach(i => {
        //console.log(i);
        addMarker(i);
    });
}

setTimeout(initMap, 3000);

function Home() {
    let location = 'Alameda Santos 2356 Cerqueira Cesar Sao Paulo Brasil';
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyAUaI90oFUYGhg6NNi4G8n37ahqzP3laUk")
    .then(response => response.json())
    .then(res => console.log(res.results[0].geometry.location));
    const template = `
    <div id="map"></div>
    <h1>Olá</h1>`;
    return template;
}
export default Home;