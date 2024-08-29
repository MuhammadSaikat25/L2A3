import { Router } from "express";
import { serviceController } from "./service.controller";
import { serviceValidation } from "./service.validation";
import { authValidation } from "../../middelware/auth";
import { validation } from "../../middelware/validation";


const router = Router();
router.post(
  "/services",
  authValidation("admin"),
  validation(serviceValidation.createServiceValidation),
  serviceController.createService
);
router.get("/services/:id", serviceController.getServiceById);
router.get("/services", serviceController.getAllServices);
router.put(
  "/services/:id",
  authValidation("admin"),
  validation(serviceValidation.updateServiceValidation),
  serviceController.updateAService
);
router.delete('/services/:id',authValidation('admin'),serviceController.deleteAService)
export const serviceRoute = router;
