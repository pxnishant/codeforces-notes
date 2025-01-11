const jwt = require('jsonwebtoken')
const Auth = require('../database/authSchema')
const mongoose = require('mongoose')
const { Resend } = require('resend')
require('dotenv').config()

module.exports = async (req, res) => {

    //get email
    //get user by email from db. if not found, say it
    //else
    //create a magic link using jwt
    //const magicLink = `http://${host}/api/auth/verify?token=${token}`
    //save token in db, along with exp time
    //email this link
    
    const email = req.params.email;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: email }, secret, { expiresIn: '10m' })

    try {

        await Auth.updateOne(
            { email: email },
            {$set: {
                token: token,
                expires_at: new Date(Date.now() + 10 * 60 * 1000)
            }}, 
            { upsert: true }
        )

        console.log("Added token to DB successfully.")

        try {

            const magicLink = `${process.env.HOST}/api/auth/verify?token=${token}`

            emailtext = `<strong>Click on the link to authenticate yourself: </strong><br>
            <a href = "${magicLink}">${magicLink}</a>
            <br>`

            const resend = new Resend(process.env.RESENT_API_KEY);

            const { data, error } = await resend.emails.send({
                from: "CodeDaily <nishant@codedaily.tech>",
                to: email,
                subject: "Login link for Codeforces Notes",
                html: emailtext,
            });
            
            console.log('Email with login link sent successfully.')

            res.send('Magic link sent!')
            
        }

        catch(e) {
            console.log("Couldn't send email: ", e)
            res.status(500).end() 
        }
        

    }

    catch (e) {

        console.error("Couldn't add token to DB: ", e)
        res.status(500).end() 

    }

}