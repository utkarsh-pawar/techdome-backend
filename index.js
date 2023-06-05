import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authrouter from "./routes/auth.route.js";
import cors from "cors";
import blogrouter from "./routes/blog.route.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected DB");
  })
  .catch(() => {
    console.log("error occurred");
    process.exit();
  });

app.use("/api/user", authrouter);
app.use("/api/blog", blogrouter);

app.listen(5000, () => {
  console.log("running on port " + 5000);
});
