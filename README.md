# MOD5-Task-Board---3rd-Party-APIs
Create a task board

## Description

For this week’s project I would create a simple task board using several API's and libraries. As tasks are entered, a card will be dynamically created on the page an placed in the 'To DO' column. The card will be red if the due date is past, yellow if they are due today, and white if they are due in the future. These cards can be dragged from column to column. The cards can be deleted once they have been completed. This will allow the user or a team to manage tasks. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery and bootstrap.

- My main motivation for this project was to see how well I knew how to use third-party API as well as Jquery, Bootstrap and Dayjs.
- I built this project to test my knowledge on how much I have learned about API's, Jquery, and Bootstrap.
- This project solves the problem of being able to track your tasks without needing something like Google calender or an email calendar.
- I learned that even something that seemed fairly simple can be still be quite complicated.
- My biggest challenge was with constructing the elements. I kept typing E1 (E one) instead of El. 

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Installation

There are no special installation steps for this project. All you need to do is clone the repository from GitHub onto your computer.

## Usage

Once you have it in your local repository, on your computer, you can use Visual Studio Code to open the folder. Then you will see the JavaScript.js, the index.html, the style.css and other associated files. You can then review the files, preview the script.js, style.css, and the index.html, and then open the index.html in a browser. Click on “Add Tasks” to build your task board.


To see the project on the browser visit <https://github.com/Michael-Hellon/Task-Board---3rd-Party-APIs>.

Drop down calendar for creating tasks
![screenshot](/assets/images/drop%20down%20calender.png)

Creating the tasks
![screenshot](/assets/images/creating%20new%20task.png)

Populated task board
![screenshot](/assets/images/populated%20task%20board.png)

## Credits

The original source code was provided by my client. I worked on this project myself with no other collaborators.

I used several pages from jQuery <https://jqueryui.com/> and Bootstrap <https://getbootstrap.com/docs/5.3/getting-started/introduction/> as references for this project.

## License

Please refer to the LICENSE in the repo.

