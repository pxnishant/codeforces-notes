const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const authRoutes = require('./routers/authRoutes')
const notesRoutes = require('./routers/notesRoutes')
require('dotenv').config()
const PORT = process.env.PORT || 8080

//database initialization
mongoose.connect(process.env.MONGODB_CONN_URL).then(() => {
    console.log("Successfully connected to MongoDB.")
})

//middlewares
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api/auth', authRoutes)
app.use('/api', notesRoutes)
app.get("/", (req, res) => res.send("Running backend."));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

module.exports = app;