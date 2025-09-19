const myLibary = [];
const books_container = document.querySelector(".books");
const properties_to_show = ["title", "author", "pages"];

function Book(title, author, pages, read) {
    this.book_id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${this.read ? "read" : "not read yet"}`
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    myLibary.forEach(createBookElement);
}

function createBookElement(book) {
    let div = document.createElement("div");
    div.className = "book";
    for (prop in book) {
        console.log(typeof(prop));
        if (properties_to_show.includes(prop)) {
            let info = document.createElement("div");
            info.className = prop;
            info.innerText = book[prop];
            div.appendChild(info);
        }
    }

    books_container.appendChild(div);
}

addBookToLibrary("Naruto","Masashi Kishimoto", 330, true);
addBookToLibrary("One Piece","Eiichiro Oda", 900, true);
addBookToLibrary("Beserk", "Kentaro Miura", 500, false);
displayBooks();