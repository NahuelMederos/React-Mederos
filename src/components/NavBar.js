import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import CartWidget from "./CartWidget";
import AccountWidget from "./AccountWidget";
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
      <Navbar
        className="navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Link to="/">
          <Navbar.Brand className="ms-5">Tiendita</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="me-5">
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
              <AccountWidget email={currentUser.email} logout={handleLogout} />
            )}
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
