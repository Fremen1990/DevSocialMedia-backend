import mongoose, {Schema} from 'mongoose'
import {Post} from "../types/Post.model.types";


export interface PostDocument extends Post, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostDocument>(
    {
        type: {
            type: String,
            enum: ['profilePicture', 'coverPicture', null],
            default: null,
        },
        text: {
            type: String,
        },
        // @ts-ignore
        images: {
            type: Array,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        background: {
            type: String,
        },
        comments: [
            {
                comment: {
                    type: String,
                },
                image: {
                    type: String,
                },
                commentBy: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                commentAt: {
                    type: Date,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<PostDocument>('Post', postSchema)
