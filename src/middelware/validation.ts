import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validation = (validation: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validation.parseAsync({
        body: req.body,
      });
      next();
    } catch (error:any) {
       next(error)
    }
    
  };
};
