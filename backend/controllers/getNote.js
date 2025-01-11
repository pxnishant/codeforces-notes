const User = require("../database/userSchema");

module.exports = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                email: req.email,
                'questions.link': req.problemLink,
            },
            { 'questions.$': 1}
        );

        if(!user) {
            console.log("User not found!");
            res.status(404).send("User not found!");
        }

        console.log('Found the note', user.questions[0]);
        res.send(user.questions[0].note);
    } catch(e) {
        console.error(e);
        res.status(500).end();
    }
}