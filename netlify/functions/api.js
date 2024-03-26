import express from 'express'
import bodyParser from 'body-parser'

import 'dotenv/config'
import serverless from "serverless-http"

import logger from '../../lib/logger.js'
import { startServer } from '../../index.js'
import router from '../../config/router.js'

const api = express()

api.use(bodyParser.json())

api.use('/', logger)
api.use('/api', router)



function starterServer() {
  try {
    startServer()
  } catch (err) {
    console.log('❌❌ Error: ', err, err.message)
  }
}

starterServer()

export const handler = serverless(api)