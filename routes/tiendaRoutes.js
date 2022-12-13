import {Router} from 'express'
import { createTienda } from '../controller/tiendaController.js'

const router = Router()

// get "/api/v1/links"      all links
// get "/api/v1/links/:id"  single link
// post "/api/v1/links"     create link
// patch/put "/api/v1/links/:id"     update link
// delete "/api/v1/links/:id"     delete link

// middleware que valida si existe el token. el usuario con su token lo vamos a usar
router.get('/creatienda', createTienda)

export default router
