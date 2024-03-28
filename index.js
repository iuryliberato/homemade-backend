import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import 'dotenv/config'


const app = express()


export const startServer = async () => {
  try {
    console.log(process.env.dbURI)
    await mongoose.connect(process.env.DB_URI)
    console.log('🌮 Database connected successfully')

    // Json -> req.body
    app.use(express.json())

    // Router middleware
    app.use('/api', router)
    app.use(express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
    // Log requests
    app.use((req, _res, next) => {
      console.log(`🧁 Request recieved: ${req.method} - ${req.url}`)
      next()
    })

    // Catcher
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Path not found' })
    })

    const server = app.listen(process.env.PORT, () => console.log(`🥕 Server up and running on port ${process.env.PORT}`))
    server.timeout = 10000

  } catch (error) {
    console.log('🦴 Something went wrong')
    console.log(error)
  }
}

startServer()
