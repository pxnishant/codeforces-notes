const router = require('express').Router()

//controllers
const genMagicLink = require('../controllers/genMagicLink.js')
const verifyToken = require('../controllers/verifyToken.js')

//routes
router.post('/getMagicLink', genMagicLink)
router.get('/verify', verifyToken)

module.exports = router