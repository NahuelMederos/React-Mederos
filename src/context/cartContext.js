import { createContext, useState } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const isInCart = (id) => {
    if (cart.some((item) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  const addItem = (id, name, quantity, price) => {
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
      const newItem = { id, name, quantity, price };
      setCart((prevState) => [...prevState, newItem]);
    }
  };

  const removeItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
