const backendUrl = "https://codeforces-notes.vercel.app/";
const cookieName = "auth";

chrome.runtime.onInstalled.addListener(() => {
    console.log("Service-worker is up!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResp) => {
    // Message is from content Script
    if (sender.tab) {
        if (message.type === "isLoggedIn") {
            chrome.cookies.get({ url: backendUrl, name: cookieName }, (cookie) => {
                if (cookie) sendResp(cookie.value);
                else sendResp(false);
            });
            return true; // Indicate async response
        } else if (message.type === "getNote") {
            let getURL = `${backendUrl}api/getNote/${message.pType}/${message.contestId}/${message.problemId}/group/${message.groupId}`;
            console.log(getURL);
            fetch(getURL, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${message.token}`
                }
            })
                .then(res => {
                    if(res.status === 404) return "";
                    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                    return res.text(); // Parse response as JSON
                })
                .then(data => {
                    console.log(`NOTE: ${data}`);
                    sendResp(data); // Send the response back to the content script
                })
                .catch(e => {
                    console.error("Error fetching note:", e.message);
                    sendResp(""); // Send error details
                });
            return true;
        } else if(message.type === 'editNote'){
            let getURL = `${backendUrl}api/editNote/${message.pType}/${message.contestId}/${message.problemId}/group/${message.groupId}`;
            console.log(getURL);
            fetch(getURL, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${message.token}`
                },
                body: JSON.stringify({
                    note: message.note,
                })
            })
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                    return res.text();
                })
                .then((data) => {
                    sendResp(data)
                })
                .catch((err) => {
                    console.log(err);
                    sendResp(err.message);
                });
            return true;
        } else if(message.type === "addNote") {
            let getURL = `${backendUrl}api/addNote`;
            console.log(getURL);
            fetch(getURL, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${message.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    note: message.note,
                    groupId: message.groupId,
                    contestId: message.contestId,
                    problemId: message.problemId,
                    type: message.pType,
                    qName: message.qName
                })
            })
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                    return res.text();
                })
                .then((data) => {
                    sendResp(data)
                })
                .catch((err) => {
                    console.log(err);
                    sendResp(err.message);
                });
            return true;
        }
    }
});