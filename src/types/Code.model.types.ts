import {Document, Types} from "mongoose";

export interface Code extends Document {
    code: string,
    user: Types.ObjectId
}
