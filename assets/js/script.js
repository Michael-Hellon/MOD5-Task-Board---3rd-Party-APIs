const taskFormEl = $('#task-form');
const taskTitleEl = $('#task-title');
const taskDescriptionEl = $('#task-description');
const taskDisplayEl = $('#task-display');
const taskDueDateEl = $('#task-due-date')
// individual cards
const todoCardEl = $('#todo-cards');
const inProgressCardEl = $('#in-progress-cards');
const doneCardEl = $('#done-cards');

// Retrieve tasks from localStorage 
let taskList = JSON.parse(localStorage.getItem('tasks')) ||[];

const generateTaskId = () => {
  return crypto.randomUUID();
}

//  a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete');
  const deleteTaskFunction = () => {
    handleDeleteTask(task.id);
  }
  cardDeleteBtn.on('click', deleteTaskFunction);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

  const renderTaskList = (tasks) => {
    todoCardEl.empty();
    inProgressCardEl.empty();
    doneCardEl.empty();

  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoCardEl.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressCardEl.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneCardEl.append(createTaskCard(task));
    }
  };

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

}

// function to handle adding a new task
const handleAddTask = (event) => {
  event.preventDefault();

  // new task object with the data from the form
  const newTask = {
    name: taskTitleEl.val().trim(),
    dueDate: taskDueDateEl.val().trim(),
    description: taskDescriptionEl.val().trim(),
    id: generateTaskId(),
    status: 'to-do',
  };

  taskList.push(newTask)

  localStorage.setItem('tasks', JSON.stringify(taskList));
  const taskModal = bootstrap.Modal.getInstance(document.getElementById('formModal'))
  taskModal.hide();
  renderTaskList(taskList);

  taskTitleEl.val('');
  taskDueDateEl.val('');
  taskDescriptionEl.val('');
}

taskFormEl.on('submit', handleAddTask);

// function to handle deleting a task
const handleDeleteTask = (taskId) => {
  taskList.forEach((task) => {
      if (task.id === taskId) {
          taskList.splice(taskList.indexOf(task), 1);
      }
  });

  localStorage.setItem('tasks', JSON.stringify(taskList));

  renderTaskList(taskList);
};

// function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  
  const taskToDoId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  for (let task of taskList) {
    if (task.id === taskToDoId) {
      task.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwriting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList(taskList);
}

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(() => {
    renderTaskList(taskList);

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

