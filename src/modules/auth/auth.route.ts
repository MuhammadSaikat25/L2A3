import { Router } from "express";
import { authController } from "./auth.controller";

const route=Router()
route.post('/auth/login',authController.loginUser)
export const authRoute=route