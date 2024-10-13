import React, { useState } from "react";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_BACKEND_URL from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (!valid) {
      return; // Exit if validation fails
    }

    try {
      const response = await axios.post(`${API_BACKEND_URL}/users/register`, {
        username,
        email,
        password,
      });

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className="text-center h1">Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername">
          <Form.Label className={styles.textLight}>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text className={`bg-primary ${styles.textLight}`}>
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className={styles.textLight}>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text className={`bg-primary ${styles.textLight}`}>
              <FontAwesomeIcon icon={faEnvelope} />
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          {emailError && <Alert variant="danger">{emailError}</Alert>}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className={styles.textLight}>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text className={`bg-primary ${styles.textLight}`}>
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
