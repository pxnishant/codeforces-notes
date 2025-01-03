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

app.get('/api/getNotes', async (req, res) => {

    try {
        const user = await User.findOne( {username: req.body.username} )
        
        if (user) {
            res.send(user.questions)
        }
        else {
            res.send(`[]`)
        }
    }

    catch(e) {
        console.log("Could not fetch notes / GET failed: ", e)
        res.status(500).end()
    }


})

app.post('/api/addNote', async (req, res) => {

    qname = req.body.questionName, url = req.body.questionURL
    rating = req.body.questionRating, note = req.body.note

    if (!qname || !url || !rating || !note) {
        console.log('Bad request')
        res.status(400).end('All headers not specified')
    }
    
    const newQuestion = {
        name: qname,
        link: url,
        rating: rating,
        note: note
    }

    try {
        await User.updateOne(
            { username: req.body.username },
            { $push : { questions: newQuestion } }, 
            { upsert: true }
        )

        console.log("POST request successful")
        res.send('Note added successfully')
    }

    catch (e) {

        console.error("Couldn't add note / POST request failed: ", e)
        res.status(500).end() 

    }

})

app.listen(PORT, () => {
    `Listening on port: ${PORT}`
})
