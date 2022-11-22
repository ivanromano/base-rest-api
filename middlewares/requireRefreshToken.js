import jwt from "jsonwebtoken"

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshtoken
        if (!refreshTokenCookie) {
            throw new Error('no existe el token')
        }

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)

        req.uid = uid
        next()
    } catch (error) {
        console.log(req.cookies);
        console.log(error.message);
        const ErroresPorConsola = {
            ["invalid signature"]: "el token no es valido",
            ["jwt expired"]: "este token expiro",
            ["invalid token"]: "token no valido",
            ["No bearer"]: "usa formato bearer",
        }
        res.status(401).json({error: ErroresPorConsola[error.message]})

    }
}
