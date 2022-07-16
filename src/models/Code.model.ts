import mongoose, {Schema} from 'mongoose'
import {Code} from "../types/Code.model.types";


const codeSchema = new mongoose.Schema<Code>({
    code: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export default mongoose.model<Code>('Code', codeSchema)
