import React, { useEffect, useState, useContext } from "react";
import ItemCount from "./ItemCount";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { getFirestore } from "../firebase";

function ItemDetail() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contador, setContador] = useState(1);
  const { addItem, cantidadEnCarro } = useContext(CartContext);

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = db.collection("productos");
    const selectedItem = productsCollection.doc(id);

    const getDataFromFirestore = async () => {
      setIsLoading(true);
      try {
        const response = await selectedItem.get();
        if (!response.exists) {
          console.log("El producto no existe");
        }
        setItem({ ...response.data(), id: response.id });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDataFromFirestore();
  }, [id]);

  const decrement = () => {
    contador <= 1
      ? setContador((prevState) => prevState)
      : setContador((prevState) => prevState - 1);
  };

  const increment = () => {
    contador >= item.stock - cantidadEnCarro(item.id)
      ? setContador((prevState) => prevState)
      : setContador((prevState) => prevState + 1);
  };

  const onAdd = () => {
    addItem(item.id, item.title, contador, item.price, item.pictureUrl);
    navigate("/cart");
  };

  return (
    <div>
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50 "
          role="status"
        ></div>
      ) : error ? (
        "Hubo un error " + error
      ) : (
        <Row>
          {}
          <Col>
            <img
              className="item-img-detail"
              src={"/" + item.pictureUrl}
              alt={item.title}
            />
          </Col>
          <Col>
            <h1>{item.title}</h1>
            <p>Precio : {item.price}</p>
            <p>Detalles: {item.details}</p>
          </Col>
          {
            <ItemCount
              stock={item.stock - cantidadEnCarro(item.id)}
              decrement={decrement}
              increment={increment}
              onAdd={onAdd}
              contador={contador}
            />
          }
        </Row>
      )}
    </div>
  );
}

export default ItemDetail;
