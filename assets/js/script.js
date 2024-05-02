const taskFormEl = $('#task-form');
const taskTitleEl = $('#task-title');
const taskDueDateE1 = $('#task-due-date');
const taskDescription = $('task-description');
const taskNameInputEl = $('#task-name-input');
const taskDueDateInputEl = $('#task-due-date-input')
const taskDescriptionInputEl = $('#task-description-input')


// Retrieve tasks and nextId from localStorage // leave it here
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Retrieve tasks from localStorage and parse the JSON to an array.
// If there are no tasks in localStorage, initialize an empty array and return it.
function readTaskFromStorage() {
  let taskList = JSON.parse(localStorage.getItem('tasks'));
  if(!tasklist) {
    taskList = []1;
  }
  return taskList;
}

// a function to generate a unique task id
function readNextIdFromStorage() {
  let nextId = JSON.parse(localStorage.getItem('nextId'));
  if(!nextId) {
    nextId = 1;
  } else {
    nextId++; 
  }
  localStorage.setItem('nextId', JSON.stringify(nextId));
  return nextId;
}

//  a function that accepts an array of tasks, stringifys them, and saves them in localStorage.
function saveTasksToStorage(taskList) {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

//  a function to create a task card
function createTaskCard(task) {
  // create a task card
  const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', task.id);
  // Creates a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  // Creates a new card body element and add the class `card-body`.
  const cardBody = $('<div>').addClass('card-body');
  // Creates a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  // Creates a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  // Creates a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
  const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
  // add a click event to deleteBtn
  cardDeleteBtn.on('click', handleDeleteProject);

  // Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // Append the card header and card body to the card.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // Return the card so it can be appended to the correct lane.
  return taskCard;
}

// create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  // ? Empty existing project cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // Loop through projects and create project cards for each status
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  };

  // ? Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  // gets the project name, type, and due date from the form
  const taskTitle = taskNameInputEl.val().trim();
  const taskDueDate = taskDueDateInputEl.val();
  const taskDescription = taskDescriptionInputEl.val();

  / ? Create a new project object with the data from the form
  const newProject = {
    /* ? Here we use a tool called `crypto` to generate a random id for our task.
     This is a unique identifier that we can use to find the task in the array. 
     `crypto` is a built-in module that we can use in the browser and Nodejs. */
    id: crypto.randomUUID(),
    taskName: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription,
    status: 'to-do',
  };

//Pull the projects from localStorage and push the new project to the array
const tasks = readTaskFromStorage();
tasks.push(newTask);

// ? Save the updated projects array to localStorage
saveTasksToStorage(tasks);

// ? Print project data back to the screen
renderTaskList();

// Clear the form inputs
taskNameInputEl.val('');
taskDueDateInputEl.val('');
taskDescriptionInputEl.val('');

}

// create a function to handle deleting a task
function handleDeleteTask(event){
const taskId = $(this).attr('data-task-id');
const tasks = readTaskFromStorage();
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(tasks), 1)
    }
  })
  saveTasksToStorage(tasks);
  renderTaskList();
}

// create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Reads task from local storage
  const tasks = readTaskFromStorage()
  // get taskID from event
  const taskId = ui.draggable[0].dataset.taskId;
  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of tasks) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    // calendar
    $('#task-due-date').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  
    // ? Make lanes droppable
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
