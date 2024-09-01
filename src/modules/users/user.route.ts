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
  authValidation("admin", "user"),
  userController.getAllUserBYAdmin
);
route.get("/getMe/:email", authValidation("user"),userController.getMe);
route.put(
  "/update-profile/:email",
  authValidation("user"),
  userController.updateProfile
);
route.put(
  "/update-role/:id",
  authValidation("admin"),
  userController.updateUserRole
);

export const userRoute = route;
