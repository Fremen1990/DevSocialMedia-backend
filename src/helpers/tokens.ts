import jwt from 'jsonwebtoken'
import config from 'config'

export const generateToken = (payload, expired) => {
    const token_secret = config.get<string>('token_secret')
    return jwt.sign(payload, token_secret, { expiresIn: expired })
}
