import mongoose from "mongoose";
import { IUrl } from "../types/models";

const UrlSchema = new mongoose.Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
    },
    shortUrl: {
      type: String,
      required: [true, "Please provide short url"],
      unique: true,
      index: true,
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
