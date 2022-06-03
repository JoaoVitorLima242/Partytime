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
  if (name === undefined || email === undefined || password === undefined || confirmPassword === undefined) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos !' })
  }
  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não conferem !' })
  }
  // Check if user exists
  const emailExist = await UserSchema.findOne({ email: email })
  if (emailExist) {
    return res.status(400).json({ error: 'O e-mail informado já esta em uso !' })
  }

  // Create password
  const salt = await bcript.genSalt(12)
  const passwordHash = await bcript.hash(password, salt)

  const user = new UserSchema({
    email: email,
    name: name,
    password: passwordHash
  })

  console.log(user)
  try {
    const newUser = await user.save()

    // Create token
    const token = jwt.sign(
      // Payload
      {
        name: newUser.name,
        id: newUser._id
      },
      'nossosecret'
    )

    res.json({ error: null, msg: 'Você realizou o cadastro com sucesso.', token: token, userId: newUser._id })
  } catch (error) {
    res.status(400).json(error)
  }
})

export default routes
