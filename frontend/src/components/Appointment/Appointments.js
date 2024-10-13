import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API_BACKEND_URL from "../../config";
import styles from "./Appointment.module.css";

const Appointments = () => {
  const { user } = useAuth(); // Get user from Auth context
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        // If user is null, return early
        return;
      }

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
        };

        // Fetch appointments for customer
        const response = await fetch(`${API_BACKEND_URL}/appointment/me`, {
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(error.message); // Notify user about the error
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className={`table ${styles.table}`}>
          <thead>
            <tr>
              <th>Property Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.propertyId.title}</td>
                <td>{appointment.propertyId.location}</td>
                <td>${appointment.propertyId.price}</td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
