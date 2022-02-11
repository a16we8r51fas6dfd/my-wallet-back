import db from "../db.js";

export async function NewInput(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token) {
        res.sendStatus(401)
        return
    }
    
    const description = req.body.description
    const value = req.body.value
    const transactionType = req.body.type
    const date = req.body.date
    
    try {
        const session = await db.collection('sessions').findOne({ token })
        
        if(!session) {
            res.sendStatus(401)
            return
        }

        await db.collection('transactions').insertOne({
            userId: session.userId,
            description: description,
            value: value,
            date: date,
            type: transactionType
        })

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function NewExit(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token) {
        res.sendStatus(401)
        return
    }
    
    const description = req.body.description
    const value = req.body.value
    const transactionType = req.body.type
    const date = req.body.date
    
    try {
        const session = await db.collection('sessions').findOne({ token })
        
        if(!session) {
            res.sendStatus(401)
            return
        }

        await db.collection('transactions').insertOne({
            userId: session.userId,
            description: description,
            value: value,
            date: date,
            type: transactionType
        })

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getTransactions(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    
    console.log(token)
    if(!token) {
        res.sendStatus(401)
        return
    }

    try {
        const session = await db.collection('sessions').findOne({ token })

        if (!session) {
            res.sendStatus(401)
        }

            const transactions = await db.collection('transactions').find({userId: session.userId}).toArray()
            console.log(transactions)
            res.send(transactions)   
    } catch (error) {
        res.sendStatus(500)
    }

}