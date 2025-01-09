window.onload = function() {
    checkLoginStatus();
    document.querySelector('button').addEventListener('click', buttonListener);
};

function checkLoginStatus() {
    chrome.storage.local.get("userId", (result) => {
        if(result.userId){
            document.querySelector('button').innerText = "Logout";
        } else {
            document.querySelector('button').innerText = "Login";
        }
    })
}

function buttonListener() {
    const buttonText = document.querySelector('button').innerText;
    if(buttonText == "Logout") logOutUser(); 
    else getUserSub();
}

function getUserSub() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
        if(chrome.runtime.lastError) {
            console.error("Error getting the token:", chrome.runtime.lastError.message);
            return;
        }

        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((resp) => resp.json())
        .then((userInfo) => {
            console.log("User Info:", userInfo);

            const userSub = userInfo.sub;
            const name = userInfo.given_name;
            
            chrome.storage.local.set({userId: userSub, name: name}, () => {
                alert("Logged in successfully!");
                checkLoginStatus();
            });
        })
        .catch((err) => {
            console.error(err);
            alert("Logged in failed!");
        });
    });
}

function logOutUser() {
    chrome.storage.local.clear(() => {
        alert("Logged out successfully!");
        checkLoginStatus();
    })
}