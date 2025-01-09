const router = require('express').Router()

//controllers
const genMagicLink = require('../controllers/genMagicLink.js')
const verifyToken = require('../controllers/verifyToken.js')

//routes
router.get('/getMagicLink', genMagicLink)
router.get('/verify', verifyToken)

module.exports = router