
const url = document.URL;

const parts = url.split('/');

const taskIds = parts[parts.length - 1];

const taskNameElement = document.querySelector('.task-name');
const taskIdElement = document.querySelector('.task-id');

const form = document.forms['Edit-Form'];

taskIdElement.appendChild(document.createTextNode(taskIds))


fetch(`/tasks/${taskIds}`).then((response) => {
    response.json().then((data) => {
        // console.log(data.taskName)
        taskNameElement.appendChild(document.createTextNode(data.taskName))


        form.addEventListener('submit', e => {
            e.preventDefault(); // prevents from restarting

            var editedTask = document.getElementById('task-name').value;

            const data = {
                taskId: taskIds,
                taskName: editedTask,
            }

            if (editedTask) { // send a put request
                fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then((val) => {
                    console.log('Edited Successfully')
                })

                window.location.href = '/home';


            }

        })

    })
})





