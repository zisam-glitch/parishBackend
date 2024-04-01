import { Request, Response } from "express";
import Order from "./../models/order";

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userOrders = await Order.find({ userId })
      .populate({
        path: "products",
        select: "-description",
      })
      .exec();

      res.status(200).json(userOrders);
  } catch (error) {
    res.status(200).json(error);

  }
};
