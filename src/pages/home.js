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

const searchButton = document.querySelector('.search-btn')

let searchData = ''
let bookUrl = ''
const wishList = []

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
                  onclick="app.pushToArray(event.target.dataset.id)"> Quero </button>
                <button type="button" class="library"> Tenho </button>
            </div>`
            allBooks.innerHTML += template
        })
    })
}


const pushToArray = (id) => {
  fetch(bookAPI+id)
    .then(data => data.json())
    .then((data) => {
      const title = data.items[0].volumeInfo.title;
      const bookImage = data.items[0].volumeInfo.imageLinks.thumbnail;
      const author = data.items[0].volumeInfo.authors;
      firebase.firestore().collection('books').add({
        book: id,
        title: title,
        photo: bookImage,
        author: author,
      })
    })
  .then(alert("livro adicionado"))


  // console.log(btnId)
  // btnId.forEach(button => {
  //   button
  //   button.dataset.id
  // })
}

setTimeout(initMap, 3000);

window.app = {
  pushToArray: pushToArray,
  test: test,
  searchInAPI: searchInAPI,
}

export default Home;
