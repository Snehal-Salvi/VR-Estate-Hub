import React, { useState } from "react";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_BACKEND_URL from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setEmailError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!valid) {
      return; // Exit if validation fails
    }

    try {
      const response = await axios.post(`${API_BACKEND_URL}/users/login`, {
        email,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);

      const user = {
        email,
        role: response.data.role,
        token: response.data.token,
      }; // Include role and token in user object
      login(user); // Log in with user info

      navigate("/properties"); // Redirect to properties or dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className="text-center h1">Login</h2>
      <Form onSubmit={handleLogin}>
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
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
