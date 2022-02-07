import signInSchema from "../schemas/signInSchema.js"

export default function validateSignInSchema(req, res, next) {
    const validation = signInSchema.validate(req.body)

    if(validation.error) {
        res.sendStatus(422)
        return
    }

    next()
}