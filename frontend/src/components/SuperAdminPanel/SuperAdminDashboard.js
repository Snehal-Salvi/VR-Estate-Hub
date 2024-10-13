import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Card, ListGroup } from "react-bootstrap";
const SuperAdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Super Admin Dashboard</h1>
      <Card>
        <Card.Body>
          <Card.Title>Manage Properties & Admins</Card.Title>
          <ListGroup>
            <ListGroup.Item>
              <Link
                to="/super-admin/add-property"
                className="text-decoration-none"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Property
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                to="/super-admin/edit-property"
                className="text-decoration-none"
              >
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                Edit Property
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                to="/super-admin/delete-property"
                className="text-decoration-none"
              >
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Delete Property
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                to="/super-admin/manage-admins"
                className="text-decoration-none"
              >
                <FontAwesomeIcon icon={faUserCog} className="me-2" />
                Manage Admins
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SuperAdminDashboard;
