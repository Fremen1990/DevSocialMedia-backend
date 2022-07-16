import mongoose, {Document, Schema, Types} from 'mongoose'


export enum PostTypeEnum {
    PROFILE = 'profilePicture',
    COVER = 'coverPicture',
    NULL = "null"
}

export interface CommentsData {
    comment: string,
    image: string,
    commentBy: Types.ObjectId,
    commentAt: Date
}

export interface Post extends Document {
    postId: string,
    type: PostTypeEnum,
    text: string,
    images: [string],
    user: Types.ObjectId,
    background: string,
    comments: [CommentsData],
}

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
