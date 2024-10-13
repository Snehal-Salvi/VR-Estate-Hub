// src/components/Home.js

import React from "react";
import styles from "./Home.module.css";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to VR-Estate-Hub!!</h1>
        <p className={styles.subtitle}>
          Your one-stop destination for finding the perfect property.
        </p>
      </header>
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <img src={logo} alt="Luxury Homes" className={styles.image} />
          <h2 className={styles.cardTitle}>Luxury Homes</h2>
          <p className={styles.cardText}>
            Explore our selection of high-end homes that suit your lifestyle.
          </p>
        </div>
        <div className={styles.infoCard}>
          <img
            src={logo}
            alt="Affordable Properties"
            className={styles.image}
          />
          <h2 className={styles.cardTitle}>Affordable Properties</h2>
          <p className={styles.cardText}>
            Find budget-friendly homes in your preferred location.
          </p>
        </div>
        <div className={styles.infoCard}>
          <img src={logo} alt="Commercial Spaces" className={styles.image} />
          <h2 className={styles.cardTitle}>Commercial Spaces</h2>
          <p className={styles.cardText}>
            Discover commercial properties to kickstart your business.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
