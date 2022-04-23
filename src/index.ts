import 'dotenv/config'
import express from 'express'
import { URLController } from './controller/url-controller'
import { MongoConnection } from './database/mongo-connection'

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(process.env.API_PORT, () => console.log('Express server listening on port 8081'))