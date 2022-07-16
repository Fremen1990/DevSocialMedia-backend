import mongoose, {Document, Schema, Types} from 'mongoose'


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


const reactSchema = new mongoose.Schema<React>({
    react: {
        type: String,
        enum: ['like', 'love', 'haha', 'sad', 'angry', 'wow'],
        required: true,
    },
    postRef: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    reactBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

export default mongoose.model<React>('React', reactSchema)
