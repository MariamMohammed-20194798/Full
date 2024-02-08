import mongoose from "mongoose";
import * as http from "http";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);
const server: http.Server = http.createServer(app);

mongoose.connect(DB).then(() => console.log("DB Connection Successful!"));

//SERVER RUNNING
const port = 8000;

server.listen(port, () => {
  console.log(`APP RUNNING ON PORT ${port}...`);
});
