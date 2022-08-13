import { loginController } from "../controllers/auth/login";
import { Router } from "express";


export const authRoute = Router();

authRoute.post("/api/auth/login", loginController);
