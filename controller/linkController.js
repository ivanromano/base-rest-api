import { Link } from "../model/chema_link.js"
import { nanoid } from 'nanoid'

export const getLink = async(req, res) => {
    try {
        // agarramos link de chema_link. ponemos el link que coincida con el usuario
        const link = await Link.find({uid: req.uid})
        return res.status(201).json({link})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: 'error de servidor'})
    }
}

export const getLinkPARAM = async(req, res) => {
    try {
        const {nanoLink} = req.params
        const link = await Link.findOne({nanoLink})

        if (!link) return res.status(404).json({error: "no existe el link"})
        return res.json({longLink: link.longLink})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: 'error de servidor'})
    }
}

// crud tradicional
// export const getLinkPARAM = async(req, res) => {
//     try {
//         const {id} = req.params
//         const link = await Link.findById(id)

//         if (!link) return res.status(404).json({error: "no existe el link"})
//         if (!link.uid.equals(req.uid)) return res.status(404).json({error: "no te pertenece el id"})
//         return res.json({link})
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({error: 'error de servidor'})
//     }
// }

export const createLink = async(req, res) => {
    try {
        const {longLink} = req.body

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
        console.log(link);
        const newLink = await link.save()

        console.log("furrita" + longLink);
        return res.status(201).json({newLink})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLink = async(req, res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id)

        if (!link) return res.status(404).json({error: "no existe el link"})
        if (!link.uid.equals(req.uid)) return res.status(404).json({error: "no te pertenece el id"})

        await link.remove()
        return res.json({link})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: 'error de servidor'})
    }
}
