import React from "react";
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#">Tiendita</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
  
  <Nav>
      <NavDropdown title="Categorias" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#">Tecnologia</NavDropdown.Item>
          <NavDropdown.Item href="#">Ropa</NavDropdown.Item>
          <NavDropdown.Item href="#">Herramientas</NavDropdown.Item>
          <NavDropdown.Item href="#">Hogar</NavDropdown.Item>
          <NavDropdown.Item href="#">Vehiculos</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#">Comprar</Nav.Link>
      <Nav.Link href="#">Contacto</Nav.Link>
      <CartWidget/>
    </Nav>
    </Navbar.Collapse>
  </Container>
  
</Navbar>
    </div>
  );
}

export default NavBar;
