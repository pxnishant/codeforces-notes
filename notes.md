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

# GET (/api/getAllNotes)
- returns an array of all notes
- request.body should be of the form:
{
    username: String
}


# GET (/api/getNotes)
- returns "count" number of notes starting at "questionNumber" (included)
- startIndex = questionNumber -1
- endIndex = startIndex + count - 1
- request.body should be of the form:
{
    username: String,
    questionNumber: Number (1-indexed),
    count: Number
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


# PUT (/api/putNote)

- request.body should be a JSON of the form:

{
    username: String,
    questionNumber: Number,
    note: String
}

# DELETE (/api/deleteNote)

{
    username: String,
    questionNumber: Number

}