// get references to the input field, add task button , and task list
const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addtask');
const taskList = document.getElementById('taskList');

// try to load tasks from local storage when the page loads.
const savedTasks = localStorage.getItem('tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

function saveTasks() {
    // save the current tasks to local storage.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function to add a new task to the list.
function createTaskElement(task, index) {
    const li = document.createElement('li');


    // checkbox to toggle completion.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', (e) => {
        task.completed = e.target.checked

        textNode.style.textDecoration = task.completed ? 'line-through' : 'none';
        saveTasks();
    });


    // text content for the task.
    const textNode = document.createElement('span');
    textNode.textContent = task.text;
    textNode.style.margin = '0 8px';
    if (task.completed) {
        textNode.style.textDecoration = 'line-through';

    }

    // add double click event listener to edit the task.
    textNode.addEventListener('dblclick', (e) => {
       const newText = prompt('Edit task :', task.text);
        if (newText !== null) {
            task.text = newText.trim();
            textNode.textContent = task.text;
            saveTasks();
        }

    });

    // delete button to remove the task.
    const delbtn = document.createElement('button')
    delbtn.textContent = 'Delete';
    delbtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });
    
    li.appendChild(checkbox);
    li.appendChild(textNode);
    li.appendChild(delbtn);
    return li;

}


// Render the whole tasks list from tasks array.
function renderTasks() {
    // clear the current list
    taskList.innerHTML = '';

    // recreat each item
    tasks.forEach((task, index) => {
        const node = createTaskElement(task, index);
        taskList.appendChild(node);
    });

}
function addTask() {
    const taskText = input.value.trim();
    if (!taskText) {
        return;
    }
    // push a new task object.
    tasks.push({text: taskText, completed: false });
    input.value = '';
    renderTasks();
    saveTasks();

}
addTaskButton.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTask();
    }
});
renderTasks();