import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./modules/users/user.route";
import { globalError } from "./middelware/globalError";
import { authRoute } from "./modules/auth/auth.route";
import { authValidation } from "./middelware/auth";
import { serviceRoute } from "./modules/Service/service.route";
import { slotRoute } from "./modules/slot/slot.route";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// ! for register users
app.use("/api", userRoute);
// ! for create service
app.use("/api", serviceRoute);
// ! for login users
app.use("/api", authRoute);
app.use('/api',slotRoute)

app.use(globalError);

export default app;
