import { Router } from "express";
import { iniciarSesionController, registroController } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/registro", registroController)

authRouter.post("/login", iniciarSesionController)



export default authRouter