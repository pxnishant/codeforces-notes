const User = require('../database/userSchema')
require('dotenv').config()

module.exports = async (req, res) => {

    try {
        const user = await User.findOne( { username: req.body.username } )
        
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

}