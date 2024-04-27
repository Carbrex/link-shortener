import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import { UserPayload } from "../types/express";
import mongoose from "mongoose";

const convertToObjectId = (id: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new UnauthenticatedError("Invalid Token");
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not logged in");
  }
  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(
    token,
    process.env.JWT_SECRET ?? "secret-string",
  ) as { userId: string };

  const userPayload: UserPayload = {
    userId: convertToObjectId(payload.userId),
  };
  req.user = userPayload;
  next();
};

export default auth;
