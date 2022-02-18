import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore } from "../firebase";

function CompraFinalizada() {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const ordersCollection = db.collection("orders");
    const selectedItem = ordersCollection.doc(orderId);

    const getDataFromFirestore = async () => {
      setIsLoading(true);
      try {
        const response = await selectedItem.get();
        setOrder({ ...response.data(), id: response.id });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDataFromFirestore();
  }, [orderId]);

  return (
    <div className="d-flex justify-content-center ">
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50"
          role="status"
        ></div>
      ) : error ? (
        <h1>{error}</h1>
      ) : order.comprador === undefined ? (
        <h1>Esta orden no existe</h1>
      ) : (
        <div>
          <h1>Gracias por tu compra {order.comprador.nombre}!</h1>
          <br />
          <h2>Id de la compra:{order.id}</h2>
          <h2>Fecha: {order.fecha}</h2>
          <br />
          {order.itemsComprados.map((item, index) => (
            <div key={index} className="d-flex justify-content-start ">
              <h3>Producto: {item.title} /</h3>
              <h3>Cantidad: {item.quantity} /</h3>
              <h3>Precio total: ${item.price} </h3>
            </div>
          ))}
          <br />
          <h2>Total: ${order.total}</h2>
        </div>
      )}
    </div>
  );
}

export default CompraFinalizada;
