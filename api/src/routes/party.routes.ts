import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('PARTYYY!')
})

export default routes
