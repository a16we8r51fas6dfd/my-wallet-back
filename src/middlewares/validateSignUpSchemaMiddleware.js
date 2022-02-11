import signUpSchema from "../schemas/signUpSchema.js";

export default function validateSignUpSchema(req, res, next) {
    const validation = signUpSchema.validate(req.body)

    if(req.body.password !== req.body.confirmPassword) {
        res.sendStatus(409)
        return
    }

    if(validation.error) {
        res.sendStatus(422)
        return
    }

    next()
}