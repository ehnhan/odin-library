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
    books_container.innerHTML = "";
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

    let button = document.createElement("button");
    button.innerText = "-"
    button.addEventListener("click", () => {
        // find id and remove from array
    });
    div.appendChild(button);

    books_container.appendChild(div);
}

addBookToLibrary("Naruto","Masashi Kishimoto", 330, true);
addBookToLibrary("One Piece","Eiichiro Oda", 900, true);
addBookToLibrary("Beserk", "Kentaro Miura", 500, false);
displayBooks();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add_book");
const closeButton = document.querySelector("#cancelBtn");
const confirmButton = document.querySelector("#confirmBtn");

const book_title = document.querySelector("#new_title");
const book_author = document.querySelector("#new_author");
const book_pages = document.querySelector("#new_pages");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();


    if (!(book_title.value == "" || book_author.value == "" || book_pages.value == "")) {
        addBookToLibrary(book_title.value, book_author.value, book_pages.value, false);
        displayBooks();
        book_title.value = "";
        book_author.value = "";
        book_pages.value = "";
        dialog.close();
    }

});

// "Close" button closes the dialog
closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    book_title.value = "";
    book_author.value = "";
    book_pages.value = "";
    dialog.close();
});

// const modalRoot = document.querySelector("dialog");
// modalRoot.addEventListener('click', () => {
//     dialog.close();
// });

// const modal = document.querySelector("#modal");
// modal.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     e.stopImmediatePropagation();
//     return false;
// });
