const statusDiv = document.getElementsByClassName("status")[0];
const loginScreen = document.getElementsByClassName("loginScreen")[0];
const logoutScreen = document.getElementsByClassName("logoutScreen")[0];
const backendUrl = "http://localhost:3001/";
const cookieName = "auth";

function checkCookie() {
    chrome.cookies.get({url: backendUrl, name: cookieName}, (cookie) => {
        if(cookie){
            statusDiv.textContent = "You're logged in!";
            loginScreen.style.display = "none";
            logoutScreen.style.display = "block";
        } else {
            statusDiv.textContent = "Enter your email to login!";
            loginScreen.style.display = "block";
            logoutScreen.style.display = "none";
        }
    });
}

const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");

loginButton.addEventListener('click', () => {
    const magicLink = backendUrl + "api/auth/getMagicLink";
    const email = document.getElementById("email").value
    fetch(magicLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then((res) => {
            if(!res.ok){
                return "error";
            }
        })
        .then((data) => {
            if(data == 'error'){
                statusDiv.textContent = "Try after some time.";
            } else {
                statusDiv.textContent = `Check ${email} email for login link.`
                loginScreen.style.display = "none";
            }
        })
        .catch((err) => {
            statusDiv.textContent = `Error : ${err}`;
            console.log(err);
        });
});

logoutButton.addEventListener('click', () => {
    chrome.cookies.clear({url: backendUrl, name: cookieName}, (cookie) => {
        console.log(`removed cookie, ${cookie}`);
    })
})

document.addEventListener('DOMContentLoaded', checkCookie);