let overlay = document.createElement('div');
overlay.style.position = "fixed";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.margin = 0;
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.zIndex = 999;
overlay.style.display = "none";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

let popupContainer = document.createElement("div");
popupContainer.style.position = 'fixed';
popupContainer.style.height = '50vh';
popupContainer.style.width = '50vw';
popupContainer.style.top = '50%';
popupContainer.style.left = '50%';
popupContainer.style.transform = 'translate(-50%, -50%)';
popupContainer.style.backgroundColor = 'white';
popupContainer.style.padding = '20px';
popupContainer.style.zIndex = 1001;
popupContainer.style.display = 'none';

let textArea = document.createElement("textarea");
textArea.style.width = '100%';
textArea.style.height = 'calc(100% - 40px)';
textArea.style.resize = 'none';
textArea.placeholder = "Add your notes here...";
textArea.padding = "5px";
popupContainer.appendChild(textArea);

let saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.style.marginTop = "10px";
saveButton.style.padding = "5px 10px";
saveButton.style.backgroundColor = "#007c10";
saveButton.style.color = "white";
saveButton.style.border = "none";
saveButton.style.cursor = "pointer";

saveButton.addEventListener("click", () => {
    console.log(username);
    // let questionName = ;
    // let questionURL = ;
    // let questionRating = ;
    let note = textArea.value;

    console.log(note);
    overlay.style.display = 'none';
    popupContainer.style.display = 'none';

    // let data = {
    //     username: username,
    //     questionName: questionName,
    //     questionURL: questionURL,
    //     questionRating: questionRating,
    //     note: note
    // };

    // let apiURL = ;

    // fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log("Notes saved:", data);
    //     alert("Notes saved successfully!");
    //     overlay.style.display = "none";
    //     popupContainer.style.display = "none";
    // })
    // .catch(error => {
    //     console.error("Error saving notes:", error);
    //     alert("Failed to save notes.");
    // });

})

popupContainer.appendChild(saveButton);

let closeButton = document.createElement("button");
closeButton.innerText = "Close";
closeButton.style.marginLeft = "10px";
closeButton.style.padding = "5px 10px";
closeButton.style.backgroundColor = "#cf2130";
closeButton.style.color = "white";
closeButton.style.border = "none";
closeButton.style.cursor = "pointer";

closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
    popupContainer.style.display = "none";
});

popupContainer.appendChild(closeButton);

let body = document.querySelector("div#body");
body.appendChild(overlay);
body.appendChild(popupContainer);

let navBar = document.querySelector('ul.second-level-menu-list');

if(navBar){
    let addNote = document.createElement('li');
    let addNoteLink = document.createElement('a');

    addNoteLink.innerText = 'ADD NOTE';
    addNoteLink.style.color = '#cf2130';
    addNoteLink.style.cursor = 'pointer';

    addNote.appendChild(addNoteLink);
    navBar.appendChild(addNote);

    addNoteLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("In Logged in fucntion!")
        chrome.runtime.sendMessage(
            {
                type: "isLoggedIn"
            },  (resp) => {
                if(resp){
                    overlay.style.display = 'block';
                    popupContainer.style.display = 'block';
                } else {
                    alert("Kindly login using extension icon.")
                }
        }); 
    });
    
} else {
    console.error("second-level-menu-list not found.");
}