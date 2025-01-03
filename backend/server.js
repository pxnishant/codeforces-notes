const express = require('express')
const app = express()
const PORT = 3001
const User = require('./database/userSchema')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONN_URL).then(() => {
    console.log("successfully connected to mongodb")
})

app.use(express.json())


app.post('/api/addNote', (req, res) => {
    
    const newQuestion = {
        name: req.body.questionName,
        link: req.body.questionURL,
        rating: req.body.questionRating,
        note: req.body.note
    }

    User.updateOne(
        { username: req.body.username },
        { $push : { questions: newQuestion } }, 
        { upsert: true }
    ).then(() => {
        console.log("Note added successfully")
        res.send('PUT request successful')
    }).catch((e) => {
        console.log("Couldn't add note: ", e)
        res.status(204).end()
    })

})

app.listen(PORT, () => {
    `Listening on port: ${PORT}`
})
