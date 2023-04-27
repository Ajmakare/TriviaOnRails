import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3" id = 'footer'>
      <Container>
        <p>&copy; {new Date().getFullYear()} Trivia on Rails</p>
      </Container>
    </footer>
  );
};

export default Footer;
