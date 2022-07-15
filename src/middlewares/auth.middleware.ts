import jwt from 'jsonwebtoken'
import config from 'config'

export const authUser = async (req, res, next) => {
    try {
        let tmp = req.header('Authorization')
        const token = tmp ? tmp.slice(7, tmp.length) : null
        if (!token) {
            return res.status(500).json({ message: 'Invalid Authentication' })
        }
        const token_secret = config.get<string>('token_secret')
        jwt.verify(token, token_secret, (err, user) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Invalid Authentication' })
            }
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
