//Problem: User interation doesn't provide desired results. 
//Solution: Add interativity so the user can manage daily tasks. 

var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first-button
var incompleteTaskHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
var completedTaskHolder = document.getElementById('completed-tasks');; //completed-tasks


//New Task List Item
var createNewTaskElement = function(taskString) {
	//create list item
	var listItem = document.createElement('li');
		//input with check box
	var checkBox = document.createElement('input'); // Checkbx
			//label
	var label = document.createElement('label');
			//input (text)
	var editInput = document.createElement('input'); //text
			//button.edit
	var editButton = document.createElement('button');
			//button.delete
	var deleteButton = document.createElement('button');
			//Each elements, need to be modified 
			checkBox.type = 'checkbox';
			editInput.type = 'text'

			editButton.innerText = 'Edit';
			editButton.className = 'edit';
			deleteButton.innerText = 'Delete';
			deleteButton.className = 'delete';

			label.innerText = taskString;

			//Each elements, need to be appended
			listItem.appendChild(checkBox);
			listItem.appendChild(label);
			listItem.appendChild(editInput);
			listItem.appendChild(editButton);
			listItem.appendChild(deleteButton);

			return listItem;
}

//Add a new task
var addTask = function () {
	console.log('Add Task...');
		//Create a new list item with text from the #new-task
		var listItem = createNewTaskElement(taskInput.value);
		//Append listItem to incompleteTaskHolder			
		incompleteTaskHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);

		taskInput.value = "";
}
	


//Edit an Existing Task
var editTask = function () {
	console.log('Edit Task...');
	var listItem = this.parentNode;

	var editInput = listItem.querySelector('input[type=text]');
	var label = listItem.querySelector('label');

	var containsClass = listItem.classList.contains('editMode');
		//If the class of the parent is .editMode
		if(containsClass) {
			//Switch from .editMode
			//Label text become the input's value
			label.innerText = editInput.value;

		} else {
		 
			//switch to .editMode
			//input value becomes the label's text.
			editInput.value = label.innerText;
		}

		//toggle .editMode on list item.
		listItem.classList.toggle('editMode');

}


//Delete Task
var deleteTask = function () {
	console.log('Delete Task...');
		
		var listItem = this.parentNode;
		var ul = listItem.parentNode;

		//remove the Parent list item from the <ul>
		ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function () {
	console.log('Completed Task...');
	//append the task <li> to the ul#completed-tasks
	var listItem = this.parentNode;
	completedTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

//mark a task as Incomplete
var taskIncomplete = function () {
	console.log('Incompleted Task...');
		//append the task <li> to the ul#incomplete-tasks
	var listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	//select taskListItem's children
	var checkBox = taskListItem.querySelector('input[type=checkbox]');
	var editButton = taskListItem.querySelector('button.edit');
	var deleteButton = taskListItem.querySelector('button.delete') ;
		//bind the editTask to edit button
		editButton.onclick = editTask;
		//bind the deleteTask to the delete button
		deleteButton.onclick = deleteTask;
		//bind taskCompleted to the checkbox
		checkBox.onchange = checkBoxEventHandler;

}

var ajaxRequest = function () {

	console.log('Ajax Request');
}

//Set the click handler to the addtask function
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


//Cycle over the incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
		console.log('Bind List item events..');
		//bind events to list items children (taskCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)
}
	
//Cycle over the completeTaskHolder ul list items
for (var i = 0; i < completedTaskHolder.children.length; i++) {
		//bind events to list items children (taskCompleted)
		bindTaskEvents(completedTaskHolder.children[i], taskIncomplete)
}
	





