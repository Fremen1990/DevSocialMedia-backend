const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    try {
        const post = await new Post(req.body).save()
        res.status(200).json({ message: 'post created successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getAllPosts = async (req, res) => {
    try {
        // `populate` is making relation between ObjectID in record and related object
        const posts = await Post.find().populate(
            'user',
            'first_name last_name picture username gender'
        )

        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.comment = async (req, res) => {
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
