import Input from "../Components/input.js";
import Button from "../Components/button.js"

const bookAPI = 'https://www.googleapis.com/books/v1/volumes?q='
const main = document.querySelector('.page')
let bookUrl = ''

const Home = () => {
 return main.innerHTML = `
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


window.app = {
  iHaveButton: iHaveButton,
  iWantButton: iWantButton,
  test: test,
  searchInAPI: searchInAPI,
}

export default Home; 