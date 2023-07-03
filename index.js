
const taskList = document.querySelector('.list-of-task');

const form = document.forms['To-Do-Form'];

form.addEventListener('submit', e => {
    e.preventDefault(); // prevents from restarting

    var taskName = document.getElementById('task-name').value;

    var task = document.createElement('li');

    console.log(task)

    task.appendChild(document.createTextNode(taskName))

    taskList.appendChild(task)
})
