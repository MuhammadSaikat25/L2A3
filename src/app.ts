import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./modules/users/user.route";
import { globalError } from "./middelware/globalError";
import { authRoute } from "./modules/auth/auth.route";
import { authValidation } from "./middelware/auth";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// ! for register users
app.use("/api", userRoute);

// ! for login users
app.use("/api", authValidation(), authRoute);
app.use(globalError);

export default app;
