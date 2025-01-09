const router = require('express').Router()

//controllers
const getAllNotes = require('../controllers/getAllNotes')
const getNotes = require('../controllers/getNotes')
const addNote = require('../controllers/addNote')
const deleteNote = require('../controllers/deleteNote')

//routes
router.get('/getAllNotes', getAllNotes)
router.get('/getNotes', getNotes)
router.post('/addNote', addNote)
router.delete('/deleteNote', deleteNote)

module.exports = router