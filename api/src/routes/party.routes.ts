import { Router } from 'express'
import multer from 'multer'
import Token from '../helpers/Token'
import PartyControllers from '../controllers/Party'
import { diskStorage } from '../helpers/Storage'

const routes = Router()

const upload = multer({ storage: diskStorage })

routes.post('/', Token.check, upload.fields([{ name: 'photos' }]), PartyControllers.createParty)

export default routes
