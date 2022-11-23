import {Router} from 'express'
import { createLink, deleteLink, getLink, getLinkPARAM } from '../controller/linkController.js'
import { requireToken } from '../middlewares/requireToken.js'
import { paramsLinkValidator, validacionLink } from '../middlewares/validator.js'
const router = Router()

// get "/api/v1/links"      all links
// get "/api/v1/links/:id"  single link
// post "/api/v1/links"     create link
// patch/put "/api/v1/links/:id"     update link
// delete "/api/v1/links/:id"     delete link

// middleware que valida si existe el token. el usuario con su token lo vamos a usar
router.get('/', requireToken, getLink)
router.get('/:id', requireToken, getLinkPARAM)
router.post('/', requireToken, validacionLink, createLink)
router.delete('/:id', requireToken, paramsLinkValidator, deleteLink)


export default router
