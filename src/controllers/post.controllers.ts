import Post from '../models/Post.model'
import User from '../models/User.model'

export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body).save()
        await post.populate(
            'user',
            'first_name last_name cover picture username'
        )
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getAllPosts = async (req, res) => {
    console.log('req user id', req.user.id)
    try {
        //Based on following users
        const followingTemp = await User.findById(req.user.id).select(
            'following'
        )
        const following = followingTemp.following
        const promises = following.map((user) => {
            return Post.find({ user: user })
                .populate('user', 'first_name last_name picture username cover')
                .populate(
                    'comments.commentBy',
                    'first_name last_name picture username'
                )
                .sort({ createdAt: -1 })
                .limit(10)
        })
        const followingPosts = await (await Promise.all(promises)).flat()
        const userPosts = await Post.find({ user: req.user.id })
            .populate('user', 'first_name last_name picture username cover')
            .populate(
                'comments.commentBy',
                'first_name last_name picture username'
            )
            .sort({ createdAt: -1 })
            .limit(10)
        followingPosts.push(...[...userPosts])
        followingPosts.sort((a, b) => {
            // @ts-ignore
            return a.createdAt - b.createdAt
        })
        res.json(followingPosts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const comment = async (req, res) => {
    try {
        const { comment, image, postId } = req.body
        let newComments = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        comment: comment,
                        image: image,
                        commentBy: req.user.id,
                        commentAt: new Date(),
                    },
                },
            },
            {
                new: true,
            }
        ).populate(
            'comments.commentBy',
            'picture first_name last_name username'
        )
        res.json(newComments.comments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const savePost = async (req, res) => {
    try {
        const postId = req.params.id
        const user = await User.findById(req.user.id)
        const check = user?.savedPosts.find(
            // @ts-ignore
            (post) => post.post.toString() === postId
        )
        if (check) {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: {
                    savedPosts: {
                        // @ts-ignore
                        _id: check._id,
                    },
                },
            })
        } else {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    savedPosts: {
                        post: postId,
                        savedAt: new Date(),
                    },
                },
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id)
        res.json({ status: 'ok' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
