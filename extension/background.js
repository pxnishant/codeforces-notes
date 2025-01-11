const backendUrl = "https://codeforces-notes.vercel.app/";
const cookieName = "auth";

chrome.runtime.onInstalled.addListener(() => {
    console.log("Service-worker is up!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResp) => {
    // Message is from content Script
    if(sender.tab){
        if(message.type === "isLoggedIn?"){
            chrome.cookies.get({url: backendUrl, name: cookieName}, (cookie) => {
                if(cookie) sendResp(true);
                else sendResp(false);
            })
        }
        return true;
    }
})