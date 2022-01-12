import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap'

function NavBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#">Tiendita</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
  
  <Nav>
      <Nav.Link href="#">Comprar</Nav.Link>
      <Nav.Link href="#">Contacto</Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Container>
  
</Navbar>
    </div>
  );
}

export default NavBar;
