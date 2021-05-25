// embed classes.js
import { ListObject } from "./classes.js";

//global variables, arry and eventListener
const saveATodoButton = document.querySelector("#saveATodoButton");
saveATodoButton.addEventListener("click", newTodosInAnArray);
const inputField = document.querySelector("#inputBox");
inputField.addEventListener("keyup", newTodoOnEnter);
function newTodoOnEnter(event) {
  if (event.keyCode === 13) {
    newTodosInAnArray();
  }
}

let storedEntrys = [];
window.storedEntrys = storedEntrys;

// radio section start
const displayOnlyOpenTodosButton = document.querySelector(
  "#displayOnlyOpenTodosButton"
);
displayOnlyOpenTodosButton.addEventListener("click", () => {
  displayAllTodos();
  displayOnlyOpenTodos();
});
const displayOnlyDoneTodosButton = document.querySelector(
  "#displayOnlyDoneTodosButton"
);
displayOnlyDoneTodosButton.addEventListener("click", () => {
  displayAllTodos();
  displayOnlyDoneTodos();
});
const displayAllTodosButton = document.querySelector("#displayAllTodosButton");
displayAllTodosButton.addEventListener("click", displayAllTodos);
//radio section end

//remove done todos section start
const removeDoneTodosButton = document.querySelector("#removeDoneTodosButton");
removeDoneTodosButton.addEventListener("click", deleteAllDoneTodos);
//remove done todos section end

//initial function
restoreFromLocal();
displayChoosedSelection();

/**
 * show the choosed selection
 */
function displayChoosedSelection() {
  let selected = "";
  const selectionUnit = document.getElementsByName("selectTodosButton");
  for (let i = 0; i < selectionUnit.length; i++) {
    if (selectionUnit[i].checked) {
      selected = selectionUnit[i].id;
      if (selected === "displayAllTodosButton") {
        displayAllTodos();
      }
      if (selected === "displayOnlyOpenTodosButton") {
        displayOnlyOpenTodos();
      }
      if (selected === "displayOnlyDoneTodosButton") {
        displayOnlyDoneTodos();
      }
    }
  }
}

/**
 * read the inputbox and write it in an array
 */
function newTodosInAnArray() {
  //variables
  let newEntry = document.querySelector("#inputBox").value;

  if (newEntry.length > 4) {
    const newTodoObj = new ListObject(newEntry);
    storedEntrys.push(newTodoObj);
    document.querySelector("#inputBox").value = "";
    saveArrayToLocalStorage();
    displayChoosedSelection();
  } else {
    alert("this todo is to short");
  }
}

/**
 * create a checkbox for done todos
 */
function createDeletemarker(todoStatus) {
  let deleteMarkerElem = document.createElement("input");
  deleteMarkerElem.type = "checkbox";
  deleteMarkerElem.checked = todoStatus;
  deleteMarkerElem.style.marginLeft = "15px";
  deleteMarkerElem.setAttribute("class", "buttonStyle");

  return deleteMarkerElem;
}
/**
 * write list from Array
 */
function writeListFromArray(currentDisplayArray) {
  list.innerHTML = "";

  for (let i = 0; i < currentDisplayArray.length; i++) {
    const li = document.createElement("li");

    let todoText = currentDisplayArray[i].text;
    let todoStatus = currentDisplayArray[i].status;
    const deleteMarkerElem = createDeletemarker(todoStatus);
    li.objectContent = currentDisplayArray[i];
    li.innerText = todoText;
    li.setAttribute("data-content", todoText);

    li.appendChild(deleteMarkerElem);
    list.append(li);
  }
}

/**
 * set the value of done-Button
 */
function toggleTodoCheckbox(e) {
  if (e.target.tagName === "INPUT") {
    const checkbox = e.target;
    const todoState = checkbox.checked;

    const todoLiElement = e.target.parentElement;
    const todoObj = todoLiElement.objectContent;
    todoObj.setDoneState(todoState);
    saveArrayToLocalStorage();
    if (todoState === true) {
      todoLiElement.setAttribute("class", "done");
    } else {
      todoLiElement.removeAttribute("class", "done");
    }
  }
}
list.addEventListener("change", toggleTodoCheckbox);

/**
 * show only open todos (for radio-button)
 */
function displayOnlyOpenTodos() {
  const currentDisplayArray = [];
  currentDisplayArray.length = 0;
  for (let i = 0; i < storedEntrys.length; i++) {
    if (storedEntrys[i].status === false) {
      currentDisplayArray.push(storedEntrys[i]);
    }
  }
  writeListFromArray(currentDisplayArray);
}

/**
 * hide open todos (for radio-button)
 */
function displayOnlyDoneTodos() {
  const currentDisplayArray = [];
  currentDisplayArray.length = 0;
  for (let i = 0; i < storedEntrys.length; i++) {
    if (storedEntrys[i].status === true) {
      currentDisplayArray.push(storedEntrys[i]);
    }
  }
  writeListFromArray(currentDisplayArray);
}

/**
 * display all todos (for radio-button)
 */
function displayAllTodos() {
  let currentDisplayArray = [];
  currentDisplayArray = storedEntrys;

  writeListFromArray(currentDisplayArray);
}

/**
 * delete the done todos from list
 */
function deleteAllDoneTodos() {
  //variables
  for (let i = storedEntrys.length - 1; i >= 0; i--) {
    if (storedEntrys[i].status === true) {
      let todoindex = storedEntrys.indexOf(storedEntrys[i]);
      storedEntrys.splice(todoindex, 1);
    }
  }
  saveArrayToLocalStorage();
  displayChoosedSelection();
  //writeListFromArray();
}

/**
 * write the current Array to the local storage
 */
function saveArrayToLocalStorage() {
  //make a string from the Arry and store it in the brwoser local storage
  localStorage.setItem("arr", JSON.stringify(storedEntrys));
}

/**
 * //restore the Array) from the local storage and write the list
 */
function restoreFromLocal(listObject) {
  //variables / get JSON-string and parse it
  let EntrysFromStorage = JSON.parse(localStorage.getItem("arr"));
  //check whether the local storage is empty
  if (EntrysFromStorage !== null) {
    //only if local storage is not empty, update the Array with the content
    for (let i = 0; i < EntrysFromStorage.length; i++) {
      let todoText = EntrysFromStorage[i].text;
      let todoStatus = EntrysFromStorage[i].status;
      const restoredTodoObj = new ListObject(todoText, todoStatus);
      storedEntrys.push(restoredTodoObj);
    }
  }
}
