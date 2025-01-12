const User = require('../database/userSchema')

module.exports = async (req, res) => {


    try {

        await User.updateOne(
            { email: req.email,
            "questions.link": req.problemLink },
            { $set: { "questions.$.note": req.body.note } },
            { new: true }
        )

        res.send('Note updated.')
    }

    catch (e) {

        console.log("Couldn't update note: ", e)
        res.status(500).end()
    }

}