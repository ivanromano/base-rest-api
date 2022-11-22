import express from "express";
import { infoUser, login, registro, refreshToken } from "../controller/authController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { logout } from "../utils/generaToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { validacionesLogin, validacionesRegistro } from "../middlewares/validator.js";

const router = express.Router()

router.post('/register', validacionesRegistro, registro)

router.post('/login', validacionesLogin, login)

router.get("/protected", requireToken, infoUser)
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('/logout', logout)

export default router
