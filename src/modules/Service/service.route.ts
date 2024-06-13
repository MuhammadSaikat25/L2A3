import { Router } from "express";
import { serviceController } from "./service.controller";
import { validation } from "../../middelware/validation";
import { serviceValidation } from "./service.validation";
import { authValidation } from "../../middelware/auth";

const router=Router()
router.post('/services',authValidation("admin"),validation(serviceValidation.createServiceValidation),serviceController.createService)
router.get('/services/:id',serviceController.getServiceById)

export const serviceRoute=router