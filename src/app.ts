import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./modules/users/user.route";
import { globalError } from "./middelware/globalError";
import { authRoute } from "./modules/auth/auth.route";
import { authValidation } from "./middelware/auth";
import { serviceRoute } from "./modules/Service/service.route";
import { slotRoute } from "./modules/slot/slot.route";
import { bookingRoute } from "./modules/booking/booking.route";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// !  register users
app.use("/api", userRoute);
// ! service related route
app.use("/api", serviceRoute);
// ! users login related route
app.use("/api", authRoute);
//! slot related route
app.use("/api", slotRoute);
// ! booking related route
app.use('/api',bookingRoute)
app.use(globalError);

export default app;
