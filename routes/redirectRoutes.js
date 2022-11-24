import {Router} from 'express'
import { Link } from '../model/chema_link.js'
const router = Router()

export const redirect = async (req, res) => {
    try {
        const {nanoLink} = req.params
        const link = await Link.findOne({nanoLink})

        if (!link) return res.status(404).json({error: "no existe el link"})
        return res.redirect(link.longLink)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: 'error de servidor'})
    }
}

router.get('/:nanoLink', redirect)

export default router
