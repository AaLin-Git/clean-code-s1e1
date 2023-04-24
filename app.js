var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");
  var checkBox=document.createElement("input");
  var label=document.createElement("label");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  label.innerText=taskString;
  label.className='item__task item__label';

  checkBox.classList.add("input-checkbox");
  checkBox.classList.add("item__input");
  checkBox.type="checkbox";

  editInput.type="text";
  editInput.className="item__task input-text";

  editButton.innerText="Edit";
  editButton.className="item__button button-edit";

  deleteButton.className="item__button button-delete";
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.alt='remove button icon';
  deleteButtonImg.classList.add("button-image");
  deleteButton.appendChild(deleteButtonImg);

  listItem.classList.add("task__item");
  listItem.classList.add("incomplete-tasks__item");
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}


var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem=this.parentNode;
  var editInput=listItem.querySelector('.input-text');
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".button-edit");
  var containsClass=listItem.classList.contains("incomplete-tasks__item_edit-mode");
  if(containsClass){
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }
  label.classList.toggle("item__label_edit-mode");
  editInput.classList.toggle("input-text_edit-mode");
  listItem.classList.toggle("incomplete-tasks__item_edit-mode");
};

var deleteTask=function(){
  console.log("Delete Task...");
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted=function(){
  console.log("Complete Task...");
  var listItem=this.parentNode;
  listItem.classList.add("item__label_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
  console.log("Incomplete Task...");
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector(".input-checkbox");
  var editButton=taskListItem.querySelector(".button-edit");
  var deleteButton=taskListItem.querySelector(".button-delete");
  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
