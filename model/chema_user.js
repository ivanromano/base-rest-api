import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
// const {Schema, model} = mongoose

const chema_user = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true,
    }
})

chema_user.pre('save', async function (next) {
    const user = this

    // if (!user.isModified('password')) {
    //     return next()
    // }

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch (error) {
        throw new Error('fallo el hash de contraseña')
    }
})

chema_user.methods.comparePassword = async function (frontendPassword) {
    return await bcryptjs.compare(frontendPassword, this.password)
}

export const User = mongoose.model('usuario', chema_user)
