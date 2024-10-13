import Appointment from "../models/appointment.model.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { propertyId, appointmentDate } = req.body;

  try {
    const newAppointment = new Appointment({
      propertyId,
      appointmentDate,
      customerId: req.user.id,
      createdBy: req.user.id,
    });

    await newAppointment.save();
    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create appointment", error: error.message });
  }
};

// Get appointments for the authenticated customer
export const getAppointmentsByCustomerId = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      customerId: req.user.id,
    }).populate("propertyId");
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve appointments",
        error: error.message,
      });
  }
};

// Get all appointments (for admins)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("propertyId");
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve appointments",
        error: error.message,
      });
  }
};
