//buttons & EventListener
const saveATodoButton = document.querySelector("#saveATodoButton");
const inputField = document.querySelector("#inputBox");

saveATodoButton.addEventListener("click", newTodosInList);

function newTodoOnEnter(event) {
  if (event.keyCode === 13) {
    newTodosInList();
  }
}
inputField.addEventListener("keyup", newTodoOnEnter);

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

const list = document.querySelector("#list");

class Todo {
  // Wird aufgerufen
  // wenn ein neues Todo Object erstellt wird
  constructor(text, status) {
    this.text = text;
    this.status = status;
  }
}

/**
 * read the inputbox and write it in the list
 */
function newTodosInList() {
  //variables
  const li = document.createElement("li");
  let newEntry = document.querySelector("#inputBox").value;
  const newTodoObject = new Todo(newEntry, false);

  li.todo = newTodoObject;

  li.innerText = newEntry;
  li.setAttribute("data-content", newEntry);
  const deleteMarkerElem = createDeletemarker();
  if (newEntry.length > 4) {
    li.appendChild(deleteMarkerElem);
    list.append(li);
    document.querySelector("#inputBox").value = "";
  } else {
    alert("this todo is to short");
  }
}

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
 * create a button for done todos
 */
function createDeletemarker() {
  let deleteMarkerElem = document.createElement("input");

  deleteMarkerElem.type = "checkbox";
  deleteMarkerElem.setAttribute("class", "buttonStyle");

  return deleteMarkerElem;
}

function toggleTodoCheckbox(e) {
  if (e.target.tagName === "INPUT") {
    const checkbox = e.target;
    const todoState = checkbox.checked;

    const todoLiElement = e.target.parentElement;
    todoLiElement.setAttribute("checked", todoState);
    let todoValue = todoLiElement.getAttribute("data-content");

    if (todoState === true) {
      todoLiElement.setAttribute("class", "done");
    } else {
      todoLiElement.removeAttribute("class", "done");
    }
  }
}

list.addEventListener("change", toggleTodoCheckbox);

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
