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

        booksWithImages.forEach(element => {
            const template =
             `<div class="book" data-id="${element.id}">
                <img src="${element.volumeInfo.imageLinks.thumbnail}"/>
                <p>${element.volumeInfo.title}</p>
                <button type="button" class="wish-list" id="${element.id}" onclick="pushToArray()"> Quero </button>
                <button type="button" class="library"> Tenho </button>
            </div>`
            allBooks.innerHTML += template
        })
    })
}

const pushToArray = () => {
   const btnId = document.querySelector('.wish-list').id
   console.log(btnId)
    // template = 
    // `<div class="book">
    //             <img src="${element.volumeInfo.imageLinks.thumbnail}"/>
    //             <p>${element.volumeInfo.title}</p>
    // </div>`
    // wishList.push(template)
}

Home();
