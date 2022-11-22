import { validationResult } from "express-validator";
import { body } from "express-validator";

export const ValidacionExpress = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    next()
}

export const validacionesRegistro = [
    body('email', 'formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', 'minimo 6 caracteres').trim().isLength({min: 6}),
    body("password", "formato de contraseña incorrecta").custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error('no coinciden las contraaseñas')
        }
        return value
    }),
    ValidacionExpress
]


export const validacionesLogin = [
    body('email', 'formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', 'minimo 6 caracteres').trim().isLength({min: 6}),
    ValidacionExpress
]
