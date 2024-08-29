import { Router } from "express";
import { slotController } from "./slot.controller";
import { authValidation } from "../../middelware/auth";

const route = Router();

route.post(
  "/services/slots",
  authValidation("admin"),
  slotController.createSlot
);

route.get('/slots/availability',slotController.getAvailableSlot)
route.get('/serviceSlot/:id',slotController.getServiceSlot)

export const slotRoute = route;
