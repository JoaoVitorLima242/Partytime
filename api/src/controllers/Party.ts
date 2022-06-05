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

    const userByToken = await Token.getUser(res, token)
    const userId: string = userByToken._id.toString()

    try {
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
        return res.status(400).json(error)
      }
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  public async getParties (req: Request, res: Response): Promise<Response> {
    try {
      const parties = await PartySchema.find({ privacy: false }).sort([['_id', -1]])

      return res.json({ error: null, parties })
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

export default new PartyControllers()
