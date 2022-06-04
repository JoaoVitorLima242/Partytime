import { Request, Response } from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'
import PartySchema from '../models/Party'
import Token from '../helpers/Token'
import { diskStorage } from '../helpers/Storage'

class PartyControllers {
  public async createParty (req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      partyDate,
      privacy
    } = req.body

    const files = []
    const token = req.header('auth-token')

    if (title === undefined || description === undefined || partyDate === undefined) {
      return res.status(400).json({ error: 'Preencha pelo menos nome, descrição e data' })
    }

    if (!token) {
      return res.status(400).json({ error: 'Acesso negado!' })
    }

    const userByToken = await Token.getUser(res, token)
    const userId = userByToken._id.toString()

    try {
      const user = await UserSchema.findOne({ _id: userId })

      const photos: string[] = []

      if (files && files.length > 0) {
        files.forEach((photo, i) => {
          photos[i] = photo.path
        })
      }

      const party = new PartySchema({
        title,
        description,
        partyDate,
        photos,
        privacy,
        userId

      })

      try {
        const newParty = await party.save()
        res.json({ error: null, msg: 'Evento criado com sucesso!', data: newParty })
      } catch (error) {
        return res.status(400).json({ error: 'Acesso negado!' })
      }
    } catch (error) {
      return res.status(400).json({ error: 'Acesso negado!' })
    }
  }
}

export default new PartyControllers()
