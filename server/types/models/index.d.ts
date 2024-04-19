import { Schema } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdministrator: boolean;
  isActivated: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUrl {
  originalUrl: string;
  shortUrl: string;
  createdBy: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  hasExpirationDate: boolean;
  expirationDate?: Date;
  clickCount: number;
}
