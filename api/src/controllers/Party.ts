import { Request, Response } from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'
import PartySchema from '../models/Party'
import Token from '../helpers/Token'
import { partyTimeStorage } from '../helpers/Storage'

interface reqCreate {
  title: string;
  description: string;
  partyDate: string;
  privacy: string;
}
interface reqUpdate extends reqCreate {
  userId: string;
}
class PartyControllers {
  public async createParty (req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      partyDate,
      privacy
    }: reqCreate = req.body

    const files = []

    if (req.files) {
      files.push(req.files)
    }
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

  public async getUserParties (req: Request, res: Response): Promise<Response> {
    try {
      const token = req.header('auth-token')

      const user = await Token.getUser(res, token)
      const parties = await PartySchema.find({ userId: user._id })

      return res.json({ error: null, parties })
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  public async getUserPartyById (req: Request, res: Response): Promise<Response> {
    try {
      const { partyId } = req.params
      const token = req.header('auth-token')

      const user = await Token.getUser(res, token)

      const party = await PartySchema.findOne({ _id: partyId, userId: user._id })

      return res.json({ error: null, party })
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  public async getParty (req: Request, res: Response): Promise<Response> {
    const {
      id
    } = req.params

    try {
      const party = await PartySchema.findOne({ _id: id })

      if (party.privacy === false) {
        return res.json({ error: null, party })
      } else {
        const token = req.header('auth-token')
        const user = await Token.getUser(res, token)

        if (user._id === party._id) {
          res.json({ error: null, party })
        } else {
          return res.status(400).json({ error: 'Acesso negado!' })
        }
      }
    } catch (err) {
      return res.status(400).json({ error: 'Evento não existe!' })
    }
  }

  public async updateParty (req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      partyDate,
      privacy,
      userId
    }: reqUpdate = req.body

    // TIPAR FOTOS
    const files = []

    if (req.files) {
      files.push(req.files)
    }

    /* const token = req.header('auth-token')

    if (title === undefined || description === undefined || partyDate === undefined) {
      return res.status(400).json({ error: 'Preencha pelo menos nome, descrição e data' })
    } */

    console.log(files)
  }

  public async deleteParty (req: Request, res: Response): Promise<Response> {
    const {
      id
    } = req.params

    const token = req.header('auth-token')
    const user = await Token.getUser(res, token)

    try {
      await PartySchema.deleteOne({ _id: id, userId: user._id })
      return res.json({ error: null, msg: 'Evento removido com sucesso!' })
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

export default new PartyControllers()
