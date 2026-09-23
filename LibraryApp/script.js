
const myLibrary = [];





function Book(title, author, pages, isRead) {
this.title = title;
this.author = author;
this.pages = pages;
this.isRead = isRead;
this.id = crypto.randomUUID();


}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead){
const book = new Book(title, author, pages, isRead);
myLibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(myLibrary);


function displayBooks(){

const library = document.getElementById("library");
  library.textContent = "";

    for(const book of myLibrary){
        const card = document.createElement("div");
        card.classList.add("book-card");
          
          const title = document.createElement("h2");
             title.textContent = book.title;
                 card.appendChild(title);

                  const author = document.createElement("p");
             author.textContent = book.author;
                 card.appendChild(author);

                  const pages = document.createElement("p");
             pages.textContent = book.pages;
                 card.appendChild(pages);




                  const isRead = document.createElement("p");
             isRead.textContent = book.isRead;
                 card.appendChild(isRead);


                 library.appendChild(card);

                 




                 card.dataset.id = book.id;

const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.addEventListener("click", () => {
    const index = myLibrary.findIndex(b => b.id === book.id);
    myLibrary.splice(index, 1);
    displayBooks();
});
card.appendChild(removeBtn);



const toggleBtn = document.createElement("button");
toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
toggleBtn.addEventListener("click", () => {
    book.toggleRead();
    displayBooks();
});

card.appendChild(toggleBtn);

    }
}
displayBooks();
displayBooks();


let newBookBtn = document.getElementById("new-book-btn");
let bookDialog = document.getElementById("book-dialog")

function openBookForm(){
    newBookBtn.addEventListener("click", () =>{
  bookDialog.showModal();
    })
  
}
openBookForm();

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("is-read").checked;

        addBookToLibrary(title, author, pages, isRead);
           bookDialog.close();
      displayBooks();



})


const closeButton = document.getElementById("close-dialog");
closeButton.addEventListener("click", ()=>{
    bookDialog.close();
});
