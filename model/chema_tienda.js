import mongoose from "mongoose";
const {Schema} = mongoose


const SchemaTienda = new Schema ({
    product: {
        type: String,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
    stock: {
        type: Boolean,
        required: true,
        trim: true,
    },
})

export const Tienda = mongoose.model('tienda', SchemaTienda)
