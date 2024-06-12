import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  type TError = {
    path: string;
    message: string;
  };

  let errorPattern: TError[] = [];

  const handleZodError = (err: ZodError) => {
    return err.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1] as string,
        message: issue.message,
      };
    });
  };

  if (err instanceof ZodError) {
    errorPattern = handleZodError(err);
    res.status(400).json({
      success: false,
      message: "Validation error",
      errorPattern,
    });
  } else {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: errorPattern,
    });
  }

  next(err);
};
