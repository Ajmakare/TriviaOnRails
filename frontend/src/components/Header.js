import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../styles/Header.css'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" id = "header">
      <Container>
        <img src="/assets/ruby.png" alt="logo" id="logo" height = "50px" width = "50px" />
        <Navbar.Brand href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}> TRIVIA ON RAILS </Navbar.Brand>        
      <img src="/assets/ruby.png" alt="logo" id="logo" height="50px" width="50px" style={{ transform: 'scaleX(-1)' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
