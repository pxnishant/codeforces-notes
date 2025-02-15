const jwt = require('jsonwebtoken')
const Auth = require('../database/authSchema')


require('dotenv').config()

module.exports = async (req, res) => {

    //check if token is in db, and that it is not exp
    //if yes, do jwt.verify
    //redirect wherever if verified

    const token = req.query.token
    console.log("Token received: ", token)

    if (!token) {
        return res.status(401).send(`No Token recieved.`)
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

            if (err) {
                return res.status(403).send(`${err}`)
            }
        
            const userInDB = await Auth.findOne( { email: decoded.email } )
    
            if (!userInDB) {
                return res.status(404).send(`User not found.`);
            }
    
            if (userInDB.token != token) {
                return res.status(403).send(`Token Expired.`);
            }

            const authToken = jwt.sign( { email: decoded.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

            res.cookie('auth', authToken, {
                httpOnly: true,
                secure: false,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });


            return res.send(`Logged in Successfully!`);
        });
        
    }
    
    catch (error) {
        console.error("Error during verification: ", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }

}