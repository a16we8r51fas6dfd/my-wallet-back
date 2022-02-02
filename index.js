import express, { json } from "express";
import cors from 'cors'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect(() => {
    db = mongoClient.db("my_wallet_db")
})

const app = express()
app.use(cors())
app.use(json())

// sign-up route

app.post('/sign-up', async (req, res) => {
    // receive name, email, password
    const user = req.body
    
    const passwordHashed = bcrypt.hashSync(user.password, 8)

    try {
        await db.collection('users').insertOne({
            ...user,
            password: passwordHashed
        })

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//sign-in route

app.post('/sign-in', async (req, res) => {
    const { email, password} = req.body

    const user = await db.collection('users').findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.listen(5000, () => {
    console.log('server barulhando na porta 5000')
})