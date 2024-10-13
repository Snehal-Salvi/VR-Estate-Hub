import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Customers can view properties
router.get("/", getProperties); // Public route
router.get("/:propertyId", getPropertyById); // Public route to get a property by ID

// Only Property Admins and Super Admins can create, update, or delete properties
router.post("/", protect(["PropertyAdmin", "SuperAdmin"]), createProperty);
router.put(
  "/:propertyId",
  protect(["PropertyAdmin", "SuperAdmin"]),
  updateProperty
);
router.delete(
  "/:propertyId",
  protect(["PropertyAdmin", "SuperAdmin"]),
  deleteProperty
);

export default router;
