import React, { useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();

  const [item, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL = `http://localhost:3001/productos/${id}`;

    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

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
          <ItemCount nombre={item.title} stock={item.stock} initial={1} />
        </Row>
      )}
    </div>
  );
}

export default ItemDetail;
