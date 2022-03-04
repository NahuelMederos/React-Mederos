import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AccountWidget(props) {
  let navigate = useNavigate();
  return (
    <NavDropdown title="Cuenta" id="basic-nav-dropdown" align="end">
      <NavDropdown.Item onClick={() => navigate("/wishlist")}>
        Lista de deseos
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={props.logout}>Cerrar sesion</NavDropdown.Item>
    </NavDropdown>
  );
}

export default AccountWidget;
