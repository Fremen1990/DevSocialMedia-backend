import mongoose from 'mongoose'
import User from '../models/User.model'
import React from '../models/React.model'

export const reactPost = async (req, res) => {
    try {
        const { postId, react } = req.body
        const check = await React.findOne({
            postRef: postId,
            // @ts-ignore
            reactBy: mongoose.Types.ObjectId(req.user.id),
        })
        if (check === null) {
            const newReact = new React({
                react: react,
                postRef: postId,
                reactBy: req.user.id,
            })
            await newReact.save()
        } else {
            if (check.react === react) {
                await React.findByIdAndRemove(check._id)
            } else {
                await React.findByIdAndUpdate(check._id, {
                    react: react,
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getReacts = async (req, res) => {
    try {
        const reactsArray = await React.find({ postRef: req.params.id })

        /*
        const check1 = reacts.find(
          (x) => x.reactBy.toString() == req.user.id
        )?.react;
        */
        const newReacts = reactsArray.reduce((group, react) => {
            let key = react['react']
            group[key] = group[key] || []
            group[key].push(react)
            return group
        }, {})

        const reacts = [
            {
                react: 'like',
                // @ts-ignore
                count: newReacts.like ? newReacts.like.length : 0,
            },
            {
                react: 'love',
                // @ts-ignore
                count: newReacts.love ? newReacts.love.length : 0,
            },
            {
                react: 'haha',
                // @ts-ignore
                count: newReacts.haha ? newReacts.haha.length : 0,
            },
            {
                react: 'sad',
                // @ts-ignore
                count: newReacts.sad ? newReacts.sad.length : 0,
            },
            {
                react: 'wow',
                // @ts-ignore
                count: newReacts.wow ? newReacts.wow.length : 0,
            },
            {
                react: 'angry',
                // @ts-ignore
                count: newReacts.angry ? newReacts.angry.length : 0,
            },
        ]

        const check = await React.findOne({
            postRef: req.params.id,
            reactBy: req.user.id,
        })
        const user = await User.findById(req.user.id)
        const checkSaved = user?.savedPosts.find(
            // @ts-ignore
            (x) => x.post.toString() === req.params.id
        )
        res.json({
            reacts,
            check: check?.react,
            total: reactsArray.length,
            // @ts-ignore
            checkSaved: checkSaved ? true : false,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
