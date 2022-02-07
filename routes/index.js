import { Router } from "express";
import appRouter from "./appRouter.js";
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'


const router = Router()
router.use(authRouter)
router.use(userRouter)
router.use(appRouter)

export default router