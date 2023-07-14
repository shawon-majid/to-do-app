

const regButton = document.querySelector('.register-button');

regButton.addEventListener("click", (event) => {

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

        fetch('/reg', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) => {

            if (response.ok) {
                console.log("Registration Successful")
                window.location.href = `/`
            }
            else {
                alert("This email exists!");

            }


        }).catch(err => {
            console.log(err);
        })
    }
    else {
        alert("Please Fill up the form properly");
    }



})