import mongoose from "mongoose";

const serverSelectionTimeoutMS: number =
  Number(process.env.SERVER_SELECTION_TIMEOUT_MS) || 5000;

const connectDB = (url: string) => {
  return mongoose.connect(url, { serverSelectionTimeoutMS });
};

export default connectDB;
