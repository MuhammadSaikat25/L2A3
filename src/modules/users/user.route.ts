import { Router } from "express";
import { userController } from "./user.controller";
import { validation } from "../../middelware/validation";
import { userCreateValidation } from "./user.validation";
import { authValidation } from "../../middelware/auth";

const route = Router();

route.post(
  "/auth/signup",
  validation(userCreateValidation),
  userController.createUser
);
route.get(
  "/get-all-user",
  authValidation("admin"),
  userController.getAllUserBYAdmin
);
route.put(
  "/update-role/:id",
  authValidation("admin"),
  userController.updateUserRole
);

export const userRoute = route;
