import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import db from '../db.js'

export async function signIn (req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection('users').findOne({ email })
    
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid()
    
            await db.collection('sessions').insertOne({ token, userId: user._id })
    
            res.send({
                token: token,
                name: user.name
            })
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function Logout(req, res) {
    const { id } = req.body

    try {
        await db.collection('sessions').deleteOne({ _id: id})

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}