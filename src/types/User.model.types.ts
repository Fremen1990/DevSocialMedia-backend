import {Document, Types} from "mongoose";

export interface UserData extends Document {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    picture: string,
    cover: string,
    gender: string,
    bYear: number,
    bMonth: number,
    verified: boolean,
    friends: [Types.ObjectId], /*| [string]*/
    following: [Types.ObjectId],
    followers: [Types.ObjectId],
    requests: [Types.ObjectId] /* [string],*/
    search: [SearchData],
    details: DetailsData[],
    savedPosts: [savedPostsData]
}

export interface SearchData extends Document {
    user: Types.ObjectId,
    createdAt: Date
}

export enum RelEnum {
    'Single',
    'In a relationship',
    'Married',
    'Divorced',
    'Programmer',
}

export interface DetailsData extends Document {
    bio: string,
    otherName: string,
    type: string,
    job: string,
    workplace: string,
    highSchool: string,
    college: string,
    currentCity: string,
    hometown: string,
    relationship: RelEnum,
    instagram: string,
}

export interface savedPostsData extends Document {
    post: Types.ObjectId,
    savedAt: Date
}