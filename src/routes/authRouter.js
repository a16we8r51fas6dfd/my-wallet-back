import { Router } from "express";
import { signIn } from "../controllers/authController.js.js";
import validateSignInSchema from "../middlewares/validateSignInSchemaMiddleware.js";

const authRouter = Router()

authRouter.post('/sign-in', validateSignInSchema, signIn)

export default authRouter