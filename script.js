//buttons & EventListener
const saveATodoButton = document.querySelector("#saveATodoButton");
const removeDoneTodosButton = document.querySelector("#removeDoneTodosButton");
saveATodoButton.addEventListener("click", newTodosInAnArray);
//removeDoneTodosButton.addEventListener("click", deleteAllDoneTodos);

//global variables and arry
const storedEntrys = [];
/**
 * read the inputbox and write it in an array
 */
function newTodosInAnArray() {
  //variables
  let newEntry = document.querySelector("#inputBox").value;

  let listObject = {};
  listObject = {
    text: newEntry,
    status: "",
  };
  storedEntrys.push(listObject);
  document.querySelector("#inputBox").value = "";
  writeListFromArray();
}

/* ausgelagerte Zeilen

*/

/**
 * create a button for don todos
 */
function createDeletemarker() {
  let deleteMarkerElem = document.createElement("input");

  deleteMarkerElem.addEventListener("change", changeFont);
  deleteMarkerElem.type = "checkbox";
  //deleteMarkerElem.style.marginLeft = "15px"; -->> CSS
  deleteMarkerElem.setAttribute("class", "buttonStyle");

  return deleteMarkerElem;
}

/**
 * save a new todo: add the to the list and store it in an array
 */
function writeListFromArray() {
  const list = document.querySelector("#list");
  const li = document.createElement("li");

  for (let i = 0; i < storedEntrys.length; i++) {
    let todoText = storedEntrys[i].text;
    const deleteMarkerElem = createDeletemarker();

    li.innerText = todoText;

    li.appendChild(deleteMarkerElem);
    list.append(li);
    //newEntry = "";
  }
}

/**
 * change typo if todo is done
 */
function changeFont(event) {
  //variables
  const doneCheck = document.querySelector("doneCheck");
  const LiElement = event.target.parentElement;
}

/**
 * delete the done todos from list and array
 */
function deleteAllDoneTodos() {
  //variables
}

/*
push to array
refactor: list generate from array instead with method appendchild
write as an objekt to array as an own function
get attribute "checked" and do as second value to the object
  - get parent element
  - after click "doneButton" update object in array
  - regenerate list from array

filter function
- if questions to filter in own functions (3x)
- get attribute "checked" from array
- for each to scan the array
- call function to write the list from filtered array



*/
