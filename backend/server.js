const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routers/authRoutes')
const notesRoutes = require('./routers/notesRoutes')
require('dotenv').config()
const PORT = process.env.PORT

//database initialization
mongoose.connect(process.env.MONGODB_CONN_URL).then(() => {
    console.log("Successfully connected to MongoDB.")
})

//middlewares
app.use(express.json())

//routes
app.use('/api/auth', authRoutes)
app.use('/api', notesRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
