import express, { json, Router } from "express";
import cors from 'cors'
import router from './routes/index.js'

const app = express()
app.use(cors())
app.use(json())

app.use(router)

app.listen(5000, () => {
    console.log('server barulhando na porta 5000')
})