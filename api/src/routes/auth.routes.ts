import { Router } from 'express'
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'

const routes = Router()

routes.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } = req.body

  if (name === null || email === null || password === null || confirmPassword === null) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos !' })
  }
})

export default routes
