import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Col, Row, Container } from "react-bootstrap";

function ItemList(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL = "http://localhost:3001/productos";

    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [props.categoria]);

  if (!props.categoria) {
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
          <Container>
            <Row xs={2} md={4} lg={6}>
              {items.map((item) => (
                <Col>
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    pictureUrl={item.pictureUrl}
                    stock={item.stock}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">
        {isLoading ? (
          <div
            className="spinner-grow position-absolute top-50 start-50 "
            role="status"
          ></div>
        ) : error ? (
          "Hubo un error " + error
        ) : (
          items.map((item) =>
            props.categoria === item.categoria ? (
              <Item
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                pictureUrl={item.pictureUrl}
                stock={item.stock}
              />
            ) : null
          )
        )}
      </div>
    );
  }
}

export default ItemList;
