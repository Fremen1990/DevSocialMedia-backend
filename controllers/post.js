const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    try {
        const post = await new Post(req.body).save()
        res.status(200).json({ message: 'post created successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
