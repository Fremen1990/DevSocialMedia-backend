import mongoose, {Schema,} from 'mongoose'
import {UserData} from "../types/User.model.types";


export interface UserDocument extends UserData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new mongoose.Schema<UserDocument>(
    {
        first_name: {
            type: String,
            required: [true, 'first name is required'],
            trim: true,
            text: true,
        },
        last_name: {
            type: String,
            trim: true,
            text: true,
        },
        username: {
            type: String,
            required: [true, 'username name is required'],
            trim: true,
            text: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'email name is required'],
            trim: true,
            text: true,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        picture: {
            type: String,
            default:
                'https://www.clipartmax.com/png/full/31-313897_avatar-contact-default-starwars-user-yoda-icon-star-wars-yoda-silhouette-transparent.png',
        },
        cover: {
            type: String,
            default:
                'https://res.cloudinary.com/dnl38emxv/image/upload/v1657537385/TomaszStanisz/cover_pictures/agggfagg6otyr7fxko3f.jpg',
        },
        gender: {
            type: String,
            required: [true, 'gender name is required'],
            trim: true,
        },
        bYear: {
            type: Number,
            required: true,
            trim: true,
        },
        bMonth: {
            type: Number,
            required: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        requests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        search: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                createdAt: {
                    type: Date,
                    required: true,
                },
            },
        ],
        details: {
            bio: {
                type: String,
            },
            otherName: {
                type: String,
            },
            job: {
                type: String,
            },
            workplace: {
                type: String,
            },
            highSchool: {
                type: String,
            },
            college: {
                type: String,
            },
            currentCity: {
                type: String,
            },
            hometown: {
                type: String,
            },
            relationship: {
                type: String,
                enum: [
                    'Single',
                    'In a relationship',
                    'Married',
                    'Divorced',
                    'Programmer',
                ],
            },
            instagram: {
                type: String,
            },
        },
        savedPosts: [
            {
                post: {
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                },
                savedAt: {
                    type: Date,
                    required: true,
                },
            },
        ],
    },
    {timestamps: true}
)

export default mongoose.model<UserDocument>('User', userSchema)
