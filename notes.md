## Database:

{
    
    username: String,
    questions: [{
        name: String,
        link: String,
        rating: Number,
        note: String
    }]

}

## APIs

# GET (/api/getNotes)
- request.body should be of the form:
{
    username: String,
    questionNumber: Number,
    Length: Number
}


# POST (/api/addNote)

- request.body should be a JSON of the form:

{
    username: String,
    questionName: String,
    questionURL: String,
    questionRating: Number,
    note: String

}



PUT => changeNote (username, q, newtext)
DELTE => deleteNote (username, q)