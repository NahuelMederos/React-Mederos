import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

function CartWidget() {
  const { calcularCantidadItems } = useContext(CartContext);

  let navigate = useNavigate();

  if (calcularCantidadItems() === 0) {
    return null;
  } else {
    return (
      <div>
        <Nav.Link onClick={() => navigate("/cart")}>
          <img
            src="/images/Carrito.png"
            alt="carrito png"
            className="carrito"
          />{" "}
          Carrito ({calcularCantidadItems()})
        </Nav.Link>
      </div>
    );
  }
}

export default CartWidget;
