import { RequestHandler } from "express";
import { authService } from "./auth.service";

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: result ? true : false,
      message: result ? "User login successful" : "User dose not exist",
      token: result.jwtToken,
      data: result.result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const authController = {
  loginUser,
};
