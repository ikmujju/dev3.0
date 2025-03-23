import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        imageUrl: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);

export { CartModel as Cart };
