import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import { Users } from "../modules/users/user.model";

export const authValidation = (...UserRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const authHeader = req.headers.authorization;

      const token = req.cookies.token;

      if (!token) {
        return next(new AppError(400, "You have no access to this route"));
      }
      // if (!token) {
      //   if (!authHeader) {
      //     return next(new AppError(400, "You have no access to this route"));
      //   }
      // }
      const decoded = jwt.verify(
        token as string,
        process.env.JWT as string
      ) as JwtPayload;

      const userExist = await Users.findOne({ email: decoded.email });

      if (!userExist) {
        return next(new AppError(400, "You have no access to this route"));
      }

      if (UserRole && !UserRole.includes(decoded.role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }
      req.user = userExist;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
