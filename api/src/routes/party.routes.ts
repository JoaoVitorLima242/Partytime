import { Router } from 'express'
import multer from 'multer'
import Token from '../helpers/Token'
import PartyControllers from '../controllers/Party'
import { diskStorage } from '../helpers/Storage'

const routes = Router()

const upload = multer({ storage: diskStorage })

routes.post('/', Token.check, upload.fields([{ name: 'photos' }]), PartyControllers.createParty)
routes.get('/', PartyControllers.getParties)
routes.get('/:id', PartyControllers.getParty)
routes.delete('/:id', Token.check, PartyControllers.deleteParty)
routes.get('/user', Token.check, PartyControllers.getUserParties)
routes.get('/user/:partyId', Token.check, PartyControllers.getUserPartyById)

export default routes
