import { RequestHandler } from "express";
import { authService } from "./auth.service";

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    // res.cookie("token", result.jwtToken);
    res.status(200).json({
      success: true,
      message: "login successful",
      data: result,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export const authController = {
  loginUser,
};
