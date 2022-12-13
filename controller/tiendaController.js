import { Tienda } from "../model/chema_tienda.js";

export const createTienda = async(req, res) => {
    try {
        const {Product, precio, stock} = req.body

        const tienda = new Tienda({Product, precio, stock})
        console.log(Tienda);
        const newTienda = await tienda.save()

        console.log("furrita" + Product);
        return res.status(201).json({newTienda})
    } catch (error) {
        console.log(error.message);
    }
}
