// const { response } = require("express");


const regButton = document.querySelector('.register-button');

regButton.addEventListener("click", async (event) => {

    event.preventDefault();

    usernameInput = document.getElementById('username').value;
    emailInput = document.getElementById('email').value;
    passwordInput = document.getElementById('password').value;

    if (usernameInput && emailInput && passwordInput) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert("Invalid email address!");
            return;
        }
        const data = {
            username: usernameInput,
            email: emailInput,
            password: passwordInput,
        }

        const response = await fetch('/reg', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })


        const jsonformat = await response.json();

        console.log(jsonformat);

        if (response.ok) {
            document.body.innerHTML = `<h1 style="text-align: center;">Registration Success</h1>
            <a href="/">
              <button style="display: block; margin: 0 auto;">Login</button>
            </a>`;
        }


    }
    else {
        alert("Please Fill up the form properly");
    }



})



