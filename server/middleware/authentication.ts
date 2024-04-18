import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import { UserPayload } from "../types/express";
import mongoose from "mongoose"

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "secret-string",
    ) as {userId: string};
    // const str="random string"
    // let userPayload: UserPayload = { userId: new mongoose.Types.ObjectId(str) };
    const userPayload:UserPayload = { userId: new mongoose.Types.ObjectId(payload.userId) };
    req.user = userPayload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Error");
  }
};

module.exports = auth;
