
const taskList = document.querySelector('.list-of-task');

const form = document.forms['To-Do-Form'];

form.addEventListener('submit', e => {
    e.preventDefault(); // prevents from restarting

    var taskName = document.getElementById('task-name').value;
    var task = document.createElement('li');

    var html = `
        <div class="task-div">
            <p class="name-of-task">${taskName}</p>
            <button class="button">Delete</button>
            <button class="button">Edit</button>
        </div>
    `

    task.innerHTML = html;
    taskList.appendChild(task)
})
