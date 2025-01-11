let username = document.querySelector('div.lang-chooser').innerText.trim().split(" ")[0];
console.log(username);

const clearBody = () => {
    const page = document.querySelector('#pageContent');
    const allDivs = page.querySelectorAll('div')

    for (let i = 0; i < allDivs.length; i++) {
        if (allDivs[i].classList.contains('roundbox') && allDivs[i].classList.contains('borderTopRound') && allDivs[i].classList.contains('borderBottomRound')) {
            allDivs[i].style.display = "none";
        }
      }

}
1
const createNote = (name, link, rating, note) => {

    const noteDiv = document.createElement('div')
    noteDiv.classList.add('note')

    const qLink = document.createElement('a')
    qLink.href = link
    qLink.innerText = name
    qLink.style.color = "black"
    qLink.classList.add('questionTitle')
    noteDiv.appendChild(qLink)

    const noteItems = document.createElement('div')
    noteItems.classList.add('noteItems')

    const viewButton = document.createElement('button')
    viewButton.innerText = "View Note"
    noteItems.appendChild(viewButton)
    // const ratingElement = document.createElement('p')
    // ratingElement.innerText = `Rating: ${rating}`
    // noteItems.appendChild(ratingElement)
    noteDiv.appendChild(noteItems)

    return noteDiv

}

if(username === 'Enter' || username === 'Войти'){
    console.log("Kindly login first.")
} else {
    let navBar = document.querySelector('ul.second-level-menu-list');

    if(navBar){
        let viewNote = document.createElement('li');
        let viewNoteLink = document.createElement('a');
        viewNoteLink.innerText = 'VIEW NOTES';
        viewNoteLink.style.color = '#cf2130';
        viewNoteLink.style.cursor = 'pointer';

        viewNote.addEventListener('click', (e) => {
            e.preventDefault()
            clearBody()
        })
        
        viewNote.appendChild(viewNoteLink);
        navBar.appendChild(viewNote);

    } else {
        console.error("second-level-menu-list not found.");
    }

    const page = document.querySelector('#pageContent');

    const noteContainer = document.createElement('div')
    noteContainer.classList.add('noteContainer')
    
    //add notes here
    noteContainer.appendChild(createNote("Div 2 A: Food", "https:cf.com/question1", 1800, "this is a note"))
    noteContainer.appendChild(createNote("Div 2 B: Food", "https:cf.com/question2", 1800, "this is a note"))
    noteContainer.appendChild(createNote("Div 2 C: Food", "https:cf.com/question3", 1800, "this is a note"))
    noteContainer.appendChild(createNote("Div 2 D: Food", "https:cf.com/question4", 1800, "this is a note"))

    page.appendChild(noteContainer)
}

