import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Properties.module.css";
import { Card, Button, Spinner, Carousel, Modal } from "react-bootstrap";
import API_BACKEND_URL from "../../config";
import BookAppointment from "../Appointment/BookAppointment";
import VRTour from "../VRTour/VRTour";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showVRTour, setShowVRTour] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_BACKEND_URL}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleShow = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPropertyId(null);
  };

  const handleVRTour = (image) => {
    setSelectedImage(image);
    setShowVRTour(true);
  };

  const handleCloseVRTour = () => {
    setShowVRTour(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.cardContainer}>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Card key={property._id} className={styles.propertyCard}>
              <Carousel>
                {property.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`${property.title} img ${index + 1}`}
                    />
                    <Carousel.Caption>
                      <Button onClick={() => handleVRTour(image)}>
                        View VR Tour
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {property.location} <br />
                  <strong>Price:</strong> ${property.price} <br />
                  <strong>Amenities:</strong> {property.amenities.join(", ")}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleShow(property._id)}
                >
                  Book Appointment
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No properties available at this time.</p>
        )}
      </div>

      {/* Modal for booking appointment */}
      <BookAppointment
        show={showModal}
        handleClose={handleClose}
        propertyId={selectedPropertyId}
      />

      {/* VR Tour Modal */}
      <Modal show={showVRTour} onHide={handleCloseVRTour} size="lg" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Virtual Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VRTour image={selectedImage} onClose={handleCloseVRTour} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
