import { TUser } from "./user.interface";
import { Users } from "./user.model";
import bcrypt from "bcrypt";

const postUserIntoDB = async (playLoad: TUser) => {
  const hashedPassword = await bcrypt.hash(playLoad.password, 10);
  playLoad.password = hashedPassword;
  const result = await Users.create(playLoad);
  return result;
};

export const userService = {
  postUserIntoDB,
};
