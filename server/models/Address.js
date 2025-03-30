import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true, // Ensures one address per user
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddressModel = mongoose.model("Address", addressSchema);

export { AddressModel as Address };
