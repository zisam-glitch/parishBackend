import mongoose, { Schema, Document } from "mongoose";

interface Product {
  cartItem: mongoose.Types.ObjectId;
  quantity: number;
}

interface Cart extends Document {
  userId: string;
  products: Product[];
}

const CartSchema: Schema<Cart> = new Schema<Cart>({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      cartItem: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const CartModel = mongoose.model<Cart>("Cart", CartSchema);

export default CartModel;
