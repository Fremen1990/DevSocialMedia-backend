import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.model'
import Code from '../models/Code.model'
import Post from '../models/Post.model'
import {
    validateEmail,
    validateLength,
    validateUsername,
} from '../helpers/validation'
import { generateToken } from '../helpers/tokens'

import { sendVerificationEmailHelper, sendResetCode } from '../helpers/mailer'
import { generateCode } from '../helpers/generateCode'
import config from 'config'

export const register = async (req: Request, res: Response) => {
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
        const BASE_URL = config.get<string>('base_url')
        const url = `${BASE_URL}/activate/${emailVerificationToken}`
        sendVerificationEmailHelper(user.email, user.first_name, url)
        const token = generateToken({ id: user._id.toString() }, '7d')

        res.send({
            id: user._id,
            username: user.username,
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
export const activateAccount = async (req, res) => {
    try {
        const validUser = req.user.id
        const { token } = req.body
        const TOKEN_SECRET = config.get<string>('token_secret')
        const user = jwt.verify(token, TOKEN_SECRET)
        // @ts-ignore
        const check = await User.findById(user.id)

        //Check if token user is the same as the user in the database(second layer of security)
        // @ts-ignore
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
            // @ts-ignore
            await User.findByIdAndUpdate(user.id, { verified: true })
            return res
                .status(200)
                .json({ message: 'Account has been activated successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const login = async (req: Request, res) => {
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
            username: user.username,
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
export const getAllUsers = async (req: Request, res) => {
    try {
        const users = await User.find().select(
            'username first_name last_name picture'
        )
        if (!users) {
            return res.status(400).json({ message: 'No users found' })
        }
        return res.status(200).json({
            users,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const sendVerificationEmail = async (req, res) => {
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
        const BASE_URL = config.get<string>('base_url')
        const url = `${BASE_URL}/activate/${emailVerificationToken}`
        sendVerificationEmailHelper(user.email, user.first_name, url)
        return res
            .status(200)
            .json({ message: 'Verification email has been sent' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const findUser = async (req: Request, res) => {
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
export const sendResetPasswordCode = async (req: Request, res) => {
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
export const validateResetCode = async (req: Request, res) => {
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
export const changePassword = async (req: Request, res) => {
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
export const getProfile = async (req, res) => {
    try {
        const { username } = req.params
        // TODO  Prepare useSchema interfaces to replacy 'any' types
        const user: any = await User.findById(req.user.id)
        const profile = await User.findOne({ username }).select('-password')
        const friendship = {
            friends: false,
            following: false,
            requestSent: false,
            requestReceived: false,
        }
        if (!profile) {
            return res.json({ ok: false })
        }

        if (
            user.friends.includes(profile._id) &&
            profile.friends.includes(user._id)
        ) {
            friendship.friends = true
        }
        if (user.following.includes(profile._id)) {
            friendship.following = true
        }
        if (user.requests.includes(profile._id)) {
            friendship.requestReceived = true
        }
        if (profile.requests.includes(user._id)) {
            friendship.requestSent = true
        }

        const posts = await Post.find({ user: profile._id })
            .populate('user')
            .populate(
                'comments.commentBy',
                'first_name last_name username picture username commentAt'
            )
            .sort({ createdAt: -1 })
        await profile.populate(
            'friends',
            'first_name last_name username picture'
        )
        res.json({ ...profile.toObject(), posts, friendship })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateProfilePicture = async (req, res) => {
    try {
        const { url } = req.body

        await User.findByIdAndUpdate(req.user.id, {
            picture: url,
        })
        res.json(url)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateCover = async (req, res) => {
    try {
        const { url } = req.body

        await User.findByIdAndUpdate(req.user.id, {
            cover: url,
        })
        res.json(url)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateDetails = async (req, res) => {
    try {
        const { infos } = req.body
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            {
                details: infos,
            },
            {
                new: true,
            }
        )
        res.json(updated.details)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const addFriend = async (req: any, res) => {
    try {
        if (req.user.id !== req.params.id) {
            // TODO  Prepare sender and receiver interfaces to replacy 'any' types
            const sender: any = await User.findById(req.user.id)
            const receiver: any = await User.findById(req.params.id)
            if (
                !receiver.requests.includes(sender._id) &&
                !receiver.friends.includes(sender._id)
            ) {
                await receiver.updateOne({
                    $push: { requests: sender._id },
                })
                await receiver.updateOne({
                    $push: { followers: sender._id },
                })
                await sender.updateOne({
                    $push: { following: receiver._id },
                })
                res.json({ message: 'friend request has been sent' })
            } else {
                return res.status(400).json({ message: 'Already sent' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't send a request to yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const cancelRequest = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const sender: any = await User.findById(req.user.id)
            const receiver: any = await User.findById(req.params.id)
            if (
                receiver.requests.includes(sender._id) &&
                !receiver.friends.includes(sender._id)
            ) {
                await receiver.updateOne({
                    $pull: { requests: sender._id },
                })
                await receiver.updateOne({
                    $pull: { followers: sender._id },
                })
                await sender.updateOne({
                    $pull: { following: sender._id },
                })
                res.json({ message: 'you successfully canceled request' })
            } else {
                return res.status(400).json({ message: 'Already Canceled' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't cancel a request to yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const follow = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const sender: any = await User.findById(req.user.id)
            const receiver: any = await User.findById(req.params.id)
            if (
                !receiver.followers.includes(sender._id) &&
                !sender.following.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $push: { followers: sender._id },
                })

                await sender.updateOne({
                    $push: { following: receiver._id },
                })
                res.json({ message: 'follow success' })
            } else {
                return res.status(400).json({ message: 'Already following' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't follow yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const unfollow = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const sender: any = await User.findById(req.user.id)
            const receiver: any = await User.findById(req.params.id)
            if (
                receiver.followers.includes(sender._id) &&
                sender.following.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $pull: { followers: sender._id },
                })

                await sender.updateOne({
                    $pull: { following: receiver._id },
                })
                res.json({ message: 'unfollow success' })
            } else {
                return res
                    .status(400)
                    .json({ message: 'Already not following' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't unfollow yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const acceptRequest = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const receiver: any = await User.findById(req.user.id)
            const sender: any = await User.findById(req.params.id)
            if (receiver.requests.includes(sender._id)) {
                await receiver.update({
                    $push: { friends: sender._id, following: sender._id },
                })
                await sender.update({
                    $push: { friends: receiver._id, followers: receiver._id },
                })
                await receiver.updateOne({
                    $pull: { requests: sender._id },
                })
                res.json({ message: 'friend request accepted' })
            } else {
                return res.status(400).json({ message: 'Already friends' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't accept a request from  yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const unfriend = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const sender: any = await User.findById(req.user.id)
            const receiver: any = await User.findById(req.params.id)
            if (
                receiver.friends.includes(sender._id) &&
                sender.friends.includes(receiver._id)
            ) {
                await receiver.update({
                    $pull: {
                        friends: sender._id,
                        following: sender._id,
                        followers: sender._id,
                    },
                })
                await sender.update({
                    $pull: {
                        friends: receiver._id,
                        following: receiver._id,
                        followers: receiver._id,
                    },
                })

                res.json({ message: 'unfriend request accepted' })
            } else {
                return res.status(400).json({ message: 'Already not friends' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't unfriend yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const deleteRequest = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const receiver: any = await User.findById(req.user.id)
            const sender: any = await User.findById(req.params.id)
            if (receiver.requests.includes(sender._id)) {
                await receiver.update({
                    $pull: {
                        requests: sender._id,
                        followers: sender._id,
                    },
                })
                await sender.update({
                    $pull: {
                        following: receiver._id,
                    },
                })

                res.json({ message: 'delete request accepted' })
            } else {
                return res.status(400).json({ message: 'Already deleted' })
            }
        } else {
            return res
                .status(400)
                .json({ message: "You can't delete yourself" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const search = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm
        const results = await User.find({
            $text: { $search: searchTerm },
        }).select('first_name last_name username picture')
        res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const addToSearchHistory = async (req, res) => {
    try {
        const { searchUser } = req.body
        const search: any = {
            user: searchUser,
            createdAt: new Date(),
        }
        const user = await User.findById(req.user.id)
        // @ts-ignore
        const check = user.search.find((x) => x.user.toString() === searchUser)
        if (check) {
            await User.updateOne(
                {
                    _id: req.user.id,
                    // @ts-ignore
                    'search._id': check._id,
                },
                {
                    $set: { 'search.$.createdAt': new Date() },
                }
            )
        } else {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    search,
                },
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getSearchHistory = async (req, res) => {
    try {
        const results = await User.findById(req.user.id)
            .select('search')
            .populate('search.user', 'first_name last_name username picture')
        res.json(results.search)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const removeFromSearch = async (req, res) => {
    try {
        const { searchUser } = req.body
        await User.updateOne(
            {
                _id: req.user.id,
            },
            { $pull: { search: { user: searchUser } } }
        )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getFriendsPageInfos = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('friends requests')
            .populate('friends', 'first_name last_name picture username')
            .populate('requests', 'first_name last_name picture username')
        const sentRequests = await User.find({
            // @ts-ignore
            requests: mongoose.Types.ObjectId(req.user.id),
        }).select('first_name last_name picture username')
        res.json({
            friends: user.friends,
            requests: user.requests,
            sentRequests,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
