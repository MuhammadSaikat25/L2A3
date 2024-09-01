import { RequestHandler } from "express";
import { userService } from "./user.service";
import { Users } from "./user.model";

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

const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email;
    const data = req.body;

    const result = await Users.findOneAndUpdate(
      { email },
      { ...data },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: result });
  } catch (error) {
    next(error);
  }
};

const getMe: RequestHandler = async (req, res, next) => {
  try {
    const result = await Users.findOne({ email: req.params.email });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      data: error,
    });
  }
};
export default updateProfile;
export const userController = {
  createUser,
  getAllUserBYAdmin,
  updateUserRole,
  updateProfile,
  getMe,
};
