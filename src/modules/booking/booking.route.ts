import { Router } from "express";
import { bookingController } from "./booking.controller";
import { bookingValidation } from "./booking.validation";
import { validation } from "../../middelware/validation";
import { authValidation } from "../../middelware/auth";

const route = Router();
route.post(
  "/bookings",
  authValidation('user'),
  validation(bookingValidation.createBookingValidation),
  bookingController.createBooking
);
export const bookingRoute = route;
