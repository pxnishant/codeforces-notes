const statusDiv = document.getElementsByClassName("status")[0];
const loginScreen = document.getElementsByClassName("loginScreen")[0];
const logoutScreen = document.getElementsByClassName("logoutScreen")[0];
const backendUrl = "https://codeforces-notes.vercel.app/";
const cookieName = "auth";

function checkCookie() {
    chrome.cookies.get({url: backendUrl, name: cookieName}, (cookie) => {
        if(cookie){
            statusDiv.textContent = "You're logged in!";
            loginScreen.style.display = "none";
            logoutScreen.style.display = "flex";
        } else {
            statusDiv.textContent = "Enter your email to login!";
            loginScreen.style.display = "flex";
            logoutScreen.style.display = "none";
        }
    });
}

const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");

loginButton.addEventListener('click', () => {
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const overlay = document.getElementById("loadingOverlay");

    if(emailRegex.test(email)){
        overlay.style.display = "flex";
        const magicLink = backendUrl + `api/auth/getMagicLink/${email}`;
        fetch(magicLink, {
            method: "GET",
        })
            .then((res) => {
                if(!res.ok){
                    console.log(res);
                    throw new Error("Try again after some time!");
                }
            })
            .then((data) => {
                if(data == 'error'){
                    statusDiv.textContent = "Try after some time.";
                } else {
                    statusDiv.innerHTML = `Check email for login link. <br /> <strong>Kindly use the same browser.</strong>`
                    loginScreen.style.display = "none";
                }
                reloadCurrentTab();
            })
            .catch((err) => {
                statusDiv.textContent = err;
                console.log(err);
            })
            .finally(() => {
                overlay.style.display = "none";
            })
    } else {
        statusDiv.textContent = "Kindly write the email address properly!"
    }
    
});

logoutButton.addEventListener('click', () => {
    if(window.confirm("Do you really want to logout?")){
        chrome.cookies.remove({url: backendUrl, name: cookieName}, (cookie) => {
            console.log(`removed cookie, ${cookie}`);
        });
        logoutScreen.style.display = "none";
        statusDiv.textContent = "Enter you email to login!";
        loginScreen.style.display = "flex";
        reloadCurrentTab();
    }    
})

function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}

document.addEventListener('DOMContentLoaded', checkCookie);