import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },

    actualPrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String, // image URL
      },
    ],

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    specifications: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
