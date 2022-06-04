import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './routes/auth.routes'
import UserRoute from './routes/user.routes'
import PartyRoute from './routes/party.routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    // Arquivo que o Projeto ira trabalhar JSON()
    this.express.use(express.json())
    // Pasta aonde iram ficar os arquivos estaticos
    this.express.use(express.static('public'))
    this.express.use(cors())
    dotenv.config()
  }

  private database (): void {
    mongoose.connect('mongodb://localhost:27017/partytime', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }, () => {
      console.log('Banco esta ON')
    })
  }

  private routes (): void {
    this.express.use('/api/auth', AuthRoute)
    this.express.use('/api/user', UserRoute)
    this.express.use('/api/party', PartyRoute)
  }
}

export default new App().express
