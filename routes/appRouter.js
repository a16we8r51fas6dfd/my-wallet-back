import { Router } from "express";
import { getTransactions, NewExit, NewInput } from "../controllers/appController.js";
import { validateToken } from "../middlewares/validateToken.js";

const appRouter = Router()

appRouter.get('/home', getTransactions)
appRouter.post('/new-entry', NewInput)
appRouter.post('/new-exit', NewExit)

export default appRouter