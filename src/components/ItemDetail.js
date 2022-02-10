import React, { useEffect, useState, useContext } from "react";
import ItemCount from "./ItemCount";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

function ItemDetail() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [item, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contador, setContador] = useState(1);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const URL = `http://localhost:3001/productos/${id}`;

    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  const decrement = () => {
    contador <= 1
      ? setContador((prevState) => prevState)
      : setContador((prevState) => prevState - 1);
  };

  const increment = () => {
    contador >= item.stock
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
              nombre={item.title}
              stock={item.stock}
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
