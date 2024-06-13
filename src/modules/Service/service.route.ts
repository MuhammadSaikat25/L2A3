import { Router } from "express";
import { serviceController } from "./service.controller";
import { validation } from "../../middelware/validation";
import { serviceValidation } from "./service.validation";

const router=Router()
router.post('/api/services',validation(serviceValidation.createServiceValidation),serviceController.createService)

export const serviceRoute=router