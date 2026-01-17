import ProductModel from "../Models/ProductModel.js";
import OrderModel from "../Models/OrderModel.js";

/* ================= DASHBOARD ================= */

export const getDashboard = async (req, res) => {
  try {

    // Total Revenue
    const totalRevenueResult = await OrderModel.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Active Products
    const activeProducts = await ProductModel.countDocuments({ status: "active" });

    // Avg Order Value
    const avgOrderResult = await OrderModel.aggregate([
      { $group: { _id: null, avg: { $avg: "$totalAmount" } } }
    ]);

    const avgOrderValue = avgOrderResult[0]?.avg || 0;

    // Recent 5 Orders
    const recentOrders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "fullName email");

    // Best Selling Toys (Top 5)
    const bestSelling = await OrderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" }
    ]);

    res.status(200).json({
      totalRevenue,
      activeProducts,
      avgOrderValue,
      recentOrders,
      bestSelling
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ================= ANALYTICS REPORT ================= */

export const analyticsReport = async (req, res) => {
  try {

    // Monthly Revenue
    const monthlyRevenue = await OrderModel.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          total: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Top Customers
    const topCustomers = await OrderModel.aggregate([
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" }
    ]);

    res.status(200).json({
      monthlyRevenue,
      topCustomers
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
