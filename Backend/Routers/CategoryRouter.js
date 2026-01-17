import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../Controller/CategoryCtrl.js";

import upload  from "../Cloudinary/Upload.js";

import { AuthMiddleware, isAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/create", AuthMiddleware, isAdmin, upload.single("image"), createCategory);
router.get("/all", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/update/:id",AuthMiddleware, isAdmin, upload.single("image"), updateCategory);
router.delete("/delete/:id", AuthMiddleware, isAdmin , deleteCategory);

export default router;
