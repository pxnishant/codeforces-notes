const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    name: String,
    link: String,
    rating: Number,
    note: String,
    _id: false
})

const userSchema = new mongoose.Schema({

    username: String,
    questions: [questionSchema]


})

module.exports = mongoose.model("User", userSchema)