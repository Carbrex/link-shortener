import { Request, Response, NextFunction } from "express";
import { CustomAPIError, NotFoundError } from "../errors";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail";
import multer from "multer";

const errorHandlerMiddleware = (
  err:
    | Error
    | NotFoundError
    | CustomAPIError
    | jwt.JsonWebTokenError
    | mongoose.Error
    | MongoServerError
    | SyntaxError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR: " + err.message);

  // Custom Error
  if (err instanceof CustomAPIError) {
    // console.log(err)
    return res.status(err.statusCode).json({ error: true, msg: err.message });
  }

  //JWT error
  if (err instanceof jwt.JsonWebTokenError) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: true,
        msg: "Session Expired. Please login again.",
      });
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: true, msg: "Unauthorized" });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors)
      .map((item) => item.message)
      .join(" and ");
    // Invalid data eg missing fields
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, msg: messages });
  }

  if (err instanceof mongoose.Error.CastError) {
    // Failed to cast data eg invalid id
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, msg: "Resource not found" });
  }

  if (err instanceof mongoose.Error) {
    console.log("mongoose error");
  }
  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue)[0];
      const knownErrorKeys: { [key: string]: string } = {
        email: "An account with this email already exists.",
        shortUrl: "Short URL is already taken",
      };
      let msg = knownErrorKeys[key];
      if (!msg) {
        msg = `${key} is already in use.`;
      }
      return res.status(StatusCodes.BAD_REQUEST).json({ error: true, msg });
    }
  }

  // Multer Error
  const multerErrorMessages = {
    LIMIT_PART_COUNT: "Too many parts",
    LIMIT_FILE_SIZE: "File size is too large. Max limit is 4MB",
    LIMIT_FILE_COUNT: "Too many files",
    LIMIT_FIELD_KEY: "Field name is too long",
    LIMIT_FIELD_VALUE: "Field value is too long",
    LIMIT_FIELD_COUNT: "Too many fields",
    LIMIT_UNEXPECTED_FILE:
      "Unexpected file: Acceptes files are jpg, jpeg, png, webp",
  };
  if (err instanceof multer.MulterError) {
    const errorCode = err.code;
    const errorMessage =
      multerErrorMessages[errorCode] || "Unknown Multer error";

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: errorMessage,
    });
  }
  if (err instanceof NotFoundError) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, msg: err.message });
  }

  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, msg: "Invalid JSON in request body" });
  }

  console.log(err);

  if (
    !(
      process.env.SMTP_EMAIL_USER === undefined ||
      process.env.MY_EMAIL === undefined
    )
  ) {
    // Send email to developer for unhandled errors
    try {
      const text = `Hi, an error occurred in the link shortener server. Please check the logs for more details.\n\n${err.message}\n\n${err}\n\n${err.stack}\n\nRequest URL: ${req.url}\n\nRequest Method: ${req.method}\n\nRequest Headers: ${JSON.stringify(req.headers, null, 2)}\n\n\n\nRequest Body: ${JSON.stringify(req.body, null, 2)}`;
      console.log(text);
      sendMail({
        from: process.env.SMTP_EMAIL_USER,
        to: process.env.MY_EMAIL,
        subject: "Error occurred in link shortener server",
        text,
      })
        .then(() => {
          console.log("Email sent to developer");
        })
        .catch((err) => {
          console.log("Error sending email");
        });
    } catch (e) {
      console.log("Error sending email");
    }
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: true, msg: "Internal Server Error" });
};

export default errorHandlerMiddleware;
