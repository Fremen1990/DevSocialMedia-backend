const express = require('express')
const {
    register,
    activateAccount,
    login,
    sendVerificationEmail,
    findUser,
    sendResetPasswordCode,
    validateResetCode,
    changePassword,
    getProfile,
} = require('../controllers/user')
const { authUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.post('/activate', authUser, activateAccount)
router.post('/login', login)
router.post('/findUser', findUser)
router.post('/sendVerification', authUser, sendVerificationEmail)
router.post('/sendResetPasswordCode', sendResetPasswordCode)
router.post('/validateResetCode', validateResetCode)
router.post('/changePassword', changePassword)
router.get('/getProfile/:username', getProfile)

module.exports = router
