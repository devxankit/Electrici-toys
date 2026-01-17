import express from "express";
import {
    getDashboard,
    analyticsReport,
} from "../Controller/Dashbaord-ReportCtrl.js";

import { AuthMiddleware, isAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// Get Dashboard
router.get("/dashboard", getDashboard);

// Get Analytics Report
router.get("/analytics-report", analyticsReport);

export default router;
