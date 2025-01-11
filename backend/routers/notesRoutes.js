const router = require('express').Router()
const generateProblemLink = require('../middlewares/generateProblemLink');
const authMiddleware = require('../middlewares/authMiddleware');

//controllers
const getAllNotes = require('../controllers/getAllNotes')
const getNotes = require('../controllers/getNotes')
const addNote = require('../controllers/addNote')
const editNote = require('../controllers/editNote')
const deleteNote = require('../controllers/deleteNote')
const getNote = require('../controllers/getNote');

router.use(authMiddleware);
router.use(generateProblemLink);

//routes
router.get('/getAllNotes', getAllNotes)
router.get('/getNotes', getNotes)
router.get('/getNote/:type/:contestId/:problemId/group/:groupId', getNote);
router.post('/addNote', addNote)
router.put('/editNote', editNote)
router.delete('/deleteNote', deleteNote)

module.exports = router