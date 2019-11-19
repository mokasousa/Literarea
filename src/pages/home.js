import Input from "../Components/input.js";
import Button from "../Components/button.js"

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

const bookAPI = 'https://www.googleapis.com/books/v1/volumes?q='
const main = document.querySelector('.page')
let bookUrl = ''


function Home() {
  let location = 'Alameda Santos 2356 Cerqueira Cesar Sao Paulo Brasil';
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyAUaI90oFUYGhg6NNi4G8n37ahqzP3laUk")
  .then(response => response.json())
  .then(res => console.log(res.results[0].geometry.location));

 return main.innerHTML = `
 <div id="map"></div>
 ${Input({
   type: 'text',
   class: 'search',
   placeholder: 'Título ou Autor',
   value: '',
 })
 }
 ${Button({
  type: 'submit',
  class: 'search-btn',
  onclick: test,
  title: 'Pesquisar',
  dataId: 'search-btn',
 })
}
<section class="all-books"></section>
`
}

const test = () => {
  const bookAPI = 'https://www.googleapis.com/books/v1/volumes?q='
  const searchBox = document.querySelector('.search').value
    bookUrl = bookAPI + searchBox +'&maxResults=40'
    app.searchInAPI(bookUrl)
}

const searchInAPI = (bookUrl) => {
  const searchBox = document.querySelector('.search');
  const allBooks = document.querySelector('.all-books');
    searchBox.value = ""
    allBooks.innerHTML= ""

    fetch(bookUrl)
    .then(data => data.json())
    .then(containt => {
       let result = containt.items
       let booksWithImages = []
        result.forEach(element => {
            if(element.volumeInfo.imageLinks !== undefined){
                booksWithImages.push(element)
            }
        });

        booksWithImages.forEach(book => {
          console.log(book)
            const template =
             `<div class="book" data-id="${book.id}">
                <img src="${book.volumeInfo.imageLinks.thumbnail}"/>
                <p>${book.volumeInfo.title}</p>
                <p> ${book.id}</p>
                <button type="button" class="wish-list" data-id="${book.id}"
                  onclick="app.iWantButton(event.target.dataset.id)"> Quero </button>
                <button type="button" class="wish-list" data-id="${book.id}"
                onclick="app.iHaveButton(event.target.dataset.id)"> Tenho </button>
                `
            allBooks.innerHTML += template
        })
    })
}


const iWantButton = (id) => {
  fetch(bookAPI+id)
    .then(data => data.json())
    .then((data) => {
      const title = data.items[0].volumeInfo.title;
      const bookImage = data.items[0].volumeInfo.imageLinks.thumbnail;
      const author = data.items[0].volumeInfo.authors;
      const wishBooks = {
        book: id,
        title: title,
        photo: bookImage,
        author: author,
      }

      const actualUser = firebase.auth().currentUser.uid
      firebase.firestore()
      .collection('users')
      .doc(actualUser)
      .collection('iWant')
      .add(wishBooks)
      .then(console.log('funfou'))

    })
  .then(alert("livro adicionado"))
}

const iHaveButton = (id) => {
  fetch(bookAPI+id)
    .then(data => data.json())
    .then((data) => {
      const title = data.items[0].volumeInfo.title;
      const bookImage = data.items[0].volumeInfo.imageLinks.thumbnail;
      const author = data.items[0].volumeInfo.authors;
      const myBooks = {
        book: id,
        title: title,
        photo: bookImage,
        author: author,
      }

      const actualUser = firebase.auth().currentUser.uid
      firebase.firestore()
      .collection('users')
      .doc(actualUser)
      .collection('iHave')
      .add(myBooks)
      .then(console.log('funfou'))

    })
  .then(alert("livro adicionado"))
}

setTimeout(initMap, 3000);

function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.hash = '#login';
    });
}

window.app = {
  iHaveButton: iHaveButton,
  iWantButton: iWantButton,
  test: test,
  searchInAPI: searchInAPI,
}

export default Home;
