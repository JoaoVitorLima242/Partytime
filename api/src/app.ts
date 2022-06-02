import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/auth.routes'

class App {
  public express : express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares () :void {
    // Arquivo que o Projeto ira trabalhar JSON()
    this.express.use(express.json())
    // Pasta aonde iram ficar os arquivos estaticos
    this.express.use(express.static('public'))
    this.express.use(cors())
  }

  private database () :void {
    mongoose.connect('mongodb://27017/partytime', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }

  private routes () :void {
    this.express.use('/api/auth', AuthRoute)
  }
}

export default new App().express
