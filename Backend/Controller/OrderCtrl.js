import Order from "../Models/OrderModel.js";
import Product from "../Models/ProductModel.js";
import RazorpayInstance from "../Config/razorpay.js";


/* ================= PLACE ORDER ================= */
export const placeOrder = async (req, res) => {
    try {
        const { products, shippingAddressId, paymentMethod = "Razorpay" } = req.body;

        // Validate input
        if (!shippingAddressId) return res.status(400).json({ success: false, message: "shippingAddressId is required" });
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ success: false, message: "Products array is required and cannot be empty" });
        }

        // Fetch product details from DB and calculate total
        let totalAmount = 0;
        const orderProducts = await Promise.all(products.map(async (p, i) => {
            const product = await Product.findById(p.productId);
            if (!product) throw new Error(`Product not found at index ${i}`);

            const price = Number(product.sellingPrice);
            const quantity = Number(p.quantity);

            if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
                throw new Error(`Invalid price or quantity for product at index ${i}`);
            }

            const total = price * quantity;
            totalAmount += total;

            return {
                productId: product._id,
                quantity,
                price,
                total
            };
        }));

        // Create Razorpay order if payment method is Razorpay
        let razorpayOrderId = null;
        if (paymentMethod === "Razorpay") {
            if (totalAmount <= 0) {
                return res.status(400).json({ success: false, message: "Total amount must be greater than 0" });
            }

            const options = {
                amount: Math.round(totalAmount * 100), // paisa
                currency: "INR",
                receipt: `rcpt_${Date.now()}`
            };

            const razorpayOrder = await RazorpayInstance.orders.create(options);
            razorpayOrderId = razorpayOrder.id;
        }

        // Create order in DB
        const order = await Order.create({
            userId:req.user._id,
            products: orderProducts,
            totalAmount,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
            orderId: razorpayOrderId,
            shippingAddressId
        });

        return res.status(201).json({ success: true, message: "Order created successfully", order });

    } catch (error) {
        console.error("Place Order Error:", error);
        return res.status(500).json({ success: false, message: error.message || error });
    }
};

/* ================= VERIFY PAYMENT ================= */
export const verifyPayment = async (req, res) => {
    try {
        const { orderId, transactionId, paymentStatus } = req.body;

        const order = await Order.findOne({ orderId });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        order.paymentStatus = paymentStatus;
        order.transactionId = transactionId;

        // if payment successful, update orderStatus to processing
        if (paymentStatus === "Paid") {
            order.orderStatus = "processing";
            order.statusTimestamps.processing = new Date();
        }

        await order.save();
        res.json({ success: true, message: "Payment verified", order });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= GET ALL ORDERS ================= */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId").populate("products.productId").populate("shippingAddressId").sort({ createdAt: -1 });
        res.json({ success: true, total: orders.length, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= GET ORDER BY ID ================= */
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("userId")
            .populate("products.productId")
            .populate("shippingAddressId");

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= GET USER ORDERS ================= */
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate("products.productId")
            .populate("shippingAddressId")
            .sort({ createdAt: -1 });

        res.json({ success: true, total: orders.length, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const currentStatus = order.orderStatus;

    // Status flow rules
    const statusFlow = {
      pending: ["processing", "cancelled"],
      processing: ["shipped", "cancelled"],
      shipped: ["delivered"],
      delivered: [],
      cancelled: []
    };

    // Prevent backward or invalid transitions
    if (!statusFlow[currentStatus].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot move from '${currentStatus}' to '${newStatus}'`
      });
    }

    // Update status
    order.orderStatus = newStatus;

    // Add timestamp
    if (!order.statusTimestamps) {
      order.statusTimestamps = {};
    }

    order.statusTimestamps[newStatus] = new Date();

    await order.save();

    res.json({
      success: true,
      message: `Order status updated from '${currentStatus}' to '${newStatus}'`,
      order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findOne({ orderId });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        order.orderStatus = "Cancelled";
        order.statusTimestamps.cancelled = new Date();

        await order.save();
        res.json({ success: true, message: "Order cancelled successfully", order });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};