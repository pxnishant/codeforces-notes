const express = require('express')
const app = express()
const PORT = 3001
const User = require('./database/userSchema')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONN_URL).then(() => {
    console.log("successfully connected to mongodb")
})

const user1 = new User({

    username: 'nishant',
    questions: [{
        name: 'qa',
        link: 'https://cf.com/qa',
        rating: 1900,
        note: 'test run'
    }]

})

user1.save().then(() => {
    console.log('user1 saved')
})


app.get('/api/getNotes', (req, res) => {
    

})

app.listen(PORT, () => {
    `Listening on port: ${PORT}`
})
