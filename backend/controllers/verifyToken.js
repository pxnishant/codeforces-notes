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
        return res.status(404).end('Token is missing' );
    }

    try {
        const dbToken = await Auth.findOne( { token: token } )
        if (!dbToken) {
            return res.status(404).end('Token expired or already used.');   
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(404).end('Token is invalid or expired.');
            }
            return res.json({ email: dbToken.email });
        });
    }
    
    catch (error) {
        console.error("Error during verification: ", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }

}