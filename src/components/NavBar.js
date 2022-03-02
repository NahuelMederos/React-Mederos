import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import CartWidget from "./CartWidget";
import { useAuth } from "../context/authContext";

function NavBar() {
  let navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      alert(error);
    }
  };

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
                <NavDropdown.Item
                  onClick={() => navigate("/category/Tecnologia")}
                >
                  Tecnologia
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => navigate("/category/Ropa")}>
                  Ropa
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/category/Hogar")}>
                  Hogar
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#">Contacto</Nav.Link>
              {!currentUser ? (
                <>
                  <Nav.Link onClick={() => navigate("/signin")}>
                    Iniciar sesion
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/signup")}>
                    Registrarse
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Navbar.Text>Bienvenido {currentUser.email}</Navbar.Text>
                  <Nav.Link onClick={handleLogout}>Cerrar sesion</Nav.Link>
                  <Nav.Link onClick={() => navigate("/wishlist")}>
                    Whishlist
                  </Nav.Link>
                </>
              )}
              <CartWidget />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
