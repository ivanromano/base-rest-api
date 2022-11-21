import express from "express";
import 'dotenv/config'
import "./database/connect.js"
import routerRenombrado from "./routes/authRoutes.js";

const app = express()

app.use(express.json())
// todas las rutas que vengan de routerRenombrado, tendran esa base /api/v1
app.use("/api/v1/auth", routerRenombrado)

// va a mandar el puerto especial, sino, el 5000
const PORT = process.env.PORT || 5025
app.listen(PORT, () => console.log('🚀🚀🚀   http://localhost:' + PORT))
