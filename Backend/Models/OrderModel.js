import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // vivo
        quantity: { type: Number, required: true, default: 1 }, // 5
        price: { type: Number, required: true }, // 110001
        total: { type: Number, required: true } // 55000
      }
    ],

    totalAmount: { type: Number, required: true }, // 55000

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending"
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Card", "Wallet", "Razorpay"],
      default: "Razorpay"
    },

    transactionId: { type: String },
    orderId: { type: String }, // payment gateway order id

    shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    },

    statusTimestamps: {
      pending: { type: Date },
      processing: { type: Date },
      shipped: { type: Date },
      delivered: { type: Date },
      cancelled: { type: Date }
    }
  },
  { timestamps: true }
);

// auto update initial status timestamp
orderSchema.pre("save", function (next) {
  if (!this.statusTimestamps.pending) {
    this.statusTimestamps.pending = new Date();
  }
});

export default mongoose.model("Order", orderSchema);
