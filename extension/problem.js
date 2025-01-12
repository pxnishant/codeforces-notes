function extractIdsFromUrl(url) {
    let regexProblemset = /https:\/\/codeforces\.com\/problemset\/problem\/([^\/]+)\/([^\/]+)/;
    let regexGym = /https:\/\/codeforces\.com\/gym\/([^\/]+)\/problem\/([^\/]+)/;
    let regexGroup = /https:\/\/codeforces\.com\/group\/([^\/]+)\/contest\/([^\/]+)\/problem\/([^\/]+)/;
    let regexContest = /https:\/\/codeforces\.com\/contest\/([^\/]+)\/problem\/([^\/]+)/;

    let matchesProblemset = url.match(regexProblemset);
    let matchesGym = url.match(regexGym);
    let matchesGroup = url.match(regexGroup);
    let matchesContest = url.match(regexContest);

    if (matchesProblemset) {
        return { groupId: -1, contestId: matchesProblemset[1], problemId: matchesProblemset[2] };
    } else if (matchesGym) {
        return { groupId: -1, contestId: matchesGym[1], problemId: matchesGym[2] };
    } else if (matchesGroup) {
        return { groupId: matchesGroup[1], contestId: matchesGroup[2], problemId: matchesGroup[3] };
    } else if (matchesContest) {
        return { groupId: -1, contestId: matchesContest[1], problemId: matchesContest[2] };
    } else {
        return null;
    }
}

// ------------------- Starting setting up note frontend -------------------
let overlay = document.createElement('div');
overlay.classList.add('overlay');

let popupContainer = document.createElement("div");
popupContainer.classList.add('popup-container')

let textArea = document.createElement("textarea");
popupContainer.appendChild(textArea);

let saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.classList.add('save-button');

saveButton.addEventListener("click", async () => {
    let note = textArea.value;
    let message = {...ids, type:"addNote", qName: qName, token: userToken, note: note};
    if(currNote) message.type = "editNote";
    if(note.trim() != "" && note != currNote) {
        try {
            // Wrap chrome.runtime.sendMessage in a promise
            const res = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(message, (response) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError.message);
                    } else {
                        resolve(response);
                    }
                });
            });
            currNote = note;
            console.log(currNote);
            alert(res);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    } else {
        alert("No changes in the note!");
    }
    overlay.style.display = "none";
    popupContainer.style.display = "none";
    setup();
});

let editButton = document.createElement('button');
editButton.innerText = 'Edit note';
editButton.classList.add('edit-button');

editButton.addEventListener('click', () => {
    textArea.readOnly = false;
    saveButton.style.display = "inline-block";
    editButton.style.display = "none";
})

let closeButton = document.createElement("button");
closeButton.innerText = "Close";
closeButton.classList.add('close-button');

closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
    popupContainer.style.display = "none";
    setup();
});

popupContainer.appendChild(saveButton);
popupContainer.appendChild(editButton);
popupContainer.appendChild(closeButton);

let body = document.querySelector("div#body");
body.appendChild(overlay);
body.appendChild(popupContainer);

// ------------------- Ending setting up note frontend -------------------

let navBar = document.querySelector('ul.second-level-menu-list');
let addNote = document.createElement('li');
let addNoteLink = document.createElement('a');
addNoteLink.classList.add('add-note-link');

addNote.appendChild(addNoteLink);



// ------------------- Starting fetching and storing note and Ids ------------------
let currentUrl = window.location.href;
const qName = document.querySelector('.problem-statement .header .title').innerText;
console.log(qName);

//JSON object containing groupId, ContestId and problemId
let ids = extractIdsFromUrl(currentUrl); 
ids.pType = "normal";
if (currentUrl.includes('/gym/')) {
    ids.pType = "gym";
}

let currNote;
let userToken;
// Fetching and storing the userNote (if any).
async function main() {
    await chrome.runtime.sendMessage({type: "isLoggedIn"}, (resp) => {
        userToken = resp;
    })
    if(userToken == false){
        addNoteLink.innerText = "ADD NOTE";
        navBar.appendChild(addNote);
        addNoteLink.addEventListener("click", () => {
            alert("Kindly login using extension icon.")
        }); return;
    }
    currNote = await fetchNote(ids);
    console.log(`NOTE: ${currNote}`);
    setup();
    navBar.appendChild(addNote);
    addNoteLink.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.style.display = "block";
        popupContainer.style.display = "block";
    })
}

function setup() {
    console.log("In the setup!");
    console.log(currNote);
    if(currNote) {
        addNoteLink.innerText = "VIEW NOTE";
        textArea.readOnly = true;
        saveButton.style.display = "none";
        editButton.style.display = "inline-block";

    } else {
        addNoteLink.innerText = 'ADD NOTE';
        textArea.readOnly = false;
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    }
}
// ----------------- Ending fetching and storing note and Ids ---------------------



async function fetchNote(ids) {
    return new Promise((resolve, reject) => {
        let message = { ...ids, type: "getNote", token: userToken};
        chrome.runtime.sendMessage(message, (res) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message); 
            } else {
                resolve(res); 
            }
        });
    });
}


main();



