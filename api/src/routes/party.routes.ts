import { Router } from 'express'
import Token from '../helpers/Token'
import PartyControllers from '../controllers/Party'

const routes = Router()

routes.get('/', Token.check, PartyControllers.index)

export default routes
