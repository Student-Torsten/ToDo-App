// embed classes.js
import { listObject } from "./classes.js";

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

/**
 * read the inputbox and write it in an array
 */
function newTodosInAnArray() {
  //variables
  let newEntry = document.querySelector("#inputBox").value;
  const newTodoObj = new listObject(newEntry);
  storedEntrys.push(newTodoObj);
  document.querySelector("#inputBox").value = "";
  writeListFromArray();
}

/**
 * create a checkbox for done todos
 */
function createDeletemarker() {
  let deleteMarkerElem = document.createElement("input");

  deleteMarkerElem.type = "checkbox";
  deleteMarkerElem.style.marginLeft = "15px";
  deleteMarkerElem.setAttribute("class", "buttonStyle");

  return deleteMarkerElem;
}
/**
 * write list from Array
 */
function writeListFromArray(listObject) {
  const li = document.createElement("li");

  for (let i = 0; i < storedEntrys.length; i++) {
    let todoText = storedEntrys[i].text;
    const deleteMarkerElem = createDeletemarker();
    li.objectContent = storedEntrys[i];
    li.innerText = todoText;
    li.setAttribute("data-content", todoText);

    li.appendChild(deleteMarkerElem);
    list.append(li);
  }
}
function toggleTodoCheckbox(e) {
  if (e.target.tagName === "INPUT") {
    const checkbox = e.target;
    const todoState = checkbox.checked;

    const todoLiElement = e.target.parentElement;
    //let todoValue = todoLiElement.getAttribute("data-content");
    const todoObj = todoLiElement.objectContent;
    todoObj.setDoneState(todoState);
    console.log(storedEntrys);
  }
}

list.addEventListener("change", toggleTodoCheckbox);

/**
 * show only open todos (for radio-button)
 */
function displayOnlyOpenTodos() {
  const toHideElement = document.querySelector("#list");

  for (let li of toHideElement.children) {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;

    if (isChecked === true) {
      li.hidden = true;
    }
  }
}
/**
 * hide open todos (for radio-button)
 */
function displayOnlyDoneTodos() {
  const toHideElement = document.querySelector("#list");

  for (let li of toHideElement.children) {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;

    if (isChecked === false) {
      li.hidden = true;
    }
  }
}
/**
 * display all todos (for radio-button)
 */
function displayAllTodos() {
  const toHideElement = document.querySelector("#list");

  for (let li of toHideElement.children) {
    li.hidden = false;
  }
}

/**
 * delete the done todos from list
 */
function deleteAllDoneTodos() {
  //variables
  const toHideElement = document.querySelector("#list").children;

  const length = toHideElement.length - 1;
  for (let i = length; i >= 0; i--) {
    let liNew = toHideElement[i];
    let checkbox = liNew.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;
    if (isChecked === true) {
      liNew.remove();
    }
  }
}
