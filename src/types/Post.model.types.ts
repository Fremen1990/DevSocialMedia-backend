import {Document, Types} from "mongoose";

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

