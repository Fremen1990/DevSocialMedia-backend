import {Document, Types} from "mongoose";

export enum ReactsEnum {
    LIKE = 'like',
    LOVE = 'love',
    HAHA = 'haha',
    SAD = 'sad',
    ANGRY = 'angry',
    WOW = 'wow'
}

export interface React extends Document {
    react: ReactsEnum
    postRef: Types.ObjectId
    reactBy: Types.ObjectId
}