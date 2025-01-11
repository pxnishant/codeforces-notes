const User = require('../database/userSchema')

module.exports = async (req, res) => {


    try {

        await User.updateOne(
            { username: req.body.username },
            { $set: { [`questions.${req.body.questionNumber - 1}.note`]: req.body.note } }
        )

        res.send('Note updated.')
    }

    catch (e) {

        console.log("Couldn't update note: ", e)
        res.status(500).end()
    }

}