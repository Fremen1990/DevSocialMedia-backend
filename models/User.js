const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
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
        friends: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        requests: {
            type: Array,
            default: [],
        }, // user search history
        search: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        },
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
                    type: ObjectId,
                    ref: 'Post',
                },
                savedAt: {
                    type: Date,
                    default: new Date(),
                },
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
