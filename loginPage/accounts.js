const loginButton = document.querySelector('.js-button');

loginButton.addEventListener('click', function(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let accountFound = false;

    accounts.forEach(person => {
        if (username === person.username && password === person.password) {
            localStorage.setItem('loggedInUser', person.username);

            console.log("Right account");
            window.location.href = "shop.html";

            accountFound = true;
            return;
        }
    });

    if (!accountFound) {
        console.log("Incorrect username or password");
    }
});


