import { Router } from 'express'
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'

const routes = Router()

type registerUser = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

routes.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } : registerUser = req.body

  // Check for required fields
  if (name === undefined || email === undefined || password === undefined || confirmPassword === undefined) return res.status(400).json({ error: 'Por favor, preencha todos os campos !' })

  // Check if passwords match
  if (password !== confirmPassword) return res.status(400).json({ error: 'As senhas não conferem !' })

  // Check if user exists
  const emailExist = await UserSchema.findOne({ email })
  if (emailExist) return res.status(400).json({ error: 'O e-mail informado já esta em uso !' })

  // Create password
  const salt = await bcript.genSalt(12)
  const passwordHash = await bcript.hash(password, salt)

  res.status(400).json({ error: 'O e-mail informado já esta em uso !' })
})

export default routes
