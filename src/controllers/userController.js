import bcrypt from 'bcrypt'
import db from '../db.js'

export async function signUp(req, res) {
    // receive name, email, password
    const user = req.body
    
    const passwordHashed = bcrypt.hashSync(user.password, 8)

    try {
        console.log(user.email)

        const emailAlreadyExists = await db.collection('users').findOne({ email: user.email })

        console.log(emailAlreadyExists)

        if(emailAlreadyExists) {
            res.sendStatus(409)
            return
        }

        await db.collection('users').insertOne({
            ...user,
            password: passwordHashed
        })

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}