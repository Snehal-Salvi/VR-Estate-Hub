import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import API_BACKEND_URL from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AddProperty = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    amenities: "",
    images: "",
  });

  const { user } = useAuth(); // Access the user from AuthContext
  const navigate = useNavigate();

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the comma-separated string of image URLs into an array
    const propertyData = {
      ...propertyDetails,
      images: propertyDetails.images.split(",").map((url) => url.trim()), // Convert comma-separated string to array
      amenities: propertyDetails.amenities
        .split(",")
        .map((item) => item.trim()), // Split amenities string into an array
    };

    try {
      const response = await fetch(`${API_BACKEND_URL}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify(propertyData),
      });

      const data = await response.json();

      // Redirect to properties page after successful submission
      navigate("/properties");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h2>Add Property</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Property Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={propertyDetails.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={propertyDetails.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={propertyDetails.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={propertyDetails.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formAmenities">
                  <Form.Label>Amenities</Form.Label>
                  <Form.Control
                    type="text"
                    name="amenities"
                    value={propertyDetails.amenities}
                    onChange={handleChange}
                    placeholder="e.g., Large Backyard, Playroom, Home Office"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formImages">
                  <Form.Label>
                    Property Images (Comma-separated URLs)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="images"
                    value={propertyDetails.images}
                    onChange={handleChange}
                    placeholder="Enter image URLs separated by commas"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Add Property
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProperty;
