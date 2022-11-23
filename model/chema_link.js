import mongoose from "mongoose";
const {Schema} = mongoose


const SchemaLink = new Schema ({
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
    }
})

export const Link = mongoose.model('link', SchemaLink)
