import { Router } from "express";
import { signUp } from '../controllers/userController.js'
import validateSignUpSchema from "../middlewares/validateSignUpSchemaMiddleware.js";

const userRouter = Router()

userRouter.post('/sign-up', validateSignUpSchema, signUp)

export default userRouter