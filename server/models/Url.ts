import mongoose from "mongoose";
import { IUrl } from "../types/models";

const UrlSchema = new mongoose.Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
      minlength: [5, "Original url must be at least 5 characters"],
      maxlength: [1000, "Original url must be at most 500 characters"],
      match: [
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        "Please provide a valid URL to shorten",
      ],// matches that the url starts with http or https or ftp and has no spaces
    },
    shortUrl: {
      type: String,
      required: [true, "Please provide short url"],
      minlength: [5, "Short url must be at least 5 characters"],
      maxlength: [10, "Short url must be at most 10 characters"],
      match: [
        /^[a-zA-Z0-9]*$/,
        "Short url must contain only letters and numbers",
      ],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      minlength: [4, "Password must be at least 4 characters"],
      maxlength: [20, "Password must be at most 20 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    hasExpirationDate: {
      type: Boolean,
      default: false,
    },
    expirationDate: {
      type: Date,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Url = mongoose.model<IUrl>("Url", UrlSchema);
export default Url;
