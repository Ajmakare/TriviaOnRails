import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../styles/Header.css'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" id = "header">
      <Container>
        <Navbar.Brand>Trivia on Rails</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
