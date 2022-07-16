import mongoose, {Document, Schema, Types} from 'mongoose'


export interface Code extends Document {
    code: string,
    user: Types.ObjectId
}

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
