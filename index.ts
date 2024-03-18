import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import ProductRouter from "./routes/produts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO as string;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
