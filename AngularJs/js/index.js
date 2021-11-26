console.log("this is library")

Dshow();

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//show Book constructor
function showBook() {

}

//add method to show prototype
showBook.prototype.add = function (book) {

   Dshow();
}

function Dshow(){
    let Lib = localStorage.getItem("Lib");
    if (Lib == null) {
        LibObj = [];

    }
    else {
        LibObj = JSON.parse(Lib);
    }
    let html = ""
    let tableBody = document.getElementById('tableBody');
    LibObj.forEach((e, index) => {
        html += `<tr>
        <td>${e.name}</td>
        <td>${e.author}</td>
        <td>${e.type}</td>
        </tr>
        `
    })

    tableBody.innerHTML = html;
}
//Implementing validate function
showBook.prototype.validate = function (book) {
    if (book.name.length <= 3 || book.author.length < 3 || book.type == "nothing") {
        console.log(book.type)
        return false;
    }
    else {
        console.log("yo")
        return true
    }
}

//implementing show function
showBook.prototype.show = function (sh, message) {
    let alrt = document.getElementById('alrt');

    alrt.innerHTML = `<div class="alert alert-${sh} alert-dismissible fade show" role="alert">
            <strong>${sh}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
    setTimeout(() => {
        alrt.innerHTML = ""
    }, 3000);

}

//implementing clear function for clearing formm field
showBook.prototype.clearForm = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();

}


//Add submit event Listener in the form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('authorName').value;
    //Fiction cooking programming
    let fiction = document.getElementById('Ftype')
    let programming = document.getElementById('Ptype')
    let cooking = document.getElementById('Ctype')
    let type = "nothing";

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value
    }

    let book = new Book(name, author, type);
    let Lib = localStorage.getItem("Lib");                           //geting the items from local storage
    if (Lib == null) {
        LibObj = [];

    }
    else {
        LibObj = JSON.parse(Lib);
    }



    let display = new showBook();

    if (display.validate(book)) {
        LibObj.push(book);
        localStorage.setItem("Lib", JSON.stringify(LibObj))

        display.add(book);
        display.show('success', "Added Successfully")
        display.clearForm();
    }
    else {
        display.show('warning', "Sorry Please Enter Some thing")
    }
    e.preventDefault();
    
}

//clearing all books 
function clearAll(){
    localStorage.clear()
    Dshow();
}