import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

// GET all Employees
router.get("/productos", getProducts);

// GET An Employee
router.get("/productos/:id", getProduct);

// DELETE An Employee
router.delete("/productos/:id", deleteProduct);

// INSERT An Employee
router.post("/productos", createProduct);

router.put("/productos/:id", updateProduct);

export default router;
