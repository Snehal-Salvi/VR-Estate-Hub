import React, { useEffect, useState } from "react";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import API_BACKEND_URL from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteProperty = () => {
  const { user } = useAuth(); // Access the user from AuthContext
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState(new Set());

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_BACKEND_URL}/properties`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await response.json();
        setProperties(data); // Set the fetched properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [user?.token]);

  const handleSelect = (id) => {
    const updatedSelection = new Set(selectedProperties);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedProperties(updatedSelection);
  };

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected properties?"
    );
    if (confirmDelete) {
      try {
        await Promise.all(
          [...selectedProperties].map((id) =>
            fetch(`${API_BACKEND_URL}/properties/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${user?.token}`, // Attach the token to the Authorization header
              },
            })
          )
        );

        // Remove deleted properties from the list
        setProperties(
          properties.filter((property) => !selectedProperties.has(property._id))
        );
        setSelectedProperties(new Set()); // Clear selections
      } catch (error) {
        console.error("Error deleting properties:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/properties"); // Navigate back to the properties page without deleting
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Delete Property</Card.Title>
          <p>Select the properties you want to delete:</p>
          <ListGroup>
            {properties.map((property) => (
              <ListGroup.Item key={property._id}>
                <input
                  type="checkbox"
                  checked={selectedProperties.has(property._id)}
                  onChange={() => handleSelect(property._id)}
                />
                {property.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedProperties.size === 0}
          >
            Delete Selected
          </Button>
          <Button variant="secondary" onClick={handleCancel} className="ms-2">
            Cancel
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteProperty;
