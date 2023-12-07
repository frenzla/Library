const myLibrary = [];

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    this.changeRead = function () {
        if (this.read === true) {
            this.read = false;
        } else {
            this.read = true;
        };
    };
};

addBookToLibrary("War", "Marc Twain", 1973, 74, true);
addBookToLibrary("Light", "Ilan Pope", 1954, 113, false);
addBookToLibrary("SU World", "Peter Thiel", 1990, 43, true);

let addButton = document.getElementById("add");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
// Opens modal for input
addButton.addEventListener("click", () => {
    dialog.showModal();
});
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

function addBookToLibrary(title, author, year, pages, read) {
    let newBook = new Book(title, author, year, pages, read)
    myLibrary.push(newBook);
}

function generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    nbColumns = Object.keys(myLibrary[0]).length;
    nbRows = myLibrary.length;
    
    // creating headings
    const firstRow = document.createElement("tr");
    for (let i = 0; i < nbColumns-2; i++) {
        const columnHeading = document.createElement("th");
        const key = Object.keys(myLibrary[0])[i];
        const columnHeadingText = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
        columnHeading.appendChild(columnHeadingText);
        firstRow.appendChild(columnHeading);
    }
    //create additional heading
    const columnCheckbox = document.createElement("th");
    const columnCheckboxText = document.createTextNode("Read/Not Read");
    columnCheckbox.appendChild(columnCheckboxText);
    firstRow.appendChild(columnCheckbox);

    tblBody.appendChild(firstRow);


    // creating all cells
    for (let i = 0; i < nbRows; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j < nbColumns-2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const key = Object.keys(myLibrary[0])[j];
        const cell = document.createElement("td");
        let bookInfo = myLibrary[i][key];
        if (bookInfo === true) {
            bookInfo = "X";
        } else if (bookInfo === false) {
            bookInfo = "";
        };
        let cellText = document.createTextNode(bookInfo);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      //create "Read/Not read" button
      let bookInfo = myLibrary[i].read;
      const cell1 = document.createElement("td");
      const readButton = document.createElement("input");
      readButton.setAttribute("type", "checkbox");
      if (bookInfo === true) {
        readButton.setAttribute("checked", "true");
      };
      readButton.setAttribute("data-row", i);
      readButton.classList.add("read");
      cell1.appendChild(readButton);
      row.appendChild(cell1);
  
      // create "remove" button
      const cell2 = document.createElement("td");
      const rowButton = document.createElement("button");
      rowButton.setAttribute("type", "button");
      rowButton.setAttribute("data-row", i);
      rowButton.classList.add("del");
      let buttonText = document.createTextNode("Remove book");
      rowButton.appendChild(buttonText);
      cell2.appendChild(rowButton);
      row.appendChild(cell2);

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
  }

  function deleteTable() {
    // delete the <table> element
    const tbl = document.querySelector("table");
    tbl.remove();
  }

function libraryEmpty() {
    let libraryEmpty = (!myLibrary.length) ? true : false;
    return libraryEmpty;
}

if (libraryEmpty()) {
    const div = document.createElement('div');
    div.textContent = "Library is Empty";
    const container = document.querySelector('body');
    container.appendChild(div);
    } else {
        const div = document.createElement('div');
    div.textContent = "Library is NOT Empty";
    const container = document.querySelector('body');
    container.appendChild(div);
    generateTable();
};

function deleteBook(e) {
    myLibrary.splice(this.dataset.row,1);
    deleteTable();
    generateTable();
    activateListeners();
}

function toggleRead(e) {
    let bookToToggle = myLibrary[this.dataset.row];
    bookToToggle.changeRead();
    deleteTable();
    generateTable();
    activateListeners();
}

function activateListeners() {
    const removeButtons = document.querySelectorAll(".del");
    removeButtons.forEach(btn => btn.addEventListener("click", deleteBook));

    const readToggles = document.querySelectorAll(".read");
    readToggles.forEach(toggle => toggle.addEventListener("click", toggleRead));
}

activateListeners();