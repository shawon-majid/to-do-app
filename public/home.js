

const taskList = document.querySelector('.list-of-task');

const form = document.forms['To-Do-Form'];



addTaskHtml = (id, taskName) => {

    var task = document.createElement('li');
    var html = `
        <div class="task-div">
            <p class="name-of-task">${taskName}</p>
            <button class="button delete" onclick="clickDeleteButton(this, '${id}')">Delete</button>
            <button class="button edit" onclick="clickEditButton('${id}')">Edit</button>
        </div>
    `

    task.innerHTML = html;
    taskList.appendChild(task)


}


fetch('/tasks').then((response) => {
    response.json().then((data) => {

        data.forEach(element => {

            console.log(element);

            console.log(element.taskId, element.taskName);

            addTaskHtml(element.taskId, element.taskName);
        });

    })
})

form.addEventListener('submit', e => {
    e.preventDefault(); // prevents from restarting

    var taskName = document.getElementById('task-name').value;

    // will generate some id
    var id = generateRandomId(8);


    addTaskHtml(id, taskName);

    // now add this to database

    const data = {
        taskId: `${id}`,
        taskName: taskName,
    }

    fetch('/tasks', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then((val) => {
        console.log('Added Successfully')
    })


})




clickDeleteButton = (button, id) => {
    console.log('delete button clicked')

    console.log(button.parentElement.parentElement);

    const liElement = button.parentElement.parentElement; // button's parent = div, div's parent = li

    taskList.removeChild(liElement);

    // then remove it from the database;

    fetch(`/tasks/${id}`, {
        method: 'DELETE',
    }).then((val) => {
        console.log('Deleted Successfully')
    });
}

clickEditButton = (id) => {
    console.log('Edit button clicked')

    window.location.href = `/edit/${id}`;
    // taskList.parent
}



function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
