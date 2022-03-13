import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate, Link } from "react-router-dom";
import { getFirestore } from "../firebase";
import { useAuth } from "../context/authContext";
import firebase from "firebase/app";

function Cart() {
  const { currentUser, userData } = useAuth();

  const { cart, removeItem, clearCart, calcularPrecioTotal } =
    useContext(CartContext);

  useEffect(() => {}, [cart]);

  let navigate = useNavigate();

  const finalizarCompra = () => {
    const itemsComprados = cart.map((item) => {
      return {
        id: item.id,
        title: item.name,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");

    const total = calcularPrecioTotal();

    const ORDEN = {
      comprador: {
        email: userData.email,
        nombre: userData.nombre,
        apellido: userData.apellido,
        telefono: userData.telefono,
      },
      itemsComprados,
      fecha: date,
      total: total,
    };

    const db = getFirestore();
    var batch = db.batch();
    const orderRef = db.collection("orders").doc();
    batch.set(orderRef, ORDEN);
    itemsComprados.forEach((item) => {
      batch.update(db.collection("productos").doc(item.id), {
        stock: firebase.firestore.FieldValue.increment(-item.quantity),
      });
    });

    batch
      .commit()
      .then((res) => {
        navigate(`/comprarealizada/${orderRef.id}`);
      })
      .catch((err) => console.log("Hubo un error", err))
      .finally(() => clearCart());
  };

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
        <section className="pt-5 pb-5 ">
          <div className="container cart-container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <table
                  id="shoppingCart"
                  className="table table-condensed table-responsive mt-5"
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
                          <td className="lead pt-5 fs-3" data-th="Price">
                            ${item.price}
                          </td>
                          <td
                            className="lead pt-5 fs-3 ps-4"
                            data-th="Quantity"
                          >
                            <span>{item.quantity}</span>
                          </td>
                          <td className="actions" data-th="">
                            <div className="text-right pt-5">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="btn btn-dark border-secondary "
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
                <button
                  className="btn btn-danger btn-lg"
                  onClick={() => clearCart()}
                >
                  Limpiar carrito
                </button>
                <div className="float-end text-end">
                  <h4>Total:</h4>
                  <h1>${calcularPrecioTotal()}</h1>
                </div>
              </div>
            </div>
            <div className="row mt-4 d-flex align-items-center">
              <div className=" mt-3 order-md-2 text-center">
                {!currentUser && (
                  <div className="alert alert-danger" role="alert">
                    Primero debes{" "}
                    <Link className="alert-link" to="/signin">
                      Iniciar sesion
                    </Link>{" "}
                    para poder realizar la compra
                  </div>
                )}
                <button
                  disabled={!currentUser}
                  type="submit"
                  className={
                    "btn btn-success mb-4 btn-lg pl-5 pr-5 " +
                    (!currentUser && "invisible")
                  }
                  onClick={finalizarCompra}
                >
                  Terminar compra
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Cart;
