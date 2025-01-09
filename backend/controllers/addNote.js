const User = require('../database/userSchema')

module.exports = async (req, res) => {

    qname = req.body.questionName, url = req.body.questionURL
    rating = req.body.questionRating, note = req.body.note

    if (!qname || !url || !rating || !note) {
        console.log('Bad request')
        res.status(400).end('All headers not specified')
        return
    }
    
    const newQuestion = {
        name: qname,
        link: url,
        rating: rating,
        note: note
    }

    try {
        await User.updateOne(
            { username: req.body.username },
            { $push : { questions: newQuestion } }, 
            { upsert: true }
        )

        console.log("POST request successful")
        res.send('Note added successfully')
    }

    catch (e) {

        console.error("Couldn't add note / POST request failed: ", e)
        res.status(500).end() 

    }

}