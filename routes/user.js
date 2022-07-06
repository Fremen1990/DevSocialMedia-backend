const express = require('express')
const {
    register,
    activateAccount,
    login,
    sendVerificationEmail,
} = require('../controllers/user')
const { authUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.post('/activate', authUser, activateAccount)
router.post('/login', login)
router.post('/sendVerification', authUser, sendVerificationEmail)

module.exports = router
