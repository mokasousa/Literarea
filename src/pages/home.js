import Input from "../Components/input.js";
import Button from "../Components/button.js";
import actionIcon from "../Components/action-icon.js";
import InitMap from "../Components/map.js"

const bookAPI = 'https://www.googleapis.com/books/v1/volumes?q='
const main = document.querySelector('.page')
let bookUrl = ''

function Home() {

  setTimeout(InitMap, 3000);
  getBooks()
 return main.innerHTML = `

 <header>
  <img src="/images/literarea.png" class="header-img"/>
  <div>
    ${actionIcon({
      class: 'signout-icon fas fa-sign-out-alt',
      name: 'sair',
      onClick: signOut,
    })}
    <p class="signout-text"> Sair </p>
  </div>
 </header>

 <div id="map"></div>

 <div class="search-box">
  ${Input({
    type: 'text',
    class: 'search',
    placeholder: 'Título/Autor',
    value: '',
  })}
  ${Button({
    type: 'submit',
    class: 'search-btn register-link',
    onclick: apiAddress,
    title: 'Pesquisar',
    dataId: 'search-btn',
  })}
</div>

<section class="all-books"></section>
`
  
}

const apiAddress = () => {
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
            if(element.volumeInfo.imageLinks !== undefined && 
                element.volumeInfo.authors !== undefined){
                booksWithImages.push(element)
            }
        });

        booksWithImages.forEach(book => {
            const template =
             `<section class="book-card" data-id="${book.id}">
                <img src="${book.volumeInfo.imageLinks.thumbnail}"/>
                <article class="book-info">
                  <p class="book-title">${book.volumeInfo.title}</p>
                  <button type="button" class="book-list btn-login" data-id="${book.id}"
                    onclick="app.iWantButton(event.target.dataset.id)"> ♡ Quero </button>
                  <button type="button" class="book-list btn-login" data-id="${book.id}"
                    onclick="app.exchangeButton(event.target.dataset.id)"> ✓ Tenho p/ Trocar </button>
                  <button type="button" class="book-list btn-login" data-id="${book.id}"
                    onclick="app.donationButton(event.target.dataset.id)"> ✓ Tenho p/ Doar </button>
                </article>
              </section>
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
      .then(alert("livro adicionado à lista de Desejos"))

    })
}

const exchangeButton = (id) => {
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
      .collection('exchange')
      .add(myBooks)
      .then(alert("livro adicionado à Seus Livros para Troca "))

    })
}

const donationButton = (id) => {
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
      .collection('donation')
      .add(myBooks)
      .then(alert("livro adicionado à Seus Livros para Doação "))

    })
}

function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.hash = '#login';
    });
}


window.app = {
  exchangeButton: exchangeButton,
  donationButton: donationButton,
  iWantButton: iWantButton,
  apiAddress: apiAddress,
  searchInAPI: searchInAPI,
  signOut:signOut
}

export default Home;