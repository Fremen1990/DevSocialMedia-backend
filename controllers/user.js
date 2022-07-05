const User = require('../models/User')
const {
    validateEmail,
    validateLength,
    validateUsername,
} = require('../helpers/validation')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/tokens')
const { sendVerificationEmail } = require('../helpers/mailer')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            username,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
        } = req.body

        // Regex validation for email
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' })
        }

        // Check if email is alrady in database
        const check = await User.findOne({ email })
        if (check) {
            return res.status(400).json({
                message:
                    'This email address already exists, please use different email',
            })
        }

        // Length validations
        if (!validateLength(first_name, 2, 30)) {
            return res.status(400).json({
                message: 'first_name must be between 2 and 30 characters',
            })
        }
        if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
                message: 'last_name must be between 3 and 30 characters',
            })
        }
        if (!validateLength(password, 6, 64)) {
            return res.status(400).json({
                message: 'password must be between 6 and 64 characters',
            })
        }

        const cryptedPassword = await bcrypt.hash(password, 12)

        let tempUsername = first_name + last_name
        let newUsername = await validateUsername(tempUsername)

        const user = await new User({
            first_name,
            last_name,
            email,
            username: newUsername,
            password: cryptedPassword,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save()

        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            '30m'
        )

        //verification url for new user
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
        sendVerificationEmail(user.email, user.first_name, url)
        const token = generateToken({ id: user._id.toString() }, '7d')

        res.send({
            id: user._id,
            username: user.newUsername,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: 'Register Success! Please activate your email',
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.activateAccount = async (req, res) => {
    try {
        const { token } = req.body
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
        const check = await User.findById(user.id)
        if (check.verified === true) {
            return res
                .status(400)
                .json({ message: 'This user is already activated' })
        } else {
            await User.findByIdAndUpdate(user.id, { verified: true })
            return res
                .status(200)
                .json({ message: 'Account has been activated successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message:
                    'The email address you entered is not connected to an account',
            })
        }
        // Checking encrypted password from database with password from req.body
        const check = await bcrypt.compare(password, user.password)
        if (!check) {
            return res.status(400).json({
                message: 'Incorrect password',
            })
        }

        // If email and password is OK generate login token and pass user data
        const token = generateToken({ id: user._id.toString() }, '7d')
        res.send({
            id: user._id,
            username: user.newUsername,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            // message: 'Register Success! Please activate your email',
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.auth = (req, res) => {
    res.json('Welcome from auth')
}
