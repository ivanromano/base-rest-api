import jwt from "jsonwebtoken"


export const requireToken = (req, res, next) => {
    try {
        let token = req.cookie.authorization
        console.log(token);

        // el beer nos impide usar el token, vamos a sacarlo del objeto token
        token = token.split(" ")[1]

        // hace que solo se puedan enviar tokens. en consola monstraria un objeto con uid, vamos a sacarlo
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        console.log(uid);

        next()
    } catch (error) {
        console.log(error.message);
        const ErroresPorConsola = {
            ["invalid signature"]: "el token no es valido",
            ["jwt expired"]: "este token expiro",
            ["invalid token"]: "token no valido",
            ["No bearer"]: "usa formato bearer",
        }
        return res.status(401).json({error: ErroresPorConsola[error.message]})
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzdhYmEyYjRiOGExODg3Zjg5NzU5OWYiLCJpYXQiOjE2NjkwNTUyMzYsImV4cCI6MTY2OTA1NjEzNn0.vHf95rZBoL9UUytf73N5EQEk9cDtGzX5NbMCnZej7BM
