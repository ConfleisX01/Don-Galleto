import express from 'express'
import { SERVER_PORT } from './config.js'

const app = express()

app.listen(SERVER_PORT, () => {
    console.log('http://localhost:3001')
})