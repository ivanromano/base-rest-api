import { validationResult } from "express-validator";
// import jwt from "jsonwebtoken";
import { User } from "../model/chema_user.js";



export const registro  = async(req, res) => {
    // console.log(req.body);
    const {email, password} = req.body
    const errors = validationResult(req)

    try {
        // primero busco en el onjeto User, el email.
        let newuser = await User.findOne({email: email})
        if (newuser) {
            throw {code: 11000}
        }
// ahora hago que newuser sea todo el objeto User
        newuser = new User({email: email, password: password})
        console.log(newuser);

        await newuser.save()
        return res.json({ok: "caterpie"})
    } catch (error) {
        console.log(error.code);
        if (error.code === 11000) {
            return res.status(400).json({error: "ya existe este usuario"})
        }
    }

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()})
    // }

    // res.json({ok: "caterpie"})
}


export const login = async(req, res) => {
    const {email, password} = req.body
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

        return res.json({ok: "login"})
    } catch (error) {
        console.log(error);
    }
}
