import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faBuilding,
  faSignOutAlt,
  faCog,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <Navbar className={styles.navbar} expand="lg">
      <Container>
        <Link to="/" className={styles.navbarBrand}>
          <img src={logo} alt="Logo" className={styles.logo} /> VR-Estate-Hub
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto">
            {!user ? (
              <>
                <Link to="/login" className={styles.link}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
                <Link to="/register" className={styles.link}>
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/properties" className={styles.link}>
                  <FontAwesomeIcon icon={faBuilding} /> Properties
                </Link>
                {/* Show Appointments link only for customers */}
                {user.role === "Customer" && (
                  <Link to="/appointments" className={styles.link}>
                    <FontAwesomeIcon icon={faClock} /> Appointments
                  </Link>
                )}
                <Link onClick={handleLogout} className={styles.link}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
                {/* Conditional buttons based on role */}
                {user.role === "SuperAdmin" && (
                  <Link to="/super-admin" className={styles.link}>
                    <FontAwesomeIcon icon={faCog} /> Super Admin Panel
                  </Link>
                )}
                {user.role === "PropertyAdmin" && (
                  <Link to="/property-admin" className={styles.link}>
                    <FontAwesomeIcon icon={faCog} /> Property Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
