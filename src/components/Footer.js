import React from 'react';
import styles from '../styles//Footer.module.css';

const Footer = () => {

  const openFeedbackPage = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSeYz01w9IFGmR_1HZc5BIK1jr9hAqrKBxEe08gRnMezLO2A_Q/viewform?usp=sf_link',
      '_blank'
    );
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>© {new Date().getFullYear()} PODA. All rights reserved.</p>
        <p className={styles.contact} onClick={openFeedbackPage}>Click! Contact us</p>
      </div>
    </footer>
  );
};

export default Footer;
