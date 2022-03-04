import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Col, Row, Container } from "react-bootstrap";
import { getFirestore } from "../firebase";

function ItemList(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    var productsCollection;

    if (props.categoria) {
      productsCollection = db
        .collection("productos")
        .where("categoria", "==", props.categoria);
    } else {
      productsCollection = db.collection("productos");
    }

    const getDataFromFirestore = async () => {
      setIsLoading(true);
      try {
        const response = await productsCollection.get();
        if (response.empty) {
          console.log("No hay productos");
        }
        setItems(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDataFromFirestore();
  }, [props.categoria]);

  return (
    <div className="d-flex justify-content-center  ">
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50 "
          role="status"
        ></div>
      ) : error ? (
        "Hubo un error " + error
      ) : (
        <Container className="item-list-container">
          <Row
            xs={1}
            sm={2}
            lg={3}
            xl={4}
            xxl={5}
            className="justify-content-center"
          >
            {items.map((item) => (
              <Col key={item.id}>
                <Item
                  id={item.id}
                  title={item.title}
                  pictureUrl={item.pictureUrl}
                  price={item.price}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ItemList;
