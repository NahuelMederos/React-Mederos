import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { getFirestore } from "../firebase";
import firebase from "firebase";

function Cart() {
  const { cart, removeItem, clearCart, calcularPrecioTotal } =
    useContext(CartContext);

  useEffect(() => {}, [cart]);

  let navigate = useNavigate();

  const finalizarCompra = (e) => {
    e.preventDefault();
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
        nombre: e.target.nombre.value,
        telefono: e.target.telefono.value,
        email: e.target.email.value,
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
              <div>
                <form onSubmit={finalizarCompra}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputNombre">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        id="inputNombre"
                        placeholder="Nombre"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputTelefono">Telefono</label>
                      <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        id="inputTelefono"
                        placeholder="Telefono"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="inputEmail"
                      placeholder="a@email.com"
                      required
                    />
                  </div>
                  <div className="col-sm-6 order-md-2 text-end">
                    <button
                      type="submit"
                      className="btn btn-success mb-4 btn-lg pl-5 pr-5"
                    >
                      Terminar compra
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Cart;
