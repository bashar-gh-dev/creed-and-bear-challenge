import { NextFunction, Request, Response } from "express";

const delayPeriod = 3000;

export const delayResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  setTimeout(() => {
    next();
  }, delayPeriod);
};
