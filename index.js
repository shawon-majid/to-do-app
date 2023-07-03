
const taskList = document.querySelector('.list-of-task');

const form = document.forms['To-Do-Form'];

var num = 0;

form.addEventListener('submit', e => {
    e.preventDefault(); // prevents from restarting

    var taskName = document.getElementById('task-name').value;

    // will generate some id
    var id = num;
    num++;


    var task = document.createElement('li');
    var html = `
        <div class="task-div">
            <p class="name-of-task">${taskName}</p>
            <button class="button delete" onclick="clickDeleteButton(${id})">Delete</button>
            <button class="button edit" onclick="clickEditButton(${id})">Edit</button>
        </div>
    `

    task.innerHTML = html;
    taskList.appendChild(task)
})


clickEditButton = (id) => {
    console.log('Edit button clicked')
    console.log(id)
}
clickDeleteButton = (id) => {
    console.log('delete button clicked')
    console.log(id)
}
