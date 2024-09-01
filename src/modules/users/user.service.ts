import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { Users } from "./user.model";
import bcrypt from "bcrypt";

const postUserIntoDB = async (playLoad: TUser) => {
  const hashedPassword = await bcrypt.hash(playLoad.password, 10);
  playLoad.password = hashedPassword;
  const userExist = await Users.findOne({ email: playLoad.email });
  if (userExist) {
    throw new AppError(400, "Email is already exits");
  }
  const result = await Users.create(playLoad);
  return result;
};

const getAllUserBYAdmin = async () => {
  const result = await Users.find();
  return result;
};

const updateUserRole = async (playLoad: any, id: string) => {
  const result = await Users.findByIdAndUpdate(
    id,
    { role: playLoad.role },
    { new: true }
  );
  return result;
};
export const userService = {
  postUserIntoDB,
  getAllUserBYAdmin,
  updateUserRole,
};
