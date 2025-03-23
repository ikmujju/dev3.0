import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Home", "Beauty", "Sports", "Other"],
    },
    subCategory: {
      type: String,
      required: false,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      get: function (image) {
        return `http://localhost:3001/uploads/${image}`;
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Productmodel = mongoose.model("Product", productSchema);

export { Productmodel as Product };
