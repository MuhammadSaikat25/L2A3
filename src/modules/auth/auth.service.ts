import jwt from "jsonwebtoken";
import { Users } from "../users/user.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
const loginUser = async (playLoad: TLogin) => {
  const result = await Users.findOne({ email: playLoad.email });
  const checkingPassword = await bcrypt.compare(
    playLoad.password as string,
    result?.password as string
  );

  if (checkingPassword == false) {
    throw new Error("Password does not match");
  }
  const jwtPlayLoad = {
    email: result?.email,
    role: result?.role,
  };
  const jwtToken = jwt.sign(jwtPlayLoad, process.env.JWT as string, {
    expiresIn: "10d",
  });
  return {
    jwtToken,
  };
};

export const authService = {
  loginUser,
};
