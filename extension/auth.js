const statusDiv = document.getElementsByClassName("status")[0];
const loginScreen = document.getElementsByClassName("loginScreen")[0];
const logoutScreen = document.getElementsByClassName("logoutScreen")[0];
const backendUrl = "https://codeforces-notes.vercel.app/";
const cookieName = "auth";

function showScreen(screen) {
    // Helper function to handle screen visibility
    loginScreen.classList.remove('active');
    logoutScreen.classList.remove('active');
    if (screen) {
        screen.classList.add('active');
    }
}

function updateStatus(message, isHTML = false) {
    // Helper function to update status with proper formatting
    if (isHTML) {
        statusDiv.innerHTML = message;
    } else {
        statusDiv.textContent = message;
    }
}

function checkCookie() {
    chrome.cookies.get({url: backendUrl, name: cookieName}, (cookie) => {
        if(cookie) {
            updateStatus("You're logged in!");
            showScreen(logoutScreen);
        } else {
            statusDiv.textContent = "Enter your email to login!";
            loginScreen.style.display = "flex";
            logoutScreen.style.display = "none";
        }
    });
}

function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const overlay = document.getElementById("loadingOverlay");

    if(emailRegex.test(email)) {
        overlay.style.display = "flex";
        const magicLink = backendUrl + `api/auth/getMagicLink/${email}`;
        
        fetch(magicLink, {
            method: "GET",
        })
            .then((res) => {
                if(!res.ok) {
                    throw new Error("Try again after some time!");
                }
            })
            .then((data) => {
                if(data === 'error') {
                    updateStatus("Try after some time.");
                } else {
                    updateStatus(`Check email for login link. <br /> <strong>Kindly use the same browser.</strong>`, true);
                    showScreen(null);
                    document.querySelector(".status").style.fontSize = "1.1rem";
                    document.querySelector(".status").style.marginBottom = "none";             
                     
                }
                reloadCurrentTab();
            })
            .catch((err) => {
                updateStatus(err.message);
                console.error('Login error:', err);
            })
            .finally(() => {
                overlay.style.display = "none";
            });
    } else {
        updateStatus("Please enter a valid email address!");
    }
}

function handleLogout() {
    if(window.confirm("Do you really want to logout?")) {
        chrome.cookies.remove({url: backendUrl, name: cookieName}, (cookie) => {
            console.log(`Cookie removed:`, cookie);
        });
        showScreen(loginScreen);
        updateStatus("Enter your email to login!");
        reloadCurrentTab();
    }    
}

function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', checkCookie);
document.getElementById("login").addEventListener('click', handleLogin);
document.getElementById("logout").addEventListener('click', handleLogout);