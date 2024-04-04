import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import ProductRouter from "./routes/produts";
import AuthRouter from "./routes/auth";
import UserRouter from "./routes/user";
import CartRouter from "./routes/cart";
import OrderRouter from "./routes/order";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;
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
app.use("/api/users", UserRouter);
app.use("/api/", AuthRouter);
app.use("/api/order", OrderRouter);
app.use("/api/cart", CartRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
