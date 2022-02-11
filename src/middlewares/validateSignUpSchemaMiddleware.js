import signUpSchema from "../schemas/signUpSchema.js";

export default function validateSignUpSchema(req, res, next) {
    const validation = signUpSchema.validate(req.body)

    if(validation.error) {
        res.sendStatus(422)
        return
    }

    next()
}