const jwt = require('jsonwebtoken')
const Auth = require('../database/authSchema')
const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async (req, res) => {

    //check if token is in db, and that it is not exp
    //if yes, do jwt.verify
    //redirect wherever if verified

    const token = req.query.token
    console.log("Token received: ", token)

    if (!token) {
        return res.redirect(`chrome-extension://${process.env.EXTENSION_ID}/authRedirect.html?status=failed`)
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

            if (err) {
                return res.redirect(`chrome-extension://${process.env.EXTENSION_ID}/authRedirect.html?status=failed`)
            }
        
            const userInDB = await Auth.findOne( { email: decoded.email } )
    
            if (!userInDB) {
                return res.redirect(`chrome-extension://${process.env.EXTENSION_ID}/authRedirect.html?status=failed`)
            }
    
            if (userInDB.token != token) {
                return res.redirect(`chrome-extension://${process.env.EXTENSION_ID}/authRedirect.html?status=failed`)   
            }

            const authToken = jwt.sign( { email: decoded.email }, process.env.JWT_SECRET )

            return res.redirect(`chrome-extension://${process.env.EXTENSION_ID}/authRedirect.html?status=success&authToken=${authToken}`)
        });
        
    }
    
    catch (error) {
        console.error("Error during verification: ", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }

}