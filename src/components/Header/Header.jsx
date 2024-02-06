import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';






function Header() {
  return (
    <Navbar expand="lg" className="bg-dark">
    <Container>
      <Navbar.Brand as ={Link} to="/">Branded Watches</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as ={Link} to="/">Home</Nav.Link>
          <Nav.Link as ={Link} to="/add">Add</Nav.Link>
          <Nav.Link as ={Link} to="/admin">Admin</Nav.Link>
          <Nav.Link as ={Link} to="/signup">SignUp</Nav.Link>
          <Nav.Link as ={Link} to="/login">Login</Nav.Link>
       
        
        
        </Nav>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header