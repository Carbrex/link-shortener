import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const errorHandlerMiddleware = (
  err: Error | CustomAPIError | mongoose.Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR: " + err.message);

  // Custom Error
  if (err instanceof CustomAPIError) {
    // console.log(err)
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }

  //JWT error
  if (err instanceof jwt.JsonWebTokenError) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Session Expired. Please login again.",
      });
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Not authorized" });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    // Invalid data eg missing fields
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }

  if (err instanceof mongoose.Error.CastError) {
    // Failed to cast data eg invalid id
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Resource not found" });
  }

  if (err instanceof mongoose.Error) {
    console.log("mongoose error");
  }
  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Internal Server Error" });
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // console.log(err);
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
