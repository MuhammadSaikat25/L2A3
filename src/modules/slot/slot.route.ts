import { Router } from "express";
import { slotController } from "./slot.controller";
import { authValidation } from "../../middelware/auth";

const route = Router();

route.post(
  "/services/slots",
  authValidation("admin"),
  slotController.createSlot
);

export const slotRoute = route;
