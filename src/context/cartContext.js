import { createContext, useState, useEffect } from "react";

export const CartContext = createContext([]);

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id) => {
    if (cart.some((item) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  const addItem = (id, name, quantity, price, image) => {
    price = quantity * price;
    if (isInCart(id)) {
      setCart(
        cart.map((item) => {
          if (item.id === id)
            return {
              ...item,
              quantity: item.quantity + quantity,
              price: item.price + price,
            };
          return item;
        })
      );
    } else {
      const newItem = { id, name, quantity, price, image };
      setCart((prevState) => [...prevState, newItem]);
    }
  };

  const removeItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calcularPrecioTotal = () => {
    let precioTotal = 0;
    cart.forEach((item) => {
      precioTotal = precioTotal + item.price;
    });
    return precioTotal;
  };

  const calcularCantidadItems = () => {
    let cantidadItems = 0;
    cart.forEach((item) => {
      cantidadItems = cantidadItems + item.quantity;
    });
    return cantidadItems;
  };

  const cantidadEnCarro = (id) => {
    let cantidadItems = 0;
    if (isInCart(id)) {
      cantidadItems = cart.find((item) => (item.id = id)).quantity;
    }
    return cantidadItems;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        calcularPrecioTotal,
        calcularCantidadItems,
        cantidadEnCarro,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
