import mongoose from "mongoose";

const  OrderSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
      },
      customerId: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qunataty: {
        type: String,
        required: true,
      },
      subtotal: {
        type: String,
        required: true,
      },
      total: {
        type: String,
        required: true,
      },
      delivery_status: {
        type: String,
        default: "pending",
      },
      payment_status: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
