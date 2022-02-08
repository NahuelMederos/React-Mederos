import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";

function Cart() {
  const { cart, removeItem, clearCart } = useContext(CartContext);

  useEffect(() => {}, [cart]);

  return (
    <ul>
      {cart.map((item) => {
        return (
          <li key={item.id}>
            Id: {item.id} Nombre: {item.name} Cantidad: {item.quantity} Precio:{" "}
            {item.price}
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        );
      })}
      <br />
      <button onClick={() => clearCart()}>Limpiar carrito</button>
    </ul>
  );
}

export default Cart;
