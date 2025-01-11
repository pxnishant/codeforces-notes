const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({

    email: String,
    token: String,
    expires_at: Number

})

module.exports = mongoose.model("Auth", authSchema)