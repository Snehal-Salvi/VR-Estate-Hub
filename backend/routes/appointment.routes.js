import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentsByCustomerId,
} from "../controllers/appointment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create an appointment (for customers)
router.post("/", protect(["Customer"]), createAppointment);

// Get all appointments (for admins)
router.get("/", protect(["SuperAdmin", "PropertyAdmin"]), getAppointments);

// Get appointments for a specific customer
router.get("/me", protect(["Customer"]), getAppointmentsByCustomerId);

export default router;
