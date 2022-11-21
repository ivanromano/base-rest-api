import express from "express";
import { login, registro } from "../controller/authController.js";
import { body } from "express-validator";

const router = express.Router()

router.post('/register', [
    body('email', 'formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', 'minimo 6 caracteres').trim().isLength({min: 6}),
    body("password", "formato de contraseña incorrecta").custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error('no coinciden las contraaseñas')
        }
        return value
    })
] ,registro)
router.post('/login', login)

export default router
