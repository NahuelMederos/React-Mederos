import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeItem, clearCart, calcularPrecioTotal } =
    useContext(CartContext);

  useEffect(() => {}, [cart]);

  let navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <>
        <div className="jumbotron ms-2">
          <h1 className="display-4">Tu carrito está vacío</h1>
          <hr className="my-4"></hr>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-lg"
          >
            Volver al inicio
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section className="pt-5 pb-5">
          <div className="container w-75">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <table
                  id="shoppingCart"
                  className="table table-condensed table-responsive"
                >
                  <thead>
                    <tr>
                      <th style={{ widht: "30%" }}>Producto</th>
                      <th style={{ widht: "12%" }}>Precio</th>
                      <th style={{ widht: "10%" }}>Cantidad</th>
                      <th style={{ widht: "16%" }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td data-th="Product">
                            <div className="row">
                              <div className="col-lg-4 col-xl-3 text-left">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="rounded mb-2 shadow cart-img"
                                ></img>
                              </div>
                              <div className="col-lg-8 col-xl-9 text-left mt-md-2">
                                <h4>{item.name}</h4>
                              </div>
                            </div>
                          </td>
                          <td data-th="Price">${item.price}</td>
                          <td data-th="Quantity">
                            <span>{item.quantity}</span>
                          </td>
                          <td className="actions" data-th="">
                            <div className="text-right">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="btn btn-white border-secondary bg-white btn-md mb-2"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button className="btn btn-danger" onClick={() => clearCart()}>
                  Limpiar carrito
                </button>
                <div className="float-end text-end">
                  <h4>Total:</h4>
                  <h1>${calcularPrecioTotal()}</h1>
                </div>
              </div>
            </div>
            <div className="row mt-4 d-flex align-items-center">
              <div className="col-sm-6 order-md-2 text-end">
                <a href="/" className="btn btn-success mb-4 btn-lg pl-5 pr-5">
                  Terminar compra
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Cart;

// <button onClick={() => clearCart()}>Limpiar carrito</button>
