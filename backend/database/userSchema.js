const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: String,
    questions: [{
        name: String,
        link: String,
        rating: Number,
        note: String
    }]


})

module.exports = mongoose.model("User", userSchema)