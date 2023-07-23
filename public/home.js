

const taskList = document.querySelector('.list-of-task');
const form = document.forms['To-Do-Form'];
const logoutButton = document.querySelector('.logout-button');
const userName = document.querySelector('.user-name');

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


// get all tasks

fetch('/tasks').then((response) => {

    if (response.ok) {

        response.json().then((data) => {
            userName.innerHTML = `User: ${data.username}`;
            (data.tasks).forEach(element => {
                addTaskHtml(element.taskId, element.taskName);
            });
        })
    }
    else {
        alert(response);
    }
})





// submit button
form.addEventListener('submit', e => {
    e.preventDefault(); // prevents from restarting

    var taskName = document.getElementById('task-name').value;
    if (taskName) {
        // will generate some id
        var id = generateRandomId(8);
        addTaskHtml(id, taskName);

        // now add this to database
        const data = {
            taskId: `${id}`,
            taskName: taskName,
        }

        addTask(data);

        document.getElementById('task-name').value = "";
    }

})

// logoutButton
logoutButton.addEventListener('click', async () => {
    // Perform logout functionality here
    const response = await fetch('/logout');
    if (response.ok) {
        window.location.href = '/';
    }
    else {
        alert("logout request failed. Try again!");
    }
});



// buttons

clickDeleteButton = (button, id) => {
    const liElement = button.parentElement.parentElement; // button's parent = div, div's parent = li
    taskList.removeChild(liElement);
    removeTask(id);
}


clickEditButton = (id) => {
    console.log('Edit button clicked')
    window.location.href = `/edit/${id}`;
}




// api calls

addTask = async (data) => {
    const response = await fetch('/tasks', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        alert(response.json());
    }
}


removeTask = async (id) => {
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        alert(response.json());
    }
}


// miscelinoous
generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
