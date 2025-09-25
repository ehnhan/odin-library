const myLibary = [];
const books_container = document.querySelector(".books");
const properties_to_show = ["title", "author", "pages"];

class Book {
    constructor(title, author, pages, read) {
        this.book_id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    books_container.innerHTML = "";
    myLibary.forEach(createBookElement);
}

function capitalizeFirstLetter(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}

function createBookElement(book) {
    let div = document.createElement("div");
    div.className = "book";
    div.dataset.bookID = book.book_id;

    for (prop in book) {
        console.log(typeof(prop));
        if (properties_to_show.includes(prop)) {
            let info = document.createElement("div");
            info.className = prop;
            info.innerText = `${capitalizeFirstLetter(prop)}: ${book[prop]}`;
            div.appendChild(info);
        }
    }

    let readBtn = document.createElement("button");
    readBtn.innerText = book.read ? "Read" : "Not Read";
    readBtn.className = book.read ? "read" : "not_read";

    readBtn.addEventListener("click", (e) => {
        let update_id = e.target.parentNode.dataset.bookID;
        for (let i = 0; i < myLibary.length; i++) {
            if (myLibary[i].book_id == update_id) {
                myLibary[i].toggleRead();
                e.target.innerText = myLibary[i].read ? "Read" : "Not Read";
                e.target.className = myLibary[i].read ? "read" : "not_read";
            }
        }
    });
    div.appendChild(readBtn);

    let delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.className = "delete";

    delBtn.addEventListener("click", (e) => {
        // find id and remove from array
        let remove_id = e.target.parentNode.dataset.bookID;
        for (let i = 0; i < myLibary.length; i++) {
            if (myLibary[i].book_id == remove_id) {
                myLibary.splice(i, 1);
            }
        }
        displayBooks();
    });
    div.appendChild(delBtn);

    books_container.appendChild(div);
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add_book");
const closeButton = document.querySelector("#cancelBtn");
const confirmButton = document.querySelector("#confirmBtn");

const book_title = document.querySelector("#new_title");
const book_author = document.querySelector("#new_author");
const book_pages = document.querySelector("#new_pages");
const book_read = document.querySelector("#new_read");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!(book_title.value == "" || book_author.value == "" || book_pages.value == "")) {
        addBookToLibrary(book_title.value, book_author.value, book_pages.value, book_read.checked);
        displayBooks();
        resetForm();
        dialog.close();
    }
});

// "Close" button closes the dialog
closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    resetForm();
    dialog.close();
});

function resetForm() {
    book_title.value = "";
    book_author.value = "";
    book_pages.value = "";
    book_read.checked = false;
}

addBookToLibrary("Naruto","Masashi Kishimoto", 330, true);
addBookToLibrary("One Piece","Eiichiro Oda", 900, true);
addBookToLibrary("Beserk", "Kentaro Miura", 500, false);
displayBooks();