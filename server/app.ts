import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
// extra security
// const helmet = require('helmet');
// const xss = require('xss-clean');
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

app.use(morgan("dev"));

// connectDB
import connectDB from "./db/connect";
// const connectDB = require("./db/connect");
// const authenticateUser = require("./middleware/authentication");

// // routers
import authRouter from "./routes/auth";
import urlRouter from "./routes/url";

// // error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100,
  }),
);

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin: string | undefined, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

app.use(express.json());
// extra packages
// app.use(helmet());
// app.use(cors());
// app.use(xss());

app.get("/", (req, res) => {
  res.send("Hello");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/url", urlRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (typeof mongoUri === "undefined") {
      console.log("MONGO_URI not provided");
      console.log("exiting");
      return;
    }
    await connectDB(mongoUri);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
