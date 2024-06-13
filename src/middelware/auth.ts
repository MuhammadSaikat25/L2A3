import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authValidation = (...requiredRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      jwt.verify(token, process.env.JWT as string, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized Access",
          });
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRole && !requiredRole.includes(role)) {
          return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "You have no access to this route",
          });
        }
        req.user = decoded as JwtPayload;
        next();
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
