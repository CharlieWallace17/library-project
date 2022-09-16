const newBookBtn = document.querySelector("button.newBook");
const myForm = document.querySelector("form");
const subBtn = document.querySelector("button.submit");
const cancelBtn = document.querySelector("button.cancel");
const authorInput = document.querySelector("input#author");
const titleInput = document.querySelector("input#title");
const pagesInput = document.querySelector("input#pages");
const readBox = document.querySelector("input#isRead");
const bookList = document.querySelector("div.bookList");
const myLibrary = [];

function Book(author, title, numPages, isRead = "No") {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    if (!authorInput.value || !titleInput.value || !pagesInput.value) {
        return alert("Please fill out the form.");
    }
    let obj = new Book(authorInput.value, titleInput.value, pagesInput.value);

    if (readBox.checked) {
        obj.isRead = "Yes";
    }

    myForm.reset();
    closeForm();
    bookListupdate(obj, myLibrary);
}

function newBookForm() {
    myForm.style.display = "block";
}

function closeForm() {
    myForm.style.display = "none";
}

function bookListupdate(obj, myLibrary) {
    myLibrary.push(obj);

    const newListItem = document.createElement("div");
    const deleteBtn = document.createElement("button");

    newListItem.textContent = `
    Author: ${obj.author}
    Title: "${obj.title}"
    Pages: ${obj.numPages}
    Read? ${obj.isRead}
    `;

    deleteBtn.textContent = "Delete";
    newListItem.classList.add("bookBlock");
    newListItem.setAttribute("data-index", myLibrary.length - 1);
    deleteBtn.classList.add("deleteThis");

    bookList.appendChild(newListItem);
    newListItem.appendChild(deleteBtn);
}

newBookBtn.addEventListener("click", newBookForm);
cancelBtn.addEventListener("click", closeForm);
subBtn.addEventListener("click", addBookToLibrary);
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteThis")) {
        e.target.parentElement.remove();
        myLibrary.splice(e.target.parentElement.getAttribute("data-index"), 1);

        document.querySelectorAll(".bookBlock").forEach((block) => {
            let i = 0;
            for (; i < myLibrary.length; i++) {
                block.setAttribute("data-index", i);
            }
        });
    }
});