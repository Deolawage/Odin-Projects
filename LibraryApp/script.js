
class Book{
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = crypto.randomUUID();
    }

toggleRead(){
  this.isRead = !this.isRead;  
}

}


class Library{
    constructor(){
        this.books = [];
    }

    addBook(title, author, pages, isRead){
        const book = new Book(title, author, pages, isRead);
        this.books.push(book);
    }

    findBook(bookId){
        return this.books.find(book => book.id === bookId);
    }

    removeBook(bookId) {
        const book = this.findBook(bookId);
        
         if (!book) return;

        const index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }

    toggleBookRead(bookId){
       const book = this.findBook(bookId);
       
       if (!book) return;
         
        book.toggleRead();
    }
}

const myLibrary = new Library();

myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(myLibrary);


class DisplayController{
  constructor(library){
    this.library = library;
  }

createBookCard(book) {
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

    card.dataset.id = book.id;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
        this.library.removeBook(book.id);
        this.displayBooks();
    });

    card.appendChild(removeBtn);

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";

    toggleBtn.addEventListener("click", () => {
        this.library.toggleBookRead(book.id);
        this.displayBooks();
    });

    card.appendChild(toggleBtn);

    return card;
}

displayBooks(){
    const library = document.getElementById("library");
    library.textContent = "";

    for(const book of this.library.books){
        const card = this.createBookCard(book);
        library.appendChild(card);
    }
}

 
  openBookForm(){
    const newBookBtn = document.getElementById("new-book-btn");
    const bookDialog = document.getElementById("book-dialog");

    newBookBtn.addEventListener("click", () => {
        bookDialog.showModal();
    });
  }
  
  handleBookForm(){
    const bookForm = document.getElementById("book-form");
    const bookDialog = document.getElementById("book-dialog");
    
    bookForm.addEventListener("submit", (event) =>{
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const isRead = document.getElementById("is-read").checked;
        
        this.library.addBook(title, author, pages, isRead);
        bookDialog.close();
        this.displayBooks();
        
    })
  }

  closeBookForm(){
    const closeButton =document.getElementById("close-dialog");
    const bookDialog = document.getElementById("book-dialog");


    closeButton.addEventListener("click", () =>{
        bookDialog.close();
    })
  }



}

const displayController = new DisplayController(myLibrary);

displayController.displayBooks();
displayController.openBookForm();
displayController.handleBookForm();
displayController.closeBookForm();

