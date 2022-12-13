import express from "express";
import 'dotenv/config'
import "./database/connect.js"
import routerRenombrado from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import linkRouteRenombrado from './routes/linkRoutes.js'
import tiendaRenombrada from "./routes/tiendaRoutes.js";
import redirectRenombrado from './routes/redirectRoutes.js'
import cors from 'cors'
const app = express()

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN5]

app.use(cors({
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback ('error de cors :c ' + origin + ' no autorizado')
    },
    credentials: true
}))

app.use(cookieParser());
app.use(express.json())
// todas las rutas que vengan de routerRenombrado, tendran esa base /api/v1
app.use('', redirectRenombrado)
app.use("/api/v1/auth", routerRenombrado)
app.use("/api/v1/links", linkRouteRenombrado)
app.use("/api/v1/tienda", tiendaRenombrada)

// va a mandar el puerto especial, sino, el 5000
const PORT = process.env.PORT || 5025
app.listen(PORT, () => console.log('🚀🚀🚀   http://localhost:' + PORT))

// dQatfvgTrwJcdX24
// mongodb+srv://<username>:<password>@cluster0.fthfg1h.mongodb.net/?retryWrites=true&w=majority
