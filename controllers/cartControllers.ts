import Product from "../models/product";
import { Request, Response } from "express";
import Cart from "../models/cart";

export const addToCart = async (req: Request, res: Response) => {
  const { userId, cartItem, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProductIndex = cart.products.findIndex(
        (product) => product.cartItem.toString() === cartItem
      );
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ cartItem, quantity });
      }
      await cart.save();
      res.status(200).json("Product added to cart");
    } else {
      const newCart = new Cart({
        userId,
        products: [{ cartItem, quantity: quantity }],
      });
      await newCart.save();
      res.status(200).json("Cart created successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "products.cartItem",
      "_id title category price imageUrl"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletCartItem = async (req: Request, res: Response) => {

   const  cartItemId = req.params.cartItemId;

   try{
    const updatedCart = await Cart.findOneAndUpdate (
      {'producds._id': cartItemId},
      {$pull: {products: {_id: cartItemId}}},
      {new : true}
      );
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
    
    
};
export const decrimentCartItem = async (req: Request, res: Response) => {
  const { userId, cartItem } = req.body;

  try{
    const cart = await Cart.findOne({ userId })

    if (!cart){
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProduct = cart.products.find(
      (product) => product.cartItem.toString() === cartItem
    );

    if (!existingProduct){
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.quantity === 1){
      cart.products = cart.products.filter(
        (product) => product.cartItem.toString() !== cartItem);
    }else{
      existingProduct.quantity -= 1;
    }
    await cart.save();

    if (existingProduct.quantity === 0){
      await Cart.updateOne(
        {userId},
        {$pull: {products: {cartItem}}}
      )
      }
      res.status(200).json('product updated successfully');
  }catch (error) {
    res.status(500).json(error);
  };
};
