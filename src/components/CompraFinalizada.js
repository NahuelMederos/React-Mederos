import { logDOM } from "@testing-library/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore } from "../firebase";

function CompraFinalizada() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const db = getFirestore();
    db.collection("orders")
      .doc(orderId)
      .get()
      .then((res) => setOrder({ id: res.id, ...res.data() }))
      .catch((error) => setError(error))
      .finally(setIsLoading(false));
  }, [orderId]);

  return (
    <div className="d-flex justify-content-center ">
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50 "
          role="status"
        ></div>
      ) : error ? (
        "Hubo un error " + error
      ) : (
        <div>
          <h1>Gracias por tu compra {order?.comprador?.nombre}!</h1>
          <br />
          <h2>Id de la compra:{order?.id}</h2>
          {/* {order.itemscomprados.forEach((item) => {
            <div>
              <p>Nombre: {item.title}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: {item.price}</p>
            </div>;
          })} */}
          <h2>Fecha: {order?.fecha}</h2>
          <h2>Total: {order?.total}</h2>
        </div>
      )}
    </div>
  );
}

export default CompraFinalizada;
