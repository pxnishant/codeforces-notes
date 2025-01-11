const User = require('../database/userSchema')

module.exports = async (req, res) => {

    try {

        await User.updateOne(
            { email: req.email },
            { $unset: {[`questions.${req.body.questionNumber - 1}`]: 1} }
        )

        await User.updateOne(
            { email: req.email },
            { $pull: { questions: null } }
        )

        res.status(204).end("Successfully deleted")

    }

    catch (e) {
        console.error('Could not delete question: ', e)
        res.status(500).end()
    }

}