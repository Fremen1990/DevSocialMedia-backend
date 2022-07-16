import mongoose, {Schema} from 'mongoose'
import {React} from "../types/React.model.types";


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
