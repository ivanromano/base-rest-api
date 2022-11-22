import jwt from "jsonwebtoken";

export const generaToken = (uid) => {
     const expiresIn = 60 * 15 // 15 minutos

    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn: expiresIn})
        return {token, expiresIn}
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => {
    res.clearCookie('refresh')
    res.json({pokedios: "victini"})
}

export const generaRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30
    try {
        const refreshtoken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn: expiresIn})
        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error);
    }
}
