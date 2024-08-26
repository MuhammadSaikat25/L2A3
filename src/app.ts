import express from "express";
import cors from "cors";
import { userRoute } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { serviceRoute } from "./modules/Service/service.route";
import { slotRoute } from "./modules/slot/slot.route";
import { bookingRoute } from "./modules/booking/booking.route";
import globalErrorHandler from "./middelware/globalErrorHandler";
import notFound from "./middelware/notFound";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Other-Custom-Header"],
  })
);

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
app.use("/api", bookingRoute);

app.use(globalErrorHandler);
app.use(notFound)

export default app;
