import express from "express";
import {
  register,
  login,
  updateUserRole,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes for role management (SuperAdmin only)
router.put("/role", protect(["SuperAdmin"]), updateUserRole);

export default router;
