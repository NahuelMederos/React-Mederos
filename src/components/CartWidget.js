import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CartWidget() {
  let navigate = useNavigate();
  return (
    <div>
      <Nav.Link onClick={() => navigate("/cart")}>
        <img src="/images/Carrito.png" alt="carrito png" className="carrito" />{" "}
        Carrito
      </Nav.Link>
    </div>
  );
}

export default CartWidget;
