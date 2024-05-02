const taskFormEl = $('#task-form');
const taskTitleEl = $('#task-title');
const taskDueDateE1 = $('#task-due-date');
const taskDescription =$('task-description');

// Retrieve tasks and nextId from localStorage // leave it here
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    id: generateTaskId(), // 
    title: taskTitle,
    description: taskDescription,
    dueDate: projectDate,
};

// Todo: create a function to create a task card
function createTaskCard(task) {
  // create a task card
  const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', task.id);
// TODO: Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
// TODO: Create a new card body element and add the class `card-body`.
const cardBody = $('<div>').addClass('card-body');
// TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
const cardDescription = $('<p>').addClass('card-text').text(task.description);
// TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
// TODO: Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
// add a click event to deleteBtn
cardDeleteBtn.on('click', handleDeleteProject);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    printProjectData();

    // calendar
    $('#taskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  
    // ? Make lanes droppable
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
