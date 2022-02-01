import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Tiendita</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/category/Tecnologia">
                  Tecnologia
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/Ropa">Ropa</NavDropdown.Item>
                <NavDropdown.Item href="/category/Hogar">
                  Hogar
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#">Contacto</Nav.Link>
              <CartWidget />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
