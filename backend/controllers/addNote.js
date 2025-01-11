const User = require('../database/userSchema')

module.exports = async (req, res) => {
    const newQuestion = {
        name: req.body.qName,
        link: req.problemLink,
        note: req.body.note
    }

    try{
        await User.updateOne(
            {username: req.username},
            {$push: {questions: newQuestion}},
            {upsert: true}
        )
        
        console.log(`note for user ${req.username} is updated.`);
        res.send("Note Added Successfully!");
    } catch(e) {
        console.error(`Note not added for user ${req.username}`);
        res.status(500).end();
    }
}
