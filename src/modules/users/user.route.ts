import { Router } from "express";
import { userController } from "./user.controller";
import { validation } from "../../middelware/validation";
import { userCreateValidation } from "./user.validation";


const route=Router()
route.post('/auth/signup',validation(userCreateValidation) , userController.createUser)


export const userRoute=route