import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import API_BACKEND_URL from "../../config";
import { toast } from "react-toastify";
import styles from "./Appointment.module.css";

const BookAppointment = ({ show, handleClose, propertyId }) => {
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BACKEND_URL}/appointment`,
        { propertyId, appointmentDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message || "Appointment booked successfully!"
      );
      handleClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          Book Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="appointmentDate" className={styles.formGroup}>
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className={styles.button}>
            Book Now
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookAppointment;
