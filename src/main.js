const main = document.querySelector('.page')

main.innerHTML = `
<input type="text" class="search" placeholder="Título ou Autor"></input>
<button type="submit" class="search-btn">Pesquisar</button>
<section class="all-books"></section>
`
const searchBox = document.querySelector('.search')
const searchButton = document.querySelector('.search-btn')
const bookAPI = 'https://www.googleapis.com/books/v1/volumes?q='
const allBooks = document.querySelector('.all-books')
let searchData = ''
let bookUrl = ''
const wishList = []


const test = () => {
    searchData = searchBox.value 
    bookUrl = bookAPI + searchData +'&maxResults=40'
    searchInAPI()
}

searchButton.addEventListener('click', test)

const searchInAPI = () => {
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

window.app = {
  pushToArray: pushToArray,
}

//import Login from './pages/login.js';
//import Signup from './pages/signup.js';

// function locationHashChanged() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       if (window.location.hash === '#home') {
//         document.querySelector('main').innerHTML = Home();
//       } else if (window.location.hash === '#login' || window.location.hash === '') {
//         document.querySelector('main').innerHTML = Login();
//       } else if (window.location.hash === '#signup') {
//         document.querySelector('main').innerHTML = Signup();
//     } else if (!user) {
//       if (window.location.hash === '#login' || window.location.hash === '') {
//         document.querySelector('main').innerHTML = Login();
//       } else if (window.location.hash === '#signup') {
//         document.querySelector('main').innerHTML = Signup();
//       }
//     }
//   });
// }
// window.addEventListener('load', locationHashChanged);
// window.addEventListener('hashchange', locationHashChanged, false);