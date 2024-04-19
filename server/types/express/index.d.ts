import { Response, Request } from "express"
import mongoose from "mongoose"

export interface UserPayload {
  userId: mongoose.Types.ObjectId;
  // name: string;
  // email: string;
  // isAdministrator: boolean;
}

declare global {
  namespace Express {
    export interface Request {
      user: UserPayload;
      file: any;
      pagination: {
        skip: number;
        limit: number;
        page: number;
      };
    }
  }
}
