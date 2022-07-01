const User = require('../models/User')
const { validateEmail, validateLength } = require('../helpers/validation')
const bcrypt = require('bcrypt')

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
        console.log(cryptedPassword)

        const user = await new User({
            first_name,
            last_name,
            email,
            username,
            cryptedPassword,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
