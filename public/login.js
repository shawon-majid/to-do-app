

const loginButton = document.querySelector('.submit-button');

loginButton.addEventListener("click", async (event) => {

    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    const params = new URLSearchParams();
    params.append('email', emailInput);
    params.append('password', passwordInput);

    const response = await fetch(`/login?${params.toString()}`)

    if (response.ok) {
        // const user = await response.json()
        window.location.href = "/home";
    }
    else {
        alert("Verification failed! Try again");
    }

})