const backendUrl = "https://codeforces-notes.vercel.app/";
const cookieName = "auth";

chrome.runtime.onInstalled.addListener(() => {
    console.log("Service-worker is up!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResp) => {
    // Message is from content Script
    if(sender.tab){
        if(message.type === "isLoggedIn"){
            chrome.cookies.get({url: backendUrl, name: cookieName}, (cookie) => {
                if(cookie) sendResp(true);
                else sendResp(false);
            })
        } else if(message.type === "getNote") {
            let url = backendUrl + `api/getNote/${message.pType}/${message.contestId}/${message.problemId}/group/${message.groupId}`;
            
            fetch(url)
            .then(res => console.log(res))
            .then(data => {
                console.log(`NOTE: ${data}`);
                sendResp(data);
            })
            .catch(e => {
                console.error("Error saving notes:", error);
            });
        }
        return true;
    }
})