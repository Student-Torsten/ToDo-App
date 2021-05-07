//buttons & EventListener
const saveATodoButton = document.querySelector("#saveATodoButton");
const removeDoneTodosButton = document.querySelector("#removeDoneTodosButton");
saveATodoButton.addEventListener("click", saveTheNewTodo);
//removeDoneTodosButton.addEventListener("click", deleteAllDoneTodos);

//global variables and arry
const stored = [];

/**
 * save a new todo: add the to the list and store it in an array
 */
function saveTheNewTodo() {
  //variables
  let newEntry = "";
  newEntry = document.getElementById("#inputBox").value;
  const list = document.querySelector("#list");
  const li = document.createElement("li");
  const deleteMarker = document.createElement("input");

  deleteMarker.addEventListener("change", changeFont);

  //push newEntry with checkbox to list

  li.innerHTML = newEntry;

  deleteMarker.type = "checkbox";
  deleteMarker.style.marginLeft = "15px";
  deleteMarker.setAttribute("id", "doneCheck");
  console.log(newEntry);
  li.appendChild(deleteMarker);
  list.append(li);
  //document.querySelector("#inputBox").reset();
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
