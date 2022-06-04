import { Request, Response } from 'express'
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'

type AuthRequest = {
  email: string
  name?: string
  password: string
  confirmPassword?: string
}

class AuthController {
  public async Register (req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirmPassword
    }: AuthRequest = req.body

    // Check for required fields
    if (name === undefined || email === undefined || password === undefined || confirmPassword === undefined) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos !' })
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não conferem !' })
    }
    // Check if user exists
    const emailExist = await UserSchema.findOne({ email })
    if (emailExist) {
      return res.status(400).json({ error: 'O e-mail informado já esta em uso !' })
    }

    // Create password
    const salt = await bcript.genSalt(12)
    const passwordHash = await bcript.hash(password, salt)

    const user = new UserSchema({
      email,
      name,
      password: passwordHash
    })

    try {
      const newUser = await user.save()

      // Create token
      const token = jwt.sign(
        // Payload
        {
          name: newUser.name,
          id: newUser._id
        },
        process.env.TOKEN_SECRET
      )

      res.json({ error: null, msg: 'Você realizou o cadastro com sucesso.', token, userId: newUser._id })
    } catch (error) {
      res.status(400).json(error)
    }
  }

  public async Login (req: Request, res: Response): Promise<Response> {
    const {
      email,
      password
    }: AuthRequest = req.body

    // Check if user exist
    const user = await UserSchema.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Não usuario cadastrado com esse email !' })
    }

    // Check if password match
    const checkPassword = await bcript.compare(password, user.password)
    if (!checkPassword) {
      return res.status(400).json({ error: 'Senha inválida !' })
    }

    try {
      // Create token
      const token = jwt.sign(
        // Payload
        {
          name: user.name,
          id: user._id
        },
        process.env.TOKEN_SECRET
      )

      res.json({ error: null, msg: 'Você realizou o login com sucesso.', token, userId: user._id })
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

export default new AuthController()
