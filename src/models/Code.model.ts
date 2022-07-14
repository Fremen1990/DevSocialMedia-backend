import mongoose from 'mongoose'

// @ts-ignore
const { ObjectId } = mongoose.Schema

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
})

export default mongoose.model('Code', codeSchema)
