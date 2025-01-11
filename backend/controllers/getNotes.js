const User = require('../database/userSchema')

module.exports = async (req, res) => {
    
    try {
        const user = await User.findOne( { username: req.body.username } )

        if (user) {
            
            const startIndex = Math.max(0, req.body.questionNumber - 1)
            const endIndex = Math.min(startIndex + req.body.count - 1, user.questions.length - 1)
            res.send(user.questions.slice(startIndex, endIndex + 1))
            //if startIndex exceeds the last index, it returns an empty array
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