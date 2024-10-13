import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  ListGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import API_BACKEND_URL from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    location: "",
    price: "",
    amenities: "",
    images: [],
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_BACKEND_URL}/properties`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [user?.token]);

  const handleSelect = async (id) => {
    setSelectedPropertyId(id);
    try {
      const response = await fetch(`${API_BACKEND_URL}/properties/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const data = await response.json();
      setPropertyDetails({
        title: data.title,
        location: data.location,
        price: data.price,
        amenities: data.amenities.join(", "),
        images: data.images,
      });
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProperty = {
      ...propertyDetails,
      amenities: propertyDetails.amenities
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      await fetch(`${API_BACKEND_URL}/properties/${selectedPropertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updatedProperty),
      });
      navigate("/properties");
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Edit Property</Card.Title>
          <p className="text-center">Select a property to edit:</p>
          <ListGroup horizontal className="justify-content-center mb-4">
            {properties.map((property) => (
              <ListGroup.Item
                key={property._id}
                action
                active={property._id === selectedPropertyId}
                onClick={() => handleSelect(property._id)}
              >
                {property.title}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {selectedPropertyId && (
            <>
              <h4 className="text-center mb-4">Property Details</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formTitle" className="mb-3">
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
                  <Col md={6}>
                    <Form.Group controlId="formLocation" className="mb-3">
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

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formPrice" className="mb-3">
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
                  <Col md={6}>
                    <Form.Group controlId="formAmenities" className="mb-3">
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

                <Form.Group controlId="formImages" className="mb-3">
                  <Form.Label>Property Image URLs</Form.Label>
                  {propertyDetails.images.map((image, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      name={`image_${index}`}
                      value={propertyDetails.images[index]}
                      onChange={(e) => {
                        const newImages = [...propertyDetails.images];
                        newImages[index] = e.target.value;
                        setPropertyDetails({
                          ...propertyDetails,
                          images: newImages,
                        });
                      }}
                      required
                      className="mb-2"
                    />
                  ))}
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Update Property
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProperty;
