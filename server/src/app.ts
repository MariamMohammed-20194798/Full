// IMPORTS
import express from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import errorHandler from "./controllers/errorController";
import expressLayouts from "express";

import { router as quizRouter } from "./routes/quizRoute";
import { router as userRouter } from "./routes/userRoute";
import { router as anncRouter } from "./routes/anncRouter";
export const app = express();

app.enable("trust proxy");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());

app.use(errorHandler);
// ROUTES
app.use(express.urlencoded({ extended: true }));
app.use("/api/coligo/user", userRouter);
app.use("/api/coligo/quiz", quizRouter);
app.use("/api/coligo/annc", anncRouter);

app.set("view engine", "ejs");
app.use(expressLayouts);
