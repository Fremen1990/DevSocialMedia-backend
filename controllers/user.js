const User = require('../models/User')
const Code = require('../models/Code')
const {
    validateEmail,
    validateLength,
    validateUsername,
} = require('../helpers/validation')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/tokens')
const { sendVerificationEmail, sendResetCode } = require('../helpers/mailer')
const jwt = require('jsonwebtoken')
const generateCode = require('../helpers/generateCode')

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
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
        const validUser = req.user.id
        const { token } = req.body
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
        const check = await User.findById(user.id)

        //Check if token user is the same as the user in the database(second layer of security)
        if (validUser !== user.id) {
            return res.status(400).json({
                message:
                    'You do not have the authorization to complete this operation',
            })
        }

        //Activation check
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

exports.sendVerificationEmail = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        if (user.verified === true) {
            return res
                .status(400)
                .json({ message: 'This user is already activated' })
        }
        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            '30m'
        )
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
        sendVerificationEmail(user.email, user.first_name, url)
        return res
            .status(200)
            .json({ message: 'Verification email has been sent' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email }).select('-password')
        if (!user) {
            return res.status(400).json({ message: 'Account does not exist' })
        }
        return res.status(200).json({
            email: user.email,
            picture: user.picture,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.sendResetPasswordCode = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email }).select('-password')
        await Code.findOneAndRemove({ user: user._id })
        const code = generateCode(4)
        const savedCode = await new Code({
            code,
            user: user._id,
        }).save()
        sendResetCode(user.email, user.first_name, code)
        return res.status(200).json({
            message: 'Email reset code has been sent to your email address',
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.validateResetCode = async (req, res) => {
    try {
        const { email, code } = req.body
        const user = await User.findOne({ email })
        const dbUser = await Code.findOne({ user: user._id })
        if (dbUser.code !== code) {
            return res
                .status(400)
                .json({ message: 'Verification code is wrong' })
        }
        return res.status(200).json({ message: 'Code verified!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { email, password } = req.body

        const cryptedPassword = await bcrypt.hash(password, 12)
        await User.findOneAndUpdate(
            { email },
            {
                password: cryptedPassword,
            }
        )
        return res
            .status(200)
            .json({ message: 'Password changed successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
