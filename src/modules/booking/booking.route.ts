import { Router } from "express";
import { bookingController } from "./booking.controller";
import { authValidation } from "../../middelware/auth";

const route = Router();
route.post(
  "/bookings",
  authValidation("admin", "user"),
  bookingController.createBooking
);
route.get("/bookings", authValidation("user",'admin'), bookingController.getAllBooking);
route.get(
  "/my-bookings",
  authValidation("user", "admin"),
  bookingController.loginUserBooking
);
route.post(
  "/payment",
  authValidation("user", "admin"),
  bookingController.payment
);

route.get("/payment/stripePk", bookingController.stripePk);
export const bookingRoute = route;

