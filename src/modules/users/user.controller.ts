import { RequestHandler } from "express";
import { userService } from "./user.service";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userService.postUserIntoDB(data);
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUserBYAdmin: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUserBYAdmin();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      data: error,
    });
  }
};

const updateUserRole: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.updateUserRole(req.body, req.params.id);
    res.status(200).json({
      success: true,
      message: "user role update successful",
      data: result,
    });
  } catch (error: any) {
    res.json({
      message: false,
      data: error,
    });
  }
};
export const userController = {
  createUser,
  getAllUserBYAdmin,
  updateUserRole,
};
