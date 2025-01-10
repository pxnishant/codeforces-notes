const jwt = require('jsonwebtoken')
const Auth = require('../database/authSchema')


require('dotenv').config()

module.exports = async (req, res) => {

    //check if token is in db, and that it is not exp
    //if yes, do jwt.verify
    //redirect wherever if verified

    const {token} = req.params
    console.log("Token received: ", token)

    if (!token) {
        return res.redirect(`No Token recieved.`)
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

            if (err) {
                return res.redirect(`${err}`)
            }
        
            const userInDB = await Auth.findOne( { email: decoded.email } )
    
            if (!userInDB) {
                return res.redirect(`Invalid Token`);
            }
    
            if (userInDB.token != token) {
                return res.redirect(`Token Expired.`);
            }

            const authToken = jwt.sign( { email: decoded.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

            res.cookie('auth', authToken, {
                httpOnly: true,
                secure: false,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });


            return res.redirect(`Logged in Successfully!`);
        });
        
    }
    
    catch (error) {
        console.error("Error during verification: ", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }

}