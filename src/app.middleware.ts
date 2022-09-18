import { Request, Response, NextFunction } from 'express';

export function validateHeaders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next();
}
