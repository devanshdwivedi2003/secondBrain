import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  const decoded = jwt.verify(headers as string, process.env.JWT_SECRET as string);
  if (decoded) {
    if (typeof decoded === "string") {
      res.status(403).json({
        mssage: "You are not logged-in",
      });

      return;
    }
    req.userId = (decoded as JwtPayload).id;
    next();
  } else {
    res.status(403).json({
      message: "You are not logged-in",
    });
  }
};
