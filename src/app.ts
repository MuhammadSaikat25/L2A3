import express from "express";
import cors from "cors";
import { userRoute } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { slotRoute } from "./modules/slot/slot.route";
import { bookingRoute } from "./modules/booking/booking.route";
import globalErrorHandler from "./middelware/globalErrorHandler";
import notFound from "./middelware/notFound";
import { serviceRoute } from "./modules/Service/service.route";
import cookieParser from "cookie-parser";
import { reviewRoute } from "./modules/review/review.route";
const app = express();

app.use(
  cors({
    origin: "https://l2a4f.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
// !  register users
app.use("/api", userRoute);
// ! service related route
app.use("/api", serviceRoute);
// ! users login related route
app.use("/api", authRoute);
//! slot related route
app.use("/api", slotRoute);
// ! booking related route
app.use("/api", bookingRoute);
app.use("/api", reviewRoute);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
