import { Request, Response } from "express";
import Product from "../models/product";

export const createProducts = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).json("product created successfully");
  } catch (error) {
    res.status(500).json("failed to create the product");
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Failed to get Products");
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Failed to get the Products");
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const result = await Product.aggregate([
      {
        $search: {
          index: "parishDental",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Failed to get the Products");
  }
};
