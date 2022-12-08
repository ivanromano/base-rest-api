import jwt from "jsonwebtoken";
import { User } from "../model/chema_user.js";
import { generaRefreshToken, generaToken } from "../utils/generaToken.js";

export const registro  = async(req, res) => {
    // console.log(req.body);
    const {userName, email, password} = req.body

    try {
        // primero busco en el onjeto User, el email.
        let newuser = await User.findOne({email: email})
        if (newuser) {
            throw {code: 11000}
        }
        // ahora hago que newuser sea todo el objeto User
        newuser = new User({userName: userName, email: email, password: password})
        console.log(newuser);

        // jwt
        const {token, expiresIn} = generaToken(newuser._id)
        generaRefreshToken(newuser._id, res)

        await newuser.save()
        return res.status(201).json({token, expiresIn})
    } catch (error) {
        console.log(error.code);
        if (error.code === 11000) {
            return res.status(400).json({error: "ya existe este usuario"})
        }
        return res.status(500).json({error: "error de servidor"})
    }
}


export const login = async(req, res) => {
    const {userName, email, password} = req.body
    try {
        let existsUser = await User.findOne({email})

        if (!existsUser) {
            return res.status(403).json({error: "no esta registrado este usuario"})
        }

        // el frontendPassword es igual al password puesto en el fronentd, es un parametro
        const respuestaPassword = await existsUser.comparePassword(password)
        if (!respuestaPassword) {
            return res.status(403).json({error: "contraseña incorrecta"})
        }

        // GENERAR JWT
        const {token, expiresIn} = generaToken(existsUser._id)
        generaRefreshToken(existsUser._id, res)

        console.log(existsUser._id);
        return res.json({token, expiresIn})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error de servidor"})
    }
}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid)
        res.json({email: user.email, id: user._id})
    } catch {
        console.log(error);
    }
}

export const refreshToken = (req, res) => {
    try {
        const {token, expiresIn} = generaToken(req.uid)

        return res.json({token, expiresIn})
    } catch (error) {
        console.log(error.message);
    }
}

export const cerrarSesion = (req, res) => {
    try {
        return res.clearCookie("refreshtoken")
        // res.json({ok: true})
    } catch (error) {
        console.log(error.message);
    }
}
