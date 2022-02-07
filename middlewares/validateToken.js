import db from "../db.js";

export async function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers
        const token = authorization?.replace('Bearer ', '')

        if(!token) {
            res.sendStatus(401)
            return
        }

        const session = await db.collection('sessions').findOne({ token })

        if(!session) {
            res.sendStatus(401)
            return
        }

        const userData = await db.collection('users').findOne({ _id: session.userId })

        if(!userData) {
            res.sendStatus(401)
            return
        }

        delete userData.password

        res.send(userData)

        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}