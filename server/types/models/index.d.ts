import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  profilePicture?: string;
  password?: string;
  isAdministrator: Boolean;
  isActivated: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<Boolean>;
}

export interface IUrl {
  originalUrl: string;
  shortUrl: string;
  password?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  hasExpirationDate: Boolean;
  expirationDate?: Date;
  clickCount?: number;
}
